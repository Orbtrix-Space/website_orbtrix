/* ==========================================================================
   Orbtrix Solutions — NETRA, NEXUS, Onboard Optical Processing.

   Three commercially deployable capabilities Orbtrix can deliver today, while
   DISHA — the unified mission operations platform — continues to evolve. Every
   word the three /solutions/* pages render lives here.

   Two rules, the same two that govern data/disha.ts:

     1. NO FABRICATED VALUES AND NO FABRICATED HERITAGE. Nothing here states a
        bandwidth saving, a detection rate, a spacecraft count or a latency.
        Nothing here claims flight heritage, space qualification, a named
        standard (CCSDS, MIL-STD), a named third-party integration, or AI.
        Where a capability is mission-specific or still being built, it says so
        in those words: "designed to", "supports", "can provide", "can be
        integrated", "developed around mission requirements".

     2. THE THREE ARE ONE FAMILY. They share a page architecture, a notation
        system and a closing relationship to DISHA:

              NETRA            observe
              NEXUS            orchestrate
              ONBOARD OPTICAL  process
              DISHA            unify + automate

        They are Orbtrix capabilities, not three unrelated products, and no
        page is allowed to imply it IS DISHA.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Shared shapes
   -------------------------------------------------------------------------- */

/** A capability, service line or application: a code and one sentence. */
export interface Entry {
  code: string;
  desc: string;
}

/** A section identifier — the `# IDENT` / `$ cmd` pair. */
export interface Mark {
  ident: string;
  cmd: string;
}

/** One solution's identity. Drives the nav, the cross-links and the routes. */
export interface Solution {
  /** Route slug: /solutions/<slug>. */
  slug: string;
  /** Display name, as it appears in a heading. */
  name: string;
  /** The `#` identifier — underscored, because that is how it is named. */
  ident: string;
  /** The `$` line under it. */
  cmd: string;
  /** What it is, in four words. Nav dropdown second line, cross-link subtitle. */
  role: string;
  /** Its one verb in the family diagram: observe / orchestrate / process. */
  verb: string;
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "netra",
    name: "NETRA",
    ident: "NETRA",
    cmd: "telemetry.intelligence()",
    role: "Telemetry Intelligence",
    verb: "OBSERVE",
  },
  {
    slug: "nexus",
    name: "NEXUS",
    ident: "NEXUS",
    cmd: "mission.task()",
    role: "Mission Tasking & Ground Operations",
    verb: "ORCHESTRATE",
  },
  {
    slug: "onboard-optical",
    name: "Onboard Optical Processing",
    ident: "ONBOARD_OPTICAL",
    cmd: "image.process()",
    role: "Payload Data Processing",
    verb: "PROCESS",
  },
];

export const SOLUTION_BY_SLUG = Object.fromEntries(
  SOLUTIONS.map((s) => [s.slug, s]),
) as Record<string, Solution>;

/** The two other solutions, for the cross-link strip at the foot of a page. */
export function otherSolutions(slug: string): Solution[] {
  return SOLUTIONS.filter((s) => s.slug !== slug);
}

/* ==========================================================================
   NETRA — telemetry intelligence
   ========================================================================== */

