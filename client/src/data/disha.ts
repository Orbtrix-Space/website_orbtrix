/* ==========================================================================
   DISHA — Orbtrix's unified, autonomous mission operations platform.

   Every word the /disha page renders lives here. The page file is layout and
   motion; this file is the product. Two rules govern what may be added:

     1. NO FABRICATED VALUES. Nothing in this file states an altitude, a
        velocity, a timestamp, a count or a percentage, and neither do the
        readouts and plots the page builds from it. They carry shapes and
        states, never numbers — a number on a marketing page is a claim about
        a real spacecraft.

     2. CAPABILITY LANGUAGE, NOT HERITAGE LANGUAGE. "provides", "supports",
        "designed to", "built for". No flight heritage, no named protocols, no
        named third-party integrations, no AI decision-making, until those
        exist and someone can point at them.

   The four modules are one system. Their order — C3, Flight, Monitor, Task —
   is the order the page scrolls, the order the nav dropdown lists, and the
   order the integration diagram reads. Changing it here changes it everywhere.
   ========================================================================== */

/** A capability tile: a short all-caps code and one sentence under it. */
export interface Capability {
  code: string;
  desc: string;
  /**
   * Standard astrodynamics notation, rendered as a corner token on the Flight
   * hero's feature blocks. NOTATION ONLY — a symbol for a quantity, never a
   * value of one. "Δv" names the quantity a maneuver is planned in; "Δv = 12
   * m/s" would be a claim about a spacecraft, and rule 1 above forbids it.
   */
  symbol?: string;
}
/** One of the four module screens. */
export interface DishaModule {
  /** Anchor id — `/disha#c3`. Also the nav dropdown target. */
  id: string;
  /** Section number, rendered in the rail and in the screen corner. */
  index: string;
  /** The `#` identifier. Underscored, because that is how it is named. */
  ident: string;
  /**
   * The `$` line under it. snake_case with parentheses — `flight_dynamics()` —
   * and that form is load-bearing: it is how a MODULE of this one platform is
   * written. The Solutions pages use a dotted namespace instead
   * (`telemetry.intelligence()`, `image.process()`) because those are separate
   * capabilities rather than layers of a single product. Same notation system,
   * two grammars, and the grammar tells you which kind of thing you are
   * looking at. The nav dropdown repeats these verbatim.
   */
  cmd: string;
  /** Short human name for the rail — "C3", "Flight". */
  short: string;
  /** What the module is, in plain words. The nav dropdown's second line. */
  role: string;
  /** The large heading, one line per array entry. */
  heading: string[];
  lead: string;
  capabilities: Capability[];
  /** The operational chain this module owns, rendered as a flow. */
  chain: string[];
  /** Caption under the chain — why the chain is the point. */
  chainNote: string;
  /**
   * The heading over this module’s feature blocks — "ORBIT KEY FEATURES" and
   * its three siblings — with the `$` line that sits opposite it.
   *
   * These exist because all four screens now render their capabilities in the
   * same block treatment. Flight had it first and was the only one that did,
   * which made three of the four modules look like a specification sheet and
   * one of them look like a product. Same cards everywhere; only the title
   * changes.
   */
  featuresTitle: string;
  featuresCmd: string;
  /**
   * One sentence, revealed under the module's name in the platform strip when
   * a visitor engages it. Deliberately NOT the module's `lead` — the lead is
   * a paragraph written for someone who has already scrolled to that module's
   * screen. This answers the smaller question the strip is actually being
   * asked: "what does this one do?", in a breath, without leaving the section.
   *
   * Keep it to two lines at a quarter of the container. Anything longer and
   * the strip stops being a strip.
   */
  blurb: string;
}

