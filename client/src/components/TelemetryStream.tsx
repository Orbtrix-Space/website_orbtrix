import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type EventKind = "telemetry" | "alert" | "action" | "resolved";

interface LogEvent {
  id: number;
  kind: EventKind;
  time: string;
  tag: string;
  message: string;
}

type ScenarioStep = Omit<LogEvent, "id" | "time">;

const SCENARIOS: ScenarioStep[][] = [
  [
    { kind: "telemetry", tag: "EPS", message: "Solar panel A current nominal. 8.42 A" },
    { kind: "telemetry", tag: "ADCS", message: "Attitude error 0.04°. Stable" },
    { kind: "alert", tag: "THM-07", message: "Thermal drift detected on payload bay. +3.2 K above envelope" },
    { kind: "action", tag: "DISHA", message: "Correlating thermal model with solar flux. Isolating cause" },
    { kind: "action", tag: "DISHA", message: "Recommending slew 12° off-sun. Confidence 0.94" },
    { kind: "action", tag: "ADCS", message: "Executing slew maneuver. Duration 48 s" },
    { kind: "resolved", tag: "THM-07", message: "Anomaly resolved. Payload bay returning to nominal" },
  ],
  [
    { kind: "telemetry", tag: "COMM", message: "S-band link acquired. Ground station BLR-1" },
    { kind: "telemetry", tag: "OBDH", message: "Packet loss 0.01%. Downlink rate 12.4 Mbps" },
    { kind: "alert", tag: "COM-03", message: "SNR dropped to 11.2 dB. Ionospheric scintillation detected" },
    { kind: "action", tag: "DISHA", message: "Switching modulation to QPSK. Adaptive FEC enabled" },
    { kind: "action", tag: "DISHA", message: "Re-routing backlog via X-band secondary" },
    { kind: "resolved", tag: "COM-03", message: "Link margin recovered. SNR 24.8 dB. Nominal" },
  ],
  [
    { kind: "telemetry", tag: "EPS", message: "Battery SoC 78%. Discharge rate 1.2 A" },
    { kind: "telemetry", tag: "PAYLOAD", message: "Imager temperature 18.4 °C. Cal good" },
    { kind: "alert", tag: "EPS-12", message: "Battery cell 3 voltage imbalance. dV = 32 mV" },
    { kind: "action", tag: "DISHA", message: "Engaging cell balancing routine. Isolating cell 3" },
    { kind: "action", tag: "DISHA", message: "Reducing non critical loads for 6 minutes" },
    { kind: "resolved", tag: "EPS-12", message: "Cell voltages equalized. dV = 4 mV. Nominal" },
  ],
  [
    { kind: "telemetry", tag: "GNC", message: "Orbit determination update. RMS residual 2.1 m" },
    { kind: "alert", tag: "GNC-04", message: "Conjunction warning. TCA 00:14:22. Miss distance 820 m" },
    { kind: "action", tag: "DISHA", message: "Computing collision probability. Pc = 1.4 × 10⁻⁴" },
    { kind: "action", tag: "DISHA", message: "Generating avoidance burn. ΔV = 0.12 m/s. ETA 00:09:10" },
    { kind: "action", tag: "GNC", message: "Burn armed. Awaiting autonomous execution" },
    { kind: "resolved", tag: "GNC-04", message: "Avoidance burn complete. New miss distance 4.6 km" },
  ],
];

const COLOR_MAP: Record<EventKind, { dot: string; text: string; label: string }> = {
  telemetry: { dot: "bg-neutral-400", text: "text-neutral-500", label: "TLM" },
  alert: { dot: "bg-amber-500", text: "text-amber-700", label: "ALERT" },
  action: { dot: "bg-teal-600", text: "text-teal-700", label: "DISHA" },
  resolved: { dot: "bg-emerald-600", text: "text-emerald-700", label: "OK" },
};

function formatTime(d: Date) {
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  const s = String(d.getUTCSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}Z`;
}

export function TelemetryStream() {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scenarioIdx = 0;
    let stepIdx = 0;
    let timer: number;

    const push = () => {
      const scenario = SCENARIOS[scenarioIdx];
      const step = scenario[stepIdx];
      idRef.current += 1;
      setEvents((prev) => {
        const next = [
          ...prev,
          { id: idRef.current, time: formatTime(new Date()), ...step },
        ];
        return next.slice(-14);
      });

      stepIdx += 1;
      if (stepIdx >= scenario.length) {
        stepIdx = 0;
        scenarioIdx = (scenarioIdx + 1) % SCENARIOS.length;
      }

      // Dynamic pacing: faster for telemetry, slower to read alerts/actions
      const delay =
        step.kind === "telemetry" ? 1400 :
        step.kind === "alert" ? 2400 :
        step.kind === "action" ? 1900 :
        2200;
      timer = window.setTimeout(push, delay);
    };

    timer = window.setTimeout(push, 300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <div className="border border-teal-500/50 bg-white shadow-[0_4px_24px_rgba(20,184,166,0.08)] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-teal-500/30 bg-teal-50/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500/40 pulse-dot" />
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500/80" />
          </div>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-teal-700">
            Example event flow
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 pulse-dot" />
          <span>Illustrative</span>
        </div>
      </div>

      {/* Stream body */}
      <div
        ref={scrollRef}
        className="h-[340px] md:h-[400px] overflow-hidden px-4 md:px-6 py-4 font-mono text-[11px] md:text-[12px] leading-relaxed space-y-1.5 bg-white"
      >
        <AnimatePresence initial={false}>
          {events.map((e) => {
            const c = COLOR_MAP[e.kind];
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-3"
              >
                <span className="text-neutral-400 shrink-0">{e.time}</span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${e.kind === "alert" ? "pulse-dot" : ""}`} />
                  <span className={`${c.text} w-[52px] shrink-0 font-medium`}>{c.label}</span>
                </span>
                <span className="text-neutral-500 shrink-0 w-[70px] truncate">{e.tag}</span>
                <span className={`${e.kind === "alert" ? "text-amber-800" : e.kind === "resolved" ? "text-emerald-800" : "text-neutral-700"} break-words`}>
                  {e.message}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-2.5 border-t border-teal-500/30 bg-teal-50/60 font-mono text-[10px] text-neutral-500">
        <span>{events.length} events</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-teal-600 pulse-dot" />
          Streaming
        </span>
      </div>
    </div>
  );
}
