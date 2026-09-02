import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { NETRA, SOLUTION_BY_SLUG } from "@/data/solutions";
import {
  AudienceRow,
  DishaBand,
  FlowCodes,
  FlowStack,
  Qualifier,
  SolutionClosing,
  SolutionCrossLinks,
  SolutionHero,
  SolutionSection,
  SpecList,
} from "@/components/solutions/SolutionParts";
import { Panel, Readout } from "@/components/tech/TechParts";
import {
  AnomalyPlate,
  FleetPlate,
  IntegrationPlate,
  TelemetryPlate,
} from "@/components/solutions/SolutionVisuals";

/**
 * NETRA — telemetry intelligence.
 *
 * The page argues one thing and keeps returning to it: an alert is the start
 * of the work, not the end of it. Every figure on it is about narrowing — four
 * traces down to the one that matters, a fleet down to the spacecraft asking
 * for attention, an expected band down to the point something left it.
 *
 * Copy lives in data/solutions.ts. The shared kit is in SolutionParts.tsx; the
 * plates that belong to NETRA alone are in SolutionVisuals.tsx.
 */
export default function Netra() {
  const solution = SOLUTION_BY_SLUG.netra;
  usePageMeta(NETRA.meta.title, NETRA.meta.description);

  return (
    <>
      <SolutionHero
        ident={solution.ident}
        cmd={solution.cmd}
        name={solution.name}
        role={solution.role}
        heading={NETRA.hero.heading}
        lead={NETRA.hero.lead}
        primary={NETRA.hero.primary}
        secondary={NETRA.hero.secondary}
        visual={<TelemetryPlate />}
      />

      {/* ===================== THE PROBLEM =====================
          Deliberately the one section on the page with no figure. The hero
          just showed four traces with one of them lit; the argument for why
          that picture is the problem should be read, not illustrated twice. */}
      <SolutionSection
        mark={NETRA.problem.mark}
        heading={NETRA.problem.heading}
        className="pt-0"
        narrow
      >
        <div className="mt-9 max-w-2xl">
          {NETRA.problem.body.map((paragraph, i) => (
            <Reveal key={paragraph} delay={120 + i * 80}>
              <p
                className={`text-pretty font-light leading-relaxed ${
                  i === 0
                    ? "text-[clamp(1.05rem,1.7vw,1.3rem)] text-ink"
                    : "mt-6 text-[0.95rem]"
                }`}
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </SolutionSection>

      {/* ===================== CAPABILITIES ===================== */}
      <SolutionSection
        id="capabilities"
        mark={NETRA.capabilities.mark}
        heading={NETRA.capabilities.heading}
        className="pt-0"
        narrow
      >
        <Reveal delay={120}>
          <SpecList items={NETRA.capabilities.items} className="mt-12" />
        </Reveal>
      </SolutionSection>

      {/* ===================== WORKFLOW ===================== */}
      <SolutionSection
        mark={NETRA.workflow.mark}
        heading={NETRA.workflow.heading}
        lead={NETRA.workflow.lead}
        className="pt-0"
      >
        {/* Flow on the LEFT here, unlike NEXUS and Optical. The panel beside it
            states the same thing the six stages do, in four lines — which is
            the section's argument twice over, once as a process and once as a
            summary. */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <Reveal delay={160}>
            <FlowStack steps={NETRA.workflow.steps} className="max-w-xl" />
          </Reveal>

          <Reveal delay={220} className="lg:sticky lg:top-28 lg:self-start">
            <Panel tag="NETRA / pipeline" meta="what changes">
              <Readout
                rows={[
                  { label: "INPUT", value: "RAW TELEMETRY" },
                  { label: "OUTPUT", value: "OPERATOR ACTION", tone: "accent" },
                  { label: "AT EVERY STAGE", value: "NARROWED" },
                  { label: "CONTEXT", value: "CARRIED FORWARD" },
                ]}
              />
            </Panel>
          </Reveal>
        </div>
      </SolutionSection>

      {/* ===================== ANOMALY ===================== */}
      <SolutionSection
        mark={NETRA.anomaly.mark}
        heading={NETRA.anomaly.heading}
        lead={NETRA.anomaly.lead}
        className="pt-0"
      >
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-16">
          <Reveal delay={140}>
            <FlowCodes steps={NETRA.anomaly.steps} />
          </Reveal>

          <Reveal delay={200}>
            <AnomalyPlate />
          </Reveal>
        </div>

        <Reveal delay={240}>
          <Qualifier className="mt-12">{NETRA.anomaly.note}</Qualifier>
        </Reveal>
      </SolutionSection>

      {/* ===================== FLEET ===================== */}
      <SolutionSection
        mark={NETRA.fleet.mark}
        heading={NETRA.fleet.heading}
        lead={NETRA.fleet.lead}
        className="pt-0"
      >
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <Reveal delay={140}>
            <FleetPlate craft={NETRA.fleet.craft} drill={NETRA.fleet.drill} />
          </Reveal>

          <Reveal delay={200}>
            <Qualifier>
              Conceptual. The identifiers and states are illustrative — what the panel shows is the
              shape of fleet awareness, not a mission.
            </Qualifier>
          </Reveal>
        </div>
      </SolutionSection>

      {/* ===================== INTEGRATION ===================== */}
      <SolutionSection
        mark={NETRA.integration.mark}
        heading={NETRA.integration.heading}
        lead={NETRA.integration.lead}
        className="pt-0"
        narrow
      >
        <Reveal delay={160}>
          <div className="mx-auto mt-14 max-w-3xl">
            <IntegrationPlate nodes={NETRA.integration.nodes} />
          </div>
        </Reveal>
      </SolutionSection>

      {/* ===================== SERVICE ===================== */}
      <SolutionSection
        mark={NETRA.service.mark}
        heading={NETRA.service.heading}
        lead={NETRA.service.lead}
        className="pt-0"
        narrow
      >
        <Reveal delay={160}>
          <SpecList items={NETRA.service.items} columns={3} className="mt-12" />
        </Reveal>
        <AudienceRow items={NETRA.audience} />
      </SolutionSection>

      <DishaBand
        slug={solution.slug}
        mark={NETRA.disha.mark}
        heading={NETRA.disha.heading}
        body={NETRA.disha.body}
      />

      <SolutionClosing
        mark={NETRA.closing.mark}
        heading={NETRA.closing.heading}
        lead={NETRA.closing.lead}
        cta={NETRA.closing.cta}
      />

      <SolutionCrossLinks slug={solution.slug} />
    </>
  );
}
