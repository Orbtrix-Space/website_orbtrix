import { Cpu, Satellite, Eye, CalendarClock, type LucideIcon } from "lucide-react";

/* ==========================================================================
   PRODUCT NAME GATING
   --------------------------------------------------------------------------
   The gate is OPEN: the real names ship. Set back to `false` to fall the whole
   site — nav, footer, page copy, <title> — back to the generic labels in one
   edit. Nothing else needs to change.

   Real names appear ONLY in this file. Every page, nav item, footer link, and
   page <title> reads through `productName()` or the `name` field below, so the
   flag governs the whole site.
   ========================================================================== */
export const USE_REAL_NAMES = true;

/** The single set of gated labels. Left = real, right = generic. */
const NAMES = {
  platform: { real: "DISHA", generic: "Ground Intelligence Platform" },
  groundAutonomy: { real: "Nexus", generic: "Mission Tasking & Operations" },
  anomalyDetection: { real: "Netra", generic: "Telemetry Intelligence" },
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
  /** Gated key, or a literal for ungated items (Rigel OS). */
  nameKey?: GatedName;
  /** Used only when `nameKey` is absent — a generic or unregistered name. */
  literalName?: string;
  /** The product-line label that sits under the name, e.g. "Onboard Autonomy". */
  role?: string;
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
  eyebrow: "Ground Intelligence Platform",
  /** Preserved from the previous site. */
  headline: "Autonomous operations for the next generation of satellite constellations",
  intro:
    "One platform for constellation-scale missions. Anomaly detection, orbit determination, mission planning, and flight data analysis in a single system, designed to give a small operations team the reach of a much larger one.",
  /* The architecture-section positioning, kept in one place so the homepage
     card and the DISHA page cannot drift apart. */
  positioning:
    "Mission control rebuilt for autonomy. Ingests telemetry, orbital dynamics, and spacecraft health to generate decisions, not dashboards.",
  /* NOTE: an earlier version of this file expanded DISHA as "Digital
     Infrastructure for Spacecraft Handling and Analytics". The expansion is
     not restored here on purpose — /disha does not use one, and one line of
     brand copy that only exists in this file is how two pages start disagreeing
     about what the product is called. Add it back only if it is the real,
     current expansion. */
  vision:
    "Intelligent ground operations as the foundation for autonomous space systems.",
};

/* ==========================================================================
   Onboard Solutions → Rigel OS
   Not name-gated: no trademark filing pending on this one.
   ========================================================================== */

export const RIGEL: ProductItem & { status: string; features: string[] } = {
  id: "rigel-os",
  literalName: "Rigel OS",
  role: "Onboard Autonomy",
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