export const MODULES: DishaModule[] = [
  {
    id: "c3",
    index: "01",
    ident: "DISHA_C3",
    cmd: "command_control()",
    short: "C3",
    role: "Command & Control",
    heading: ["Command the mission.", "Control the spacecraft."],
    lead:
      "DISHA_C3 provides the command-and-control layer for mission operations — giving operators a unified environment to prepare, validate, execute and track spacecraft commands and operational procedures.",
    capabilities: [
      { code: "COMMANDING", desc: "Prepare and execute spacecraft commands." },
      { code: "PROCEDURES", desc: "Build structured operational procedures and workflows." },
      { code: "VALIDATION", desc: "Validate actions before execution." },
      {
        code: "SEQUENCING",
        desc: "Coordinate commands and activities in the correct operational order.",
      },
      { code: "EXECUTION", desc: "Track command execution and operational state." },
      {
        code: "GROUND CONNECTIVITY",
        desc: "Connect spacecraft operations with the ground infrastructure required to execute them.",
      },
    ],
    chain: ["MISSION INTENT", "PROCEDURE", "COMMAND", "EXECUTION", "SPACECRAFT STATE"],
    chainNote:
      "C3 is not a command console. It is the operational control layer that carries an operator's intent all the way to spacecraft state — and reports back what actually happened.",
    blurb:
      "Command, telemetry and spacecraft control in one connected operational layer.",
    featuresTitle: "CONTROL KEY FEATURES",
    featuresCmd: "control.provides()",
  },
  {
    id: "flight",
    index: "02",
    ident: "DISHA_FLIGHT",
    cmd: "flight_dynamics()",
    short: "Flight",
    role: "Flight Dynamics",
    heading: ["Understand where the spacecraft is.", "Plan where it needs to go."],
    lead:
      "DISHA_Flight provides the flight-dynamics and orbital operations layer required to understand spacecraft motion, determine orbital state, analyze trajectories and support mission planning.",
    /* Rendered as the ORBIT KEY FEATURES blocks in the hero's black column
       rather than as the capability grid the other three screens use — this is
       the one module whose right-hand half is a photograph, so its features
       move into the reading column with it. Same six capabilities, same
       code-and-sentence structure; the symbols are the only addition. */
    capabilities: [
      {
        code: "ORBIT DETERMINATION",
        desc: "Determine and maintain precise spacecraft orbital state.",
        symbol: "r, v",
      },
      {
        code: "ORBIT PROPAGATION",
        desc: "Propagate position and velocity across mission timelines.",
        symbol: "r(t)",
      },
      {
        code: "TRAJECTORY ANALYSIS",
        desc: "Analyze orbital evolution, trajectories and mission geometry.",
        symbol: "a e i",
      },
      {
        code: "MANEUVER PLANNING",
        desc: "Design and evaluate orbital maneuvers before execution.",
        symbol: "Δv",
      },
      {
        code: "PROXIMITY AWARENESS",
        desc: "Track nearby objects, conjunction geometry and relative motion.",
        symbol: "ρ",
      },
      {
        code: "MISSION GEOMETRY",
        desc: "Understand spacecraft, target, Sun and Earth geometry for mission operations.",
        symbol: "☉ ⊕",
      },
    ],
    chain: ["STATE", "PROPAGATE", "ANALYZE", "PLAN", "EXECUTE"],
    chainNote:
      "Orbital state is not a readout to be looked at. It is the input every contact window, every schedule and every maneuver is built from.",
    blurb:
      "Orbit determination, propagation, trajectory analysis and flight-dynamics support for mission planning.",
    featuresTitle: "ORBIT KEY FEATURES",
    featuresCmd: "orbit.propagate()",
  },
  {
    id: "monitor",
    index: "03",
    ident: "DISHA_MONITOR",
    cmd: "mission_monitor()",
    short: "Monitor",
    role: "Mission Monitoring",
    heading: ["See the mission.", "Understand its state."],
    lead:
      "DISHA_Monitor provides the common operational picture for spacecraft and mission teams — bringing telemetry, spacecraft health, events, alerts and operational state into one environment.",
    capabilities: [
      { code: "TELEMETRY", desc: "Observe spacecraft telemetry and mission data." },
      { code: "SPACECRAFT HEALTH", desc: "Understand spacecraft operational condition." },
      { code: "EVENTS", desc: "Track significant mission and spacecraft events." },
      { code: "ALERTS", desc: "Surface conditions requiring operator attention." },
      { code: "MISSION STATE", desc: "Understand the current operational state of the mission." },
      {
        code: "HISTORICAL ANALYSIS",
        desc: "Analyze mission data and spacecraft behaviour over time.",
      },
      {
        code: "MULTI-LEVEL VISUALIZATION",
        desc: "Move from fleet-level awareness to spacecraft-level operational detail.",
      },
    ],
    chain: ["CONSTELLATION", "SPACECRAFT", "SUBSYSTEM", "PARAMETER"],
    chainNote:
      "Don't make operators search for the information they need. Bring the information to them.",
    blurb:
      "Continuous spacecraft-state monitoring, telemetry analysis and contextual anomaly detection.",
    featuresTitle: "MONITORING KEY FEATURES",
    featuresCmd: "telemetry.observe()",
  },
  {
    id: "task",
    index: "04",
    ident: "DISHA_TASK",
    cmd: "mission_tasking()",
    short: "Task",
    role: "Tasking & Orchestration",
    heading: ["Turn mission intent into action."],
    lead:
      "DISHA_Task connects mission objectives with executable operational activities — allowing teams to create, schedule, coordinate and automate mission tasks across spacecraft and ground resources.",
    capabilities: [
      { code: "MISSION TASKING", desc: "Define and organize mission activities." },
      {
        code: "SCHEDULING",
        desc: "Schedule activities according to mission constraints and available resources.",
      },
      {
        code: "GROUND NETWORK ORCHESTRATION",
        desc: "Coordinate ground-station access and communication opportunities.",
      },
      {
        code: "RESOURCE AWARENESS",
        desc: "Understand spacecraft, ground and operational resource availability.",
      },
      { code: "WORKFLOW AUTOMATION", desc: "Automate repeatable operational workflows." },
      { code: "TASK EXECUTION", desc: "Track planned, active and completed activities." },
      {
        code: "HUMAN-IN-THE-LOOP",
        desc: "Keep operators in control where mission rules require approval or intervention.",
      },
    ],
    chain: ["MISSION OBJECTIVE", "TASK", "RESOURCE", "SCHEDULE", "EXECUTION", "RESULT"],
    chainNote:
      "Task is where the other three meet: it reads spacecraft state from Flight, reserves the ground pass, hands the sequence to C3, and closes the loop against what Monitor observed.",
    blurb:
      "Create, schedule and coordinate mission activities across spacecraft, payloads and operational constraints.",
    featuresTitle: "TASKING KEY FEATURES",
    featuresCmd: "task.orchestrate()",
  },
];