export const NETRA = {
  meta: {
    title: "NETRA — Telemetry Intelligence",
    description:
      "NETRA turns spacecraft telemetry into operational intelligence: health monitoring, trend analysis, event correlation, anomaly investigation and fleet-level awareness.",
  },

  hero: {
    heading: "Turn spacecraft telemetry into operational intelligence.",
    lead:
      "NETRA helps mission teams transform spacecraft telemetry into a clearer operational picture — making it easier to monitor spacecraft health, understand behaviour, investigate anomalies and identify what requires attention.",
    primary: { label: "Talk to our team", href: "/contact" },
    secondary: { label: "Explore capabilities", href: "#capabilities" },
  },

  problem: {
    mark: { ident: "PROBLEM", cmd: "telemetry >> awareness" },
    heading: "More telemetry doesn't mean more awareness.",
    body: [
      "Spacecraft generate large volumes of telemetry across subsystems and operational modes.",
      "The operational challenge is understanding that data: identifying meaningful changes, correlating events across subsystems, and determining what actually requires action.",
    ],
  },

  capabilities: {
    mark: { ident: "CAPABILITIES", cmd: "netra.provides()" },
    heading: "What NETRA does.",
    items: [
      { code: "TELEMETRY INGESTION", desc: "Bring spacecraft telemetry into one operational picture." },
      { code: "HEALTH MONITORING", desc: "Track subsystem condition and spacecraft operational state." },
      { code: "TREND ANALYSIS", desc: "Follow parameter behaviour across a mission rather than a pass." },
      { code: "EVENT CORRELATION", desc: "Relate events across subsystems and operational modes." },
      { code: "ANOMALY DETECTION", desc: "Surface behaviour that departs from what the mission expects." },
      { code: "FLEET MONITORING", desc: "Hold awareness across several spacecraft at once." },
      { code: "HISTORICAL ANALYSIS", desc: "Investigate past behaviour with the context around it." },
      { code: "OPERATIONAL AWARENESS", desc: "Present spacecraft state in the terms operators work in." },
    ] as Entry[],
  },

  workflow: {
    mark: { ident: "SPACECRAFT_STATE", cmd: "telemetry → intelligence" },
    heading: "From raw telemetry to an operator decision.",
    lead:
      "Each stage narrows the data and adds context. What arrives at the operator is a state to act on, not a stream to read.",
    steps: [
      { code: "RAW TELEMETRY", desc: "Downlinked spacecraft data, as received." },
      { code: "PARAMETERS", desc: "Decoded and organised into the quantities operators work in." },
      { code: "EVENTS", desc: "Changes worth noticing, marked in time." },
      { code: "PATTERNS", desc: "Behaviour across parameters, modes and passes." },
      { code: "SPACECRAFT STATE", desc: "What the spacecraft is doing, and how it is doing." },
      { code: "OPERATOR ACTION", desc: "The decision the state calls for." },
    ] as Entry[],
  },

  anomaly: {
    mark: { ident: "ANOMALY", cmd: "anomaly.detect()" },
    heading: "An alert is the start of the work, not the end of it.",
    lead:
      "NETRA is designed to help operators investigate and prioritise, rather than to produce more alerts. A deviation arrives with the context needed to judge it.",
    steps: ["EXPECTED", "OBSERVED", "DEVIATION", "CONTEXT", "INVESTIGATION"],
    note:
      "The comparison below is illustrative: an expected band, an observed parameter, and the point at which the two separate.",
  },

  fleet: {
    mark: { ident: "FLEET", cmd: "spacecraft[]" },
    heading: "Fleet first. Then the parameter that explains it.",
    lead:
      "Operational awareness starts at the level of the fleet and narrows only where something asks for attention.",
    /* Conceptual, and labelled as such on the page. Statuses are words, never
       counts, temperatures or timestamps. */
    craft: [
      { id: "SPACECRAFT 01", state: "NOMINAL" },
      { id: "SPACECRAFT 02", state: "NOMINAL" },
      { id: "SPACECRAFT 03", state: "ATTENTION" },
      { id: "SPACECRAFT 04", state: "NOMINAL" },
    ],
    drill: ["FLEET", "SPACECRAFT", "SUBSYSTEM", "PARAMETER"],
  },

  integration: {
    mark: { ident: "INTEGRATION", cmd: "telemetry.connect()" },
    heading: "Built to sit around the mission infrastructure you already run.",
    lead:
      "NETRA is designed to be integrated with a mission's existing systems rather than to replace them. Interfaces are developed around mission requirements.",
    nodes: [
      "SPACECRAFT TELEMETRY",
      "GROUND SYSTEMS",
      "MISSION DATABASES",
      "COMMAND SYSTEMS",
      "OPERATIONAL DATA",
      "EXTERNAL INTERFACES",
    ],
  },

  service: {
    mark: { ident: "DEPLOY", cmd: "netra.configure()" },
    heading: "Start with the telemetry problem you need to solve.",
    lead:
      "Orbtrix delivers NETRA as mission-specific engineering. Scope is set by the operational problem, not by a licence tier.",
    items: [
      { code: "TELEMETRY PIPELINES", desc: "Getting mission data into a usable operational form." },
      { code: "MONITORING", desc: "Health and state monitoring built around the spacecraft." },
      { code: "HEALTH ANALYSIS", desc: "Subsystem behaviour, examined across the mission." },
      { code: "ANOMALY WORKFLOWS", desc: "How a deviation is surfaced, investigated and closed out." },
      { code: "FLEET MONITORING", desc: "Awareness that holds as the number of spacecraft grows." },
      { code: "OPERATIONAL DATA ANALYSIS", desc: "Answering the questions the mission keeps asking." },
    ] as Entry[],
  },

  audience: [
    "Satellite operators",
    "Mission operations teams",
    "New-space companies",
    "Constellation operators",
    "Spacecraft developers",
  ],

  disha: {
    mark: { ident: "DISHA", cmd: "observe()" },
    heading: ["NETRA provides the intelligence layer.", "DISHA brings the mission together."],
    body:
      "NETRA is a focused operational capability: telemetry, health and awareness, delivered around one mission's problem. DISHA is Orbtrix's broader mission operations platform, where command and control, flight dynamics, monitoring and tasking run as one system. NETRA can be delivered on its own, and the work carries forward.",
  },

  closing: {
    mark: { ident: "NETRA", cmd: "telemetry.intelligence()" },
    heading: "Make spacecraft data operationally useful.",
    lead: "Tell us what your telemetry is failing to tell you, and we will scope the work.",
    cta: "Talk to Orbtrix",
  },
};

