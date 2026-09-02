/* ==========================================================================
   The people building Orbtrix.

   ONE flat list, deliberately. Splitting the page into "leadership", "founding
   engineers" and "advisory board" ranked the advisors below the engineers and
   made a nine-person company look like three smaller ones. The distinction now
   comes from the role each person holds, and the order they appear in — not
   from separate sections with separate headings.

   Order is: founders, engineers and scientist, then advisors. It carries the
   shape of the company without labelling it.

   ---- RULES ON WHAT MAY BE WRITTEN HERE ---------------------------------
   Nothing in a biography may go beyond what was supplied. No degrees, no
   universities, no departments, no academic titles, no company job titles that
   were not given, no named missions, no publications, no awards. Where a
   detail is genuinely unknown — Akhila's credentials, the Mars mission's name,
   Aaron's role at Accenture — the copy is written around it rather than
   filled in. If you are adding to a bio here, the test is: was this fact
   handed to us, or did it sound plausible?
   ========================================================================== */

/** Secondary role grouping. Rendered as a small label, never as a section. */
export type PersonLabel = "FOUNDER" | "ENGINEERING" | "SCIENCE" | "ADVISOR" | "STRATEGY";

export interface Person {
  name: string;
  /** The role, as it appears under the name on the card. */
  role: string;
  label: PersonLabel;
  /** 2–4 sentences. Professional profile, not a social-media bio. */
  bio: string;
  /** 2–4 tags, and only ones the supplied background actually supports. */
  expertise: string[];
  photo?: string;
  linkedin?: string;
}

/* --------------------------------------------------------------------------
   Name spellings were confirmed rather than inferred. "Salinimol T A" and
   "Aaron Stephen" are what the people themselves use; where a LinkedIn slug
   disagrees, the slug is the odd one out and is left as-is because it is a URL
   we do not control.

   Still open: LinkedIn URLs for the four advisors.
   -------------------------------------------------------------------------- */