/* ==========================================================================
   Hero
   ========================================================================== */

export const HERO = {
  ident: "DISHA",
  cmd: "mission.operations()",
  statement: "The operational layer for autonomous spacecraft missions.",
  lead:
    "DISHA unifies command and control, flight dynamics, spacecraft monitoring, and mission tasking into a single operational environment — connecting mission intent with execution.",
};

/* ==========================================================================
   Platform transition
   ========================================================================== */

export const PLATFORM_INTRO = {
  ident: "DISHA_PLATFORM",
  cmd: "unified.operations()",
  heading: ["One platform.", "Four operational layers."],
  lead:
    "DISHA brings the critical functions of spacecraft mission operations together into one connected system.",
};

/* ==========================================================================
   Integration — the four modules as one system
   ========================================================================== */

export const INTEGRATION = {
  ident: "DISHA",
  cmd: "modules.connected()",
  heading: ["Four modules.", "One mission."],
  /** One line per module, in module order. Rendered beside the diagram. */
  relations: [
    { id: "c3", label: "DISHA_C3", says: "controls execution." },
    {
      id: "flight",
      label: "DISHA_Flight",
      says: "understands spacecraft state and orbital behaviour.",
    },
    { id: "monitor", label: "DISHA_Monitor", says: "provides operational awareness." },
    { id: "task", label: "DISHA_Task", says: "turns mission intent into coordinated activity." },
  ],
};

/* ==========================================================================
   Autonomy

   The ladder is deliberately four rungs with the operator standing on the
   first one. Every rung above MANUAL is qualified: DISHA does what the mission
   rules authorize, and the mission owner writes those rules.
   ========================================================================== */





