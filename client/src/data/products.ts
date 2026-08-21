import { Cpu, Radar, Camera, Satellite, Eye, CalendarClock, type LucideIcon } from "lucide-react";

/* ==========================================================================
   PRODUCT NAME GATING
   --------------------------------------------------------------------------
   Flip to `true` once the trademark is filed. Nothing else needs to change.

   Real names (DISHA, NEXUS, NETRA) appear ONLY in this file. Every page,
   nav item, footer link, and page <title> reads through `productName()` or
   the `name` field below, so the flag governs the whole site.

   Guard against regressions:
     grep -rn "DISHA\|NEXUS\|NETRA" client/src --exclude=data/products.ts
   should return nothing.
   ========================================================================== */
export const USE_REAL_NAMES = false;

/** The single set of gated labels. Left = real, right = generic. */
const NAMES = {
  platform: { real: "DISHA", generic: "Autonomy Platform" },
  groundAutonomy: { real: "NEXUS", generic: "Ground Autonomy" },
  anomalyDetection: { real: "NETRA", generic: "Anomaly Detection" },
} as const;

export type GatedName = keyof typeof NAMES;

/** Resolve a gated product name. The only way to render a product name. */
export function productName(key: GatedName): string {
  return USE_REAL_NAMES ? NAMES[key].real : NAMES[key].generic;
}

/* ==========================================================================
   Product model
   ========================================================================== */

export interface ProductItem {
  /** Stable anchor id — safe to expose, never a trademarked name. */
  id: string;
  /** Gated key, or a literal for ungated items (SAR, Optical, Rigel OS). */
  nameKey?: GatedName;
  /** Used only when `nameKey` is absent. SAR/Optical are generic terms. */
  literalName?: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  /**
   * Shown only when USE_REAL_NAMES is true — these gloss the real names, so
   * they must stay hidden while the generic labels are in play.
   */
  realNameHint?: string;
}

/** Resolve any item's display name, gated or literal. */
export function itemName(item: ProductItem): string {
  if (item.nameKey) return productName(item.nameKey);
  return item.literalName ?? "";
}

/** A hint is only meaningful next to the real name. */
export function itemHint(item: ProductItem): string | undefined {
  return USE_REAL_NAMES ? item.realNameHint : undefined;
}

/* ==========================================================================
   Platform intro
   ========================================================================== */

export const PLATFORM = {
  nameKey: "platform" as GatedName,
  eyebrow: "The platform",
  /** Preserved from the previous site. */
  headline: "Autonomous operations for the next generation of satellite constellations",
  intro:
    "One platform for constellation-scale missions. Anomaly detection, orbit determination, mission planning, and flight data analysis in a single system, designed to give a small operations team the reach of a much larger one.",
  /** Real acronym expansion — gated, as it reveals the real name. */
  realNameHint: "Digital Infrastructure for Spacecraft Handling and Analytics",
  vision:
    "Intelligent ground operations as the foundation for autonomous space systems.",
};

/* ==========================================================================
   Onboard Solutions → Data Processing
   ========================================================================== */

export const DATA_PROCESSING: ProductItem[] = [
  {
    id: "sar",
    literalName: "SAR",
    tagline: "Synthetic aperture radar processing, onboard.",
    description:
      "Radar data reduced to usable products on the spacecraft, so the downlink carries answers rather than raw frames.",
    icon: Radar,
  },
  {
    id: "optical",
    literalName: "Optical",
    tagline: "Optical imagery processing, onboard.",
    description:
      "Scene assessment and product generation at the sensor, so only what matters comes down.",
    icon: Camera,
  },
];

/* ==========================================================================
   Onboard Solutions → Rigel OS
   Not name-gated: no trademark filing pending on this one.
   ========================================================================== */

export const RIGEL: ProductItem & { status: string; features: string[] } = {
  id: "rigel-os",
  literalName: "Rigel OS",
  tagline: "Onboard intelligence for autonomous spacecraft.",
  description:
    "Part of the long-term vision for end-to-end autonomous mission stacks. An onboard flight software layer designed to give spacecraft the ability to execute mission logic independently. Currently in early research and development.",
  icon: Cpu,
  status: "In research and development",
  features: [
    "Onboard mission logic and decision making",
    "Autonomous response to operational conditions",
    "Designed to work alongside the platform for end-to-end autonomy",
    "Quiet development phase, more to share when ready",
  ],
};

/* ==========================================================================
   Ground Solutions
   ========================================================================== */

export const GROUND_SOLUTIONS: ProductItem[] = [
  {
    id: "ground-autonomy",
    nameKey: "groundAutonomy",
    tagline: "Mission planning and command for constellations.",
    description:
      "Builds conflict-free schedules, sends commands across the fleet, and re-plans automatically when conditions change. One operator can manage tasking for the entire constellation.",
    icon: CalendarClock,
    realNameHint: "NEXUS, Latin for connection. The action layer of the platform.",
  },
  {
    id: "anomaly-detection",
    nameKey: "anomalyDetection",
    tagline: "Fleet-wide intelligent monitoring.",
    description:
      "Continuous visibility across every spacecraft in the fleet. Anomaly detection that learns from operational data and surfaces issues with context, not just alerts.",
    icon: Eye,
    realNameHint: "NETRA, Sanskrit for eye. The perception layer of the platform.",
  },
];

/* ==========================================================================
   Platform capabilities — preserved from the previous DISHA page.
   ========================================================================== */

export const CAPABILITIES: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    icon: Eye,
    title: "Telemetry anomaly detection",
    desc: "Continuously watches telemetry across the fleet and flags deviations before they escalate. Every alert carries a recommended recovery action.",
  },
  {
    icon: Satellite,
    title: "Orbit determination and tracking",
    desc: "Maintains accurate orbital state for every spacecraft. Predicts ground station passes, imaging windows, and conjunction events.",
  },
  {
    icon: CalendarClock,
    title: "Mission planning and scheduling",
    desc: "Builds conflict-free schedules that respect power, thermal, and attitude constraints, and re-plans automatically when something changes.",
  },
  {
    icon: Cpu,
    title: "Unified fleet operations",
    desc: "Planning, monitoring, command and control, analysis, and response in one console, with a full audit trail of every action.",
  },
];

/** Early-adopter form. Preserved from the previous site. */
export const EARLY_ACCESS_URL = "https://forms.office.com/r/btRMdhuk4E";