export const PEOPLE: Person[] = [
  {
    name: "Aswin Sunil",
    role: "Founder & CEO",
    label: "FOUNDER",
    bio: "Aswin is a mission planning engineer with experience working on spacecraft mission planning and operations. Prior to Orbtrix, he worked with Dignatara and Aadyah, building experience across mission planning and operational workflows. At Orbtrix, he focuses on building autonomous mission operations systems and the broader architecture connecting ground and onboard intelligence.",
    expertise: ["Mission Planning", "Mission Operations", "Autonomy"],
    photo: "/team/aswin.jpg",
    linkedin: "https://www.linkedin.com/in/aswin-sunil-1681341a1/",
  },
  {
    name: "Aaron Stephen",
    role: "Co-founder & COO",
    label: "FOUNDER",
    bio: "Aaron is an aerospace engineer with experience spanning engineering and technology-driven problem solving. Before Orbtrix, he worked at Accenture, bringing experience from a broader technology and engineering environment into the space sector. At Orbtrix, he focuses on building the company and translating technical capabilities into deployable solutions for space missions.",
    /* No third tag: nothing beyond aerospace engineering and operations is
       established, and his Accenture role was not supplied. */
    expertise: ["Aerospace Engineering", "Operations"],
    photo: "/team/aaron.jpg",
    linkedin: "https://www.linkedin.com/in/aaron-steephen-934297201/",
  },
  {
    name: "Salinimol T A",
    role: "Mission Planning Engineer",
    label: "ENGINEERING",
    bio: "Salinimol is a flight and astrodynamics engineer with experience in spacecraft flight-dynamics and mission engineering. Previously at Dignatara, she developed experience in areas related to orbital analysis and spacecraft mission operations. At Orbtrix, she contributes to flight-dynamics capabilities and the development of autonomous mission systems.",
    expertise: ["Flight Dynamics", "Astrodynamics", "Mission Engineering"],
    photo: "/team/salinimol.jpg",
    linkedin: "https://www.linkedin.com/in/salinimol-t-a-1a9990290/",
  },
  {
    name: "Jilsha K S",
    role: "Systems Engineer",
    label: "ENGINEERING",
    bio: "Jilsha is a systems engineer with experience in developing mechanical and thermal systems for aerospace technologies. Her work spans engineering disciplines that connect spacecraft subsystems with the broader system architecture. At Orbtrix, she contributes systems-engineering expertise to the development of mission and spacecraft technologies.",
    expertise: ["Systems Engineering", "Mechanical Systems", "Thermal Systems"],
    photo: "/team/jilsha.jpg",
    linkedin: "https://www.linkedin.com/in/jilsha-saji-79809b291/",
  },
  {
    name: "Akhila A",
    role: "AI/ML Scientist",
    label: "SCIENCE",
    /* Written deliberately around the missing detail. No degree, institution,
       publication or named technique appears here, because none was supplied. */
    bio: "Akhila A is an AI/ML scientist working at the intersection of intelligent systems, machine learning and autonomous decision-making. Her research interests focus on developing intelligent models capable of extracting information from complex data and supporting decision-making in dynamic environments. At Orbtrix, she contributes to the intelligence and autonomy layer of the company's mission systems.",
    expertise: ["AI/ML", "Intelligent Systems", "Autonomy"],
    photo: "/team/akhila.jpg",
  },
  {
    name: "Arulmozhi S",
    role: "Chief Technical Advisor",
    label: "ADVISOR",
    bio: "Arulmozhi S is a senior aerospace and avionics expert with four decades of experience in onboard avionics and space systems. He has held significant technical and program responsibilities within the Indian space programme, including serving as Program Director for the Gaganyaan mission. At Orbtrix, he provides technical guidance on spacecraft systems, avionics and mission architecture.",
    expertise: ["Onboard Avionics", "Spacecraft Systems", "Programme Leadership"],
    photo: "/team/arulmozhi.jpg",
  },
  {
    name: "B P Dakshayani",
    role: "Chief Scientific Advisor",
    label: "ADVISOR",
    /* "a Mars mission", not the mission's name — the name was not supplied and
       is not established anywhere else in this project. */
    bio: "B P Dakshayani is an experienced space scientist and former ISRO professional with around 35 years of experience in space missions. She has served as Deputy Project Manager for a Mars mission and brings extensive experience in mission planning and program execution. At Orbtrix, she provides scientific and mission-level guidance as the company develops autonomous mission systems.",
    expertise: ["Mission Planning", "Programme Execution", "Space Missions"],
    photo: "/team/dakshayani.jpg",
  },
  {
    name: "Pushpak Jagtap",
    role: "Principal Faculty Advisor",
    label: "ADVISOR",
    bio: "Pushpak Jagtap is a faculty advisor with expertise in artificial intelligence and cyber-physical systems. His work brings together intelligent computation, autonomous systems and the interaction between software and physical systems. At Orbtrix, he provides academic and technical guidance on the development of intelligent and autonomous space systems.",
    expertise: ["Artificial Intelligence", "Cyber-Physical Systems", "Autonomous Systems"],
    photo: "/team/pushpak.jpg",
  },
  {
    name: "Rahul Dandamudi",
    role: "Strategic Advisor",
    label: "STRATEGY",
    bio: "Rahul Dandamudi advises Orbtrix on business strategy, growth and organizational direction. He works at Meta in the United States, and brings that outside perspective to the company's commercial development and long-term positioning. As a strategic advisor to the board, his focus is on helping Orbtrix translate deep technology into a sustainable space business.",
    expertise: ["Business Strategy", "Growth", "Board Advisory"],
    photo: "/team/rahul.jpg",
  },
];

/* ==========================================================================
   Page copy
   ========================================================================== */

export const PEOPLE_INTRO = {
  mark: { ident: "PEOPLE", cmd: "team = orbtrix()" },
  heading: "The people building Orbtrix.",
  lead: "A multidisciplinary team bringing together spacecraft operations, astrodynamics, systems engineering, AI/ML and decades of aerospace experience.",
};

export const PEOPLE_CLOSING = {
  mark: { ident: "ORBTRIX", cmd: "build()" },
  heading: ["Built by engineers.", "Guided by experience."],
  lead: "Orbtrix brings together space engineering, mission operations, intelligent systems and decades of aerospace experience to build the infrastructure for autonomous missions.",
  primary: { label: "Explore DISHA", href: "/disha" },
  secondary: { label: "Talk to us", href: "/contact" },
};