/* ==========================================================================
   NEXUS — mission tasking and ground operations
   ========================================================================== */

/* The NEXUS hero's photographic ground.

   Composed for this layout rather than cropped into it: the frame is empty on
   the left, where the copy sits, and carries the constellation and Earth's
   limb on the right, where the figure used to be. Nothing is mirrored and
   nothing is panned — the picture already agrees with the page.

   Both encodings: the WebP ships (1281KB of PNG became 44KB), the PNG is the
   <picture> fallback. */
export const NEXUS_HERO_IMAGE = {
  image: "/Images/NexusHeroImage.png",
  imageWebp: "/Images/NexusHeroImage.webp",
  width: 1672,
  height: 941,
  alt: "A constellation of spacecraft in linked orbits above Earth's night side.",
};

export const NEXUS = {
  meta: {
    title: "NEXUS — Mission Tasking & Ground Operations",
    description:
      "NEXUS connects mission tasking, scheduling and ground-network coordination into one structured operational workflow, from mission objective to executed activity.",
  },

  hero: {
    heading: "Turn mission intent into executable operations.",
    lead:
      "NEXUS connects mission tasking, scheduling and ground-network coordination into a structured operational workflow — helping teams move from what a spacecraft needs to do to when and how it will be executed.",
    primary: { label: "Talk to our team", href: "/contact" },
    secondary: { label: "Explore capabilities", href: "#capabilities" },
  },

  problem: {
    mark: { ident: "PROBLEM", cmd: "dependencies++" },
    heading: "Mission complexity grows faster than the spacecraft count.",
    body: [
      "A second spacecraft does not double the work. Every objective depends on an activity, every activity on a schedule, every schedule on a ground contact, and every contact on a resource that something else also wants.",
      "Those dependencies are what teams actually spend their time on, and they are what a spreadsheet stops holding first.",
    ],
    /* Rendered as a dependency web. These are the things that depend on each
       other in an operations plan — not a claim about any one mission. */
    nodes: [
      "MISSION OBJECTIVES",
      "SPACECRAFT ACTIVITIES",
      "SCHEDULES",
      "GROUND CONTACTS",
      "RESOURCES",
      "COMMANDS",
      "CONSTRAINTS",
    ],
  },

  capabilities: {
    mark: { ident: "CAPABILITIES", cmd: "nexus.provides()" },
    heading: "What NEXUS does.",
    items: [
      { code: "MISSION TASKING", desc: "Define and organise the activities a mission needs performed." },
      { code: "SCHEDULING", desc: "Place activities in time against constraints and resources." },
      { code: "GROUND COORDINATION", desc: "Align tasking with ground-network availability." },
      { code: "RESOURCE AWARENESS", desc: "Know what spacecraft and ground resources are free." },
      { code: "CONFLICT AWARENESS", desc: "Surface where two activities want the same thing." },
      { code: "COMMAND PREPARATION", desc: "Turn a scheduled activity into what the spacecraft executes." },
      { code: "EXECUTION TRACKING", desc: "Follow planned, active and completed activities." },
      { code: "WORKFLOW AUTOMATION", desc: "Automate the operational steps that repeat." },
    ] as Entry[],
  },

  flow: {
    mark: { ident: "MISSION_FLOW", cmd: "objective → execution" },
    heading: "One path from objective to result.",
    lead:
      "Every stage is a decision someone currently makes by hand. NEXUS is designed to hold them as one connected workflow.",
    steps: [
      { code: "MISSION OBJECTIVE", desc: "What the mission needs to achieve." },
      { code: "TASK", desc: "The activity that achieves it." },
      { code: "CONSTRAINTS", desc: "What the spacecraft and the mission will allow." },
      { code: "SCHEDULE", desc: "When it can actually happen." },
      { code: "GROUND CONTACT", desc: "The pass that carries it up or brings it down." },
      { code: "COMMAND / PROCEDURE", desc: "The form the spacecraft executes." },
      { code: "EXECUTION", desc: "The activity, performed." },
      { code: "RESULT", desc: "What came back, against what was asked." },
    ] as Entry[],
  },

  tasking: {
    mark: { ident: "TASKING", cmd: "task.create()" },
    heading: "Define the work before the spacecraft does it.",
    lead:
      "Structured creation and management of mission activities, so an operational request is a defined object rather than an entry in a message thread.",
    /* Explicitly labelled on the page as representative, because NEXUS does
       not ship a fixed catalogue of task types — they are defined per mission. */
    examples: [
      "OBSERVATION",
      "COMMUNICATION",
      "MANEUVER",
      "PAYLOAD ACTIVITY",
      "HEALTH CHECK",
      "HOUSEKEEPING",
    ],
    note:
      "Representative activity types. Task definitions are developed around mission requirements rather than supplied as a fixed catalogue.",
  },

  ground: {
    mark: { ident: "GROUND", cmd: "contact.schedule()" },
    heading: "Coordinate the ground with the mission.",
    lead:
      "NEXUS is designed to connect task planning with ground-network availability and communication opportunities, so a plan is made against the passes that actually exist.",
    steps: ["SPACECRAFT", "CONTACT WINDOW", "GROUND STATION", "COMMAND / DATA", "MISSION RESULT"],
    note:
      "Coordination and planning against known ground-network availability. Automatic booking with a ground-station provider is a mission-specific integration, not a built-in capability.",
  },

  schedule: {
    mark: { ident: "SCHEDULE", cmd: "constraints.resolve()" },
    heading: "A mission schedule is more than a timeline.",
    lead:
      "Six kinds of input have to agree before an activity can be placed in time. A schedule is what is left once they do.",
    inputs: [
      "SPACECRAFT CONSTRAINTS",
      "GROUND CONTACTS",
      "TASK DEPENDENCIES",
      "PRIORITIES",
      "TIMING CONSTRAINTS",
      "RESOURCE AVAILABILITY",
    ],
    output: "EXECUTABLE SCHEDULE",
  },

  scale: {
    mark: { ident: "SCALE", cmd: "spacecraft[]" },
    heading: "One workflow from one spacecraft to a fleet.",
    lead:
      "The operational architecture is designed to stay the same as the fleet grows. What changes is how much of it runs without being asked.",
    stages: ["1 SPACECRAFT", "MULTIPLE SPACECRAFT", "CONSTELLATION"],
  },

  service: {
    mark: { ident: "DEPLOY", cmd: "nexus.configure()" },
    heading: "Operations engineering, delivered around your mission.",
    lead:
      "Orbtrix can take on the tasking and planning problem end to end, or the part of it that is currently costing the most.",
    items: [
      { code: "MISSION TASKING", desc: "How activities are defined, requested and approved." },
      { code: "MISSION PLANNING", desc: "Turning objectives into a plan the mission can fly." },
      { code: "GROUND COORDINATION", desc: "Planning against contact availability across the network." },
      { code: "SCHEDULING WORKFLOWS", desc: "Constraint handling, priorities and conflict awareness." },
      { code: "OPERATIONS WORKFLOW DESIGN", desc: "The procedure a team follows, made explicit." },
      { code: "CONSTELLATION OPERATIONS", desc: "The same workflow, held across many spacecraft." },
      { code: "COMMAND PREPARATION", desc: "From a scheduled activity to an executable sequence." },
    ] as Entry[],
  },

  audience: [
    "Satellite operators",
    "Mission operations teams",
    "Ground-network teams",
    "Constellation operators",
    "Spacecraft companies",
  ],

  disha: {
    mark: { ident: "DISHA", cmd: "orchestrate()" },
    heading: ["NEXUS coordinates the mission.", "DISHA connects the entire operational loop."],
    body:
      "NEXUS is a focused operational capability: tasking, scheduling and ground coordination, delivered around one mission's workflow. DISHA is Orbtrix's broader mission operations platform, where that workflow closes against command and control, flight dynamics and monitoring. NEXUS can be delivered on its own, and the work carries forward.",
  },

  closing: {
    mark: { ident: "NEXUS", cmd: "mission.task()" },
    heading: "Make mission tasking a system, not a manual process.",
    lead: "Tell us where your operations plan is being held together by hand, and we will scope the work.",
    cta: "Talk to Orbtrix",
  },
};

