/* ==========================================================================
   Orbtrix — the company page.

   Two sections and a CTA. Deliberately short: a visitor should have the whole
   company in under a minute — IISc-incubated, full-stack autonomy, ground and
   onboard in a closed loop, designed to reduce operational burden. Anything
   that does not serve that sequence belongs on /disha or /solutions, not here.

   Two rules:

     1. NO FABRICATED CREDENTIALS. IISc incubation is stated because it is
        already stated elsewhere on the site. No laboratory, professor, grant,
        programme or partnership is named — none of those are established.

     2. THE 80% IS A TARGET, NOT A RESULT. It appears once, always as
        "targeting up to", always with the sentence that names what it depends
        on. It is never rendered as an achieved outcome or a guarantee.
   ========================================================================== */

/** A section identifier — the `# IDENT` / `$ cmd` pair. */
export interface Mark {
  ident: string;
  cmd: string;
}

/* ==========================================================================
   Section 1 — who we are
   ========================================================================== */

export const WHO = {
  mark: { ident: "ORBTRIX", cmd: "autonomy.full_stack()" } as Mark,
  heading: "Building the infrastructure for autonomous space missions.",
  body: [
    "Orbtrix is an IISc-incubated space technology startup building enabling systems for full-scale autonomy in space missions.",
    "We bring ground and onboard systems together into a closed-loop architecture — reducing manual operations, enabling spacecraft to make decisions closer to where they happen, and allowing missions to scale without proportionally increasing operational workload.",
  ],
  facts: [
    ["Founded", "2025"],
    ["Incubated", "Indian Institute of Science (IISc)"],
    ["Focus", "Autonomous space systems"],
    ["Approach", "Ground + Onboard autonomy"],
  ] as [string, string][],
};

/* ==========================================================================
   Section 2 — the thesis
   ========================================================================== */

export const THESIS = {
  mark: { ident: "AUTONOMY", cmd: "ground ↔ onboard" } as Mark,
  heading: ["Plan from the ground.", "Decide onboard."],
  lead: "We believe true mission autonomy comes from combining two layers of intelligence.",

  levels: [
    {
      side: "ground" as const,
      title: "Strategic autonomy",
      where: "GROUND",
      body:
        "The ground system handles longer-horizon planning, mission coordination, resource management and updates to onboard models, policies and mission logic.",
    },
    {
      side: "onboard" as const,
      title: "Tactical autonomy",
      where: "ONBOARD",
      body:
        "The onboard system uses spacecraft state, local conditions and mission rules to make immediate decisions and respond without waiting for ground intervention.",
    },
  ],

  /* The loop, drawn as a circulation rather than a list: down the ground side,
     across on mission intent, up the spacecraft side, back on telemetry. */
  loop: {
    ground: [
      { code: "STRATEGIC AUTONOMY", sub: "Long-horizon planning" },
      { code: "MISSION INTENT" },
    ],
    space: [
      { code: "TACTICAL AUTONOMY", sub: "Local decisions" },
      { code: "ACTION" },
    ],
    /* Not "MISSION INTENT" — that is already a node on the ground side, and
       labelling the crossing with it too printed the same words twice. */
    uplink: "UPLINK",
    downlink: "TELEMETRY",
  },

  statement: "Autonomy that reduces operational burden.",
  /* One sentence, and every qualifier in it is load-bearing. */
  opex:
    "Our architecture is designed to enable significant reductions in mission operations OPEX — targeting up to 80% depending on mission architecture and deployment.",
};

/* ==========================================================================
   Closing
   ========================================================================== */

export const CLOSING = {
  mark: { ident: "ORBTRIX", cmd: "mission.autonomy()" } as Mark,
  heading: "Build autonomous missions with us.",
  primary: { label: "Explore DISHA", href: "/disha" },
  secondary: { label: "Talk to us", href: "/contact" },
};