/* ==========================================================================
   The Early Adopter Programme.

   ONE statement on one screen, and it used to be a great deal more: an
   adoption model, a three-point commercial case, a mission-to-fleet ladder and
   a separate closing CTA. Each was defensible on its own and together they
   asked a visitor to read a brochure before finding the way in.

   What survives is the offer itself: what you get, what it costs to start, and
   two ways to begin. The narrative is meant to land in one breath —

     DISHA modules -> minimal-cost entry -> use it on your mission ->
     validate -> expand

   ---- WHAT MAY NOT BE WRITTEN HERE ---------------------------------------
   The rules at the top of this file apply with more force here, not less. No
   named customers, no named missions, no timelines, no performance figures.

   Pricing is the trap this section exists inside. "minimal early-stage cost"
   is the strongest claim permitted, and it is deliberately not a number, not a
   percentage, not a tier and not a duration — none has been approved. It is
   also never framed as a saving: this is a programme a mission team joins to
   put DISHA on a real mission early, and the low entry cost is the mechanism,
   not the pitch. If anyone rewrites this toward "free trial", "discount" or a
   figure, that is a commercial decision and needs to be signed off as one.
   ========================================================================== */
export const EARLY_ADOPTER = {
  ident: "EARLY_ADOPTER",
  cmd: "mission.configure()",
  heading: ["Start with DISHA.", "Build toward autonomy."],
  lead:
    "DISHA's Early Adopter Programme gives mission teams access to selected DISHA platform modules at minimal early-stage cost, starting with the operational workflows that matter most.",
  /* The whole adoption model, compressed into the one line that survived it. */
  note: "Start small. Validate the value. Expand when ready.",
  primary: { label: "Join the Early Adopter Programme", href: "/contact" },
  secondary: { label: "Talk to the team", href: "/contact" },

  /* The section's full-screen ground. Both encodings: the WebP is what ships,
     the PNG is the <picture> fallback. */
  image: "/Images/earlyadopter.png",
  imageWebp: "/Images/earlyadopter.webp",
};

export const DISHA_LOGO = "/Images/DISHA_Logo_alpha.png";

/* --------------------------------------------------------------------------
   The Flight hero photograph.

   Renamed from the uploaded "Disha image _website.png": two spaces in a path
   that has to survive a URL, a CSS url(), and a static host is a bug waiting
   to happen.

   The asset carries Earth and the spacecraft on its LEFT half with empty space
   on the right, which is the mirror image of the composition this hero needs —
   so it is flipped on one axis in CSS (see .dsh-hero-img). Nothing in the frame
   is text or a recognisable orientation cue at this scale, but the flip does
   mirror the visible landmass: swap in a natively right-weighted frame and
   drop the transform if that ever matters.
   -------------------------------------------------------------------------- */
/* Two encodings of one photograph. WebP is what almost every visitor gets —
   1854KB of PNG became 70KB — and the PNG stays as the <picture> fallback for
   anything that cannot decode it. Regenerate with:
     node scripts/png-to-webp.cjs 0.86 client/public/Images/<file>.png */
export const FLIGHT_HERO = {
  imageWebp: "/Images/Disha_image_website.webp",
  image: "/Images/Disha_image_website.png",
  alt: "A spacecraft in low Earth orbit, over the night side of Earth.",
  width: 1536,
  height: 1024,
  /* The asset carries Earth and the spacecraft on its LEFT with empty space to
     the right, and this composition needs the opposite — so the element is
     flipped on one axis. Safe here: the frame holds a spacecraft and a
     planet's limb, neither of which reads as reversed. See TASK_HERO for the
     case where it is NOT safe. */
  mirrored: true,
  /** Which side of the screen the photograph occupies. */
  side: "right" as const,
};

/* The Task screen's photograph. A mission operations floor, and the mirror of
   FLIGHT_HERO in composition: subject on the LEFT, empty space on the right.

   It is NOT flipped. Flight's asset can be, because a spacecraft over a
   planet's limb has no readable content in it; this frame is full of wall
   displays carrying a world map and legible labels, and every one of them
   would come out reversed. So the photograph keeps its orientation and the
   reading column moves to the other side instead — same treatment, mirrored
   layout, honest image. */
export const TASK_HERO = {
  imageWebp: "/Images/disha_task_BG.webp",
  image: "/Images/disha_task_BG.png",
  alt: "A mission operations floor: operators at consoles before a wall of displays showing a world map, spacecraft telemetry and an orbital view of Earth.",
  width: 1672,
  height: 941,
  mirrored: false,
  side: "left" as const,
};
export const DISHA_MONITOR_WEBP = "/Images/DISHA_in_Monitor.webp";
export const DISHA_MONITOR = "/Images/DISHA_in_Monitor.png";