/* ==========================================================================
   ONBOARD OPTICAL PROCESSING
   ========================================================================== */

export const OPTICAL = {
  meta: {
    title: "Onboard Optical Processing",
    description:
      "Orbtrix develops mission-specific onboard optical processing pipelines that turn raw sensor data into useful information closer to the point of collection.",
  },

  hero: {
    heading: "Process imagery before it reaches the ground.",
    lead:
      "Orbtrix develops mission-specific onboard optical processing pipelines that transform raw sensor data into useful information closer to the point of collection.",
    primary: { label: "Discuss your mission", href: "/contact" },
    secondary: { label: "Explore capabilities", href: "#capabilities" },
  },

  problem: {
    mark: { ident: "PAYLOAD_DATA", cmd: "raw_data++" },
    heading: "The spacecraft can capture more data than it can efficiently downlink.",
    body: [
      "High-resolution optical payloads can produce significant volumes of data.",
      "Communication bandwidth and ground-contact opportunities limit how much raw imagery can be transmitted. The constraint is not the sensor — it is the pass.",
      "Onboard processing allows a mission to decide what is worth sending before the link opens.",
    ],
  },

  pipeline: {
    mark: { ident: "PROCESSING_PIPELINE", cmd: "raw_image → product" },
    heading: "The pipeline runs where the data is collected.",
    lead:
      "Each stage is developed around the payload and the mission product. What leaves the spacecraft is what the mission asked for.",
    steps: [
      { code: "OPTICAL SENSOR", desc: "The payload, collecting." },
      { code: "RAW IMAGE", desc: "Sensor output, before anything is decided about it." },
      { code: "PREPROCESSING", desc: "Corrections and conditioning the payload requires." },
      { code: "IMAGE PROCESSING", desc: "The mission's processing steps, applied onboard." },
      { code: "FEATURE EXTRACTION", desc: "The content the mission is actually after." },
      { code: "MISSION PRODUCT", desc: "A result, rather than a frame." },
      { code: "SELECTIVE DOWNLINK", desc: "Only what the pass needs to carry." },
    ] as Entry[],
  },

  capabilities: {
    mark: { ident: "CAPABILITIES", cmd: "pipeline.build()" },
    heading: "What the pipeline can be built to do.",
    lead:
      "Pipelines are developed around mission requirements. The stages below describe what Orbtrix can build into one, not a fixed feature set shipped with a product.",
    items: [
      { code: "IMAGE PREPROCESSING", desc: "Sensor corrections and conditioning ahead of processing." },
      { code: "IMAGE ENHANCEMENT", desc: "Preparing imagery for the step that follows it." },
      { code: "FEATURE EXTRACTION", desc: "Isolating the content a mission product depends on." },
      { code: "CLASSIFICATION", desc: "Mission-specific classification, developed per payload." },
      { code: "DATA REDUCTION", desc: "Carrying information rather than every pixel of it." },
      { code: "PRODUCT GENERATION", desc: "Assembling the result the mission downlinks." },
    ] as Entry[],
  },

  edge: {
    mark: { ident: "EDGE_PROCESSING", cmd: "data → information" },
    heading: ["Downlink information.", "Not just pixels."],
    lead:
      "The same mission, with the processing on either side of the link. Where the work happens changes what the pass has to carry.",
    traditional: {
      title: "TRADITIONAL",
      caption: "The link carries every frame, and the product is built after it lands.",
      steps: ["SENSOR", "RAW IMAGE", "DOWNLINK", "GROUND PROCESSING", "PRODUCT"],
    },
    onboard: {
      title: "ONBOARD PROCESSING",
      caption: "The product is built where the data is collected, and the link carries the result.",
      steps: ["SENSOR", "PROCESS", "PRODUCT", "SELECTIVE DOWNLINK"],
    },
    note:
      "How much a given mission gains depends on its payload, its processing and its contact schedule. Orbtrix scopes that against the mission rather than quoting a figure.",
  },

  missionSpecific: {
    mark: { ident: "MISSION_SPECIFIC", cmd: "processor.configure()" },
    heading: "Processing designed around the payload.",
    lead:
      "There is no general-purpose onboard processor. The algorithm follows the sensor, the mission product and the compute the spacecraft actually carries.",
    steps: ["MISSION REQUIREMENTS", "ALGORITHM", "ONBOARD IMPLEMENTATION", "VALIDATION", "INTEGRATION"],
  },

  service: {
    mark: { ident: "ENGINEERING", cmd: "algorithm → flight" },
    heading: "An engineering programme, not a licence.",
    lead:
      "Orbtrix can take a processing problem from mission analysis through to integration with the payload, or join at the stage where the work currently stops.",
    items: [
      { code: "MISSION ANALYSIS", desc: "What the product is, and what the link can carry." },
      { code: "ALGORITHM DEVELOPMENT", desc: "The processing the mission product requires." },
      { code: "PROTOTYPE PROCESSING", desc: "Demonstrating the approach against representative data." },
      { code: "ONBOARD IMPLEMENTATION", desc: "Building it for the compute the spacecraft carries." },
      { code: "PAYLOAD INTEGRATION", desc: "Working with the payload and the platform it sits on." },
      { code: "VALIDATION", desc: "Showing the pipeline does what the mission needs it to." },
      { code: "DEPLOYMENT SUPPORT", desc: "Supporting the pipeline through to operations." },
    ] as Entry[],
  },

  applications: {
    mark: { ident: "APPLICATIONS", cmd: "detect()" },
    heading: "Potential mission applications.",
    lead:
      "Directions an onboard pipeline can be developed toward. Each is scoped against a specific payload and mission product rather than offered as a ready capability.",
    items: [
      "EARTH OBSERVATION",
      "FEATURE EXTRACTION",
      "CHANGE DETECTION",
      "OBJECT DETECTION",
      "IMAGE CLASSIFICATION",
      "DATA REDUCTION",
      "EVENT-DRIVEN IMAGING",
    ],
  },

  audience: [
    "Earth-observation companies",
    "Optical payload developers",
    "Satellite manufacturers",
    "Mission operators",
    "Space startups",
    "Payload teams",
  ],

  disha: {
    mark: { ident: "DISHA", cmd: "process()" },
    heading: ["Onboard intelligence is part of", "the autonomous mission stack."],
    body:
      "Processing at the sensor is where mission autonomy starts: a spacecraft that decides what is worth sending is already making an operational decision. That complements DISHA, Orbtrix's unified mission operations platform, without depending on it — onboard optical processing is delivered as a standalone engineering capability today.",
  },

  closing: {
    mark: { ident: "ONBOARD_OPTICAL", cmd: "image.process()" },
    heading: "Make every downlink count.",
    lead: "Tell us about the payload and the product it has to produce, and we will scope the pipeline.",
    cta: "Discuss your payload with Orbtrix",
  },
};

/* --------------------------------------------------------------------------
   The family, as the cross-link strip and the DISHA band render it.
   -------------------------------------------------------------------------- */
export const FAMILY_NOTE =
  "Orbtrix delivers these as focused capabilities today, and builds them toward DISHA — one unified, autonomous mission operations platform.";
