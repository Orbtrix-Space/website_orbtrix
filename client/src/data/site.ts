/* ==========================================================================
   Site chrome: navigation, footer, contact, socials.
   Add a link here, it appears in the UI. The nav and footer are built to grow
   (Docs, Careers, Blog, Login) — just append.
   ========================================================================== */

export interface NavLink {
  label: string;
  href: string;
  /** Absolute URL → rendered as an external anchor with rel="noopener". */
  external?: boolean;
  /** Present → the item renders as a dropdown in the desktop nav. */
  children?: NavLink[];
  /**
   * Second line under a dropdown row. Only the DISHA module rows carry one:
   * "DISHA_C3" alone does not tell a first-time visitor what C3 is, and the
   * four module names are the one place in the nav where that matters.
   */
  hint?: string;
  /**
   * The `$ function()` line for a dropdown row. Rendered small and mono, and
   * only where the row names a system the site elsewhere labels the same way —
   * it is the nav end of the site-wide `# IDENT / $ command()` notation, not
   * decoration. Company rows deliberately have none: "About" is not a system.
   */
  cmd?: string;
}

/** External careers page (Zoho Recruit). Linked from the footer's Company column. */
export const CAREERS_URL = "https://orbtrix.zohorecruit.in/jobs/Careers";

/**
 * Home is intentionally absent — the ORBTRIX wordmark is the home link, which
 * is why "Orbtrix" does not also appear as a text item beside it.
 *
 * FOUR items, and DISHA is the product entry point. "Modules" used to sit
 * beside it as a fifth, which split one product across two top-level slots and
 * invited the reading that the modules are separate things. They are not: they
 * are four layers of one platform, so they live inside DISHA's own dropdown,
 * under the platform overview that opens it.
 *
 * Deliberately shallow everywhere else: Nexus, Netra and Rigel OS sit under
 * Solutions rather than in the bar — putting every product in the top nav is
 * what makes a site read as a SaaS dashboard.
 */
export const NAV_ITEMS: NavLink[] = [
  {
    label: "DISHA",
    href: "/disha",
    /* The first row is the platform itself, then its four layers. Reading the
       panel top to bottom is meant to say "one product, four modules" before a
       single word is processed. */
    children: [
      { label: "DISHA", href: "/disha", hint: "Platform overview", cmd: "platform()" },
      { label: "DISHA_C3", href: "/disha#c3", hint: "Command & Control", cmd: "command_control()" },
      { label: "DISHA_Flight", href: "/disha#flight", hint: "Flight Dynamics", cmd: "flight_dynamics()" },
      { label: "DISHA_Monitor", href: "/disha#monitor", hint: "Mission Monitoring", cmd: "mission_monitor()" },
      { label: "DISHA_Task", href: "/disha#task", hint: "Tasking & Orchestration", cmd: "mission_tasking()" },
    ],
  },
  {
    /* Three capabilities Orbtrix can deliver today, each on its own page.
       Rigel OS is deliberately not in this dropdown: it is in research and
       development rather than a deliverable capability, and the bar is for
       what a visitor can actually buy. It keeps its place on /solutions and in
       the footer. */
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "NETRA", href: "/solutions/netra", hint: "Telemetry Intelligence", cmd: "telemetry_intelligence()" },
      {
        label: "NEXUS",
        href: "/solutions/nexus",
        hint: "Mission Tasking & Ground Operations",
        cmd: "mission_tasking()",
      },
      {
        label: "Onboard Optical Processing",
        href: "/solutions/onboard-optical",
        hint: "Payload Data Processing",
        cmd: "image_process()",
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About", href: "/about", hint: "Who we are" },
      { label: "People", href: "/team", hint: "The team" },
      { label: "News", href: "/news", hint: "Updates" },
    ],
  },
];

/* --------------------------------------------------------------------------
   Ecosystem.

   The logo wall reads every file in client/public/Logos_Partners/ and shows it
   under one neutral heading. That neutrality is deliberate: a logo on a page
   says nothing about WHAT the relationship is, and inventing a specific one
   ("backed by", "in partnership with") for a mark we were simply given would
   be a claim nobody at Orbtrix made.

   Exactly one relationship is named, and only because it is already stated in
   the company facts on /about: Orbtrix is incubated at IISc. The value below
   is matched against the organisation name the build derives from the
   filename. If no logo matches — the file is renamed, removed, replaced — the
   section falls back to the neutral wall rather than showing an empty plate.

   DO NOT add entries here to label other logos unless the relationship has
   been confirmed by someone at Orbtrix.
   -------------------------------------------------------------------------- */
export const INCUBATOR = "IISc";

/** Rendered as the accent-purple pill on the right of the nav. */
export const NAV_CTA: NavLink = { label: "Contact", href: "/contact" };

/* -------------------------------------------------------------------------- */

/**
 * Where Orbtrix actually works today.
 *
 * TWO ADDRESSES EXIST IN THIS FILE and they are not interchangeable:
 *
 *   CURRENT_LOCATION   — the IISc Innovation Centre. Where the team is.
 *   REGISTERED_OFFICE  — HSR Layout. Where the company legally is.
 *
 * There used to be a third — CONTACT.addressLines held a Doddanakundi
 * coworking address, and the footer and the contact page therefore named
 * different offices. CONTACT.addressLines now reads from this constant, so
 * there is one working address on the site and it is defined here.
 *
 * Line breaks are reproduced as supplied. Do not reflow them into a single
 * string: a campus address that wraps on arbitrary commas becomes unreadable.
 */
export const CURRENT_LOCATION = [
  "Indian Institute of Science,",
  "Innovation Centre, Campus,",
  "near Maramma Circle,",
  "near J.N. Tata Auditorium,",
  "Malleshwaram,",
  "Bengaluru, Karnataka 560012,",
  "India",
];

export const CONTACT = {
  email: "info@orbtrix.space",
  /* The working address, from the one constant that defines it. The contact
     page used to carry its own copy (a Doddanakundi coworking space) which
     disagreed with the footer; there is now one address and one definition. */
  addressLines: CURRENT_LOCATION,
  city: "Bengaluru, India",
  /* The pin is FSID — the incubator named in the footer — at the IISc
     Innovation Centre. Built as a maps query from the organisation name plus
     the campus, rather than from a share link: a shortened link is opaque, can
     expire, and cannot be read by anyone reviewing this file. */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Foundation%20for%20Science%20Innovation%20and%20Development%20FSID%2C%20Innovation%20Centre%2C%20Indian%20Institute%20of%20Science%2C%20Malleshwaram%2C%20Bengaluru%20560012&output=embed",
};


/**
 * The registered office, as filed. Reproduced verbatim and NOT reworded —
 * "Bengaluru, India" is where the company works, this is where the company
 * legally is, and a footer that shows only the former is missing the one piece
 * of information a registered address exists to provide.
 *
 * CURRENT_LOCATION above is a different thing — the IISc Innovation Centre,
 * where the team actually works, shown on the contact page and in the footer.
 * Do not merge the two: one is where the company is, the other is where it
 * is registered, and a visitor needs both to mean what they say.
 */
export const REGISTERED_OFFICE = [
  "No: 1190/1, Fourth Floor,",
  "Sector 3, HSR Layout,",
  "Bengaluru, Karnataka 560102,",
  "India",
];

/**
 * Where Orbtrix is incubated, in full.
 *
 * The footer showed "FSID" alone. The acronym is what people say, but it is
 * not what the organisation is called, and a footer is the one place on a site
 * that is expected to name things properly — it is where someone goes to check
 * that a company is real.
 *
 * "(Formerly SID)" is part of the supplied name and stays. It also quietly
 * answers the question the acronym raises for anyone who knew the old name.
 *
 * Text, not a logo: there is no FSID or IISc mark in client/public that we are
 * cleared to use here, and one will not be invented. If an official asset
 * arrives, drop it in and swap the text for it — do not draw one.
 *
 * This is also the whole claim. Incubation, and nothing further: no cohort, no
 * year, no programme name, none of which was given.
 */
export const INCUBATED_AT =
  "Foundation for Science Innovation and Development (Formerly SID), Indian Institute of Science";

/** `icon` keys map to react-icons in the footer. */
export interface Social {
  label: string;
  href: string;
  icon: "linkedin" | "instagram" | "x";
}

export const SOCIALS: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/orbtrix/", icon: "linkedin" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/orbtrix_space?igsi=MXIyZDN6aGEyYTJkMg==",
    icon: "instagram",
  },
  // TODO (Aswin): this pointed at the bare x.com root on the old site. Replace
  // with the real handle, or delete the row.
  { label: "X (Twitter)", href: "https://x.com/", icon: "x" },
];

/** Utilitarian bottom-bar links. */
export const LEGAL_LINKS: NavLink[] = [
  { label: "Legal notices", href: "/legal" },
  { label: "Privacy policy", href: "/privacy" },
];

/* -------------------------------------------------------------------------- */

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

/**
 * Five columns, in the order they are read: the product, the capabilities, the
 * company, the ways in, and how to reach us.
 *
 * TWO REQUESTED LINKS ARE ABSENT, and deliberately:
 *   - "Documentation" — there is no docs page. A footer link to a route that
 *     404s is worse than no link.
 *   - "Terms of Service" — same; only /legal and /privacy exist.
 * Add either the moment the page does.
 *
 * "News" appears once, under Company, rather than in both Company and
 * Resources. Two identical links in adjacent columns read as a mistake rather
 * than as a convenience.
 */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "DISHA",
    links: [
      { label: "Platform overview", href: "/disha" },
      { label: "DISHA_C3", href: "/disha#c3" },
      { label: "DISHA_Flight", href: "/disha#flight" },
      { label: "DISHA_Monitor", href: "/disha#monitor" },
      { label: "DISHA_Task", href: "/disha#task" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "NETRA", href: "/solutions/netra" },
      { label: "NEXUS", href: "/solutions/nexus" },
      { label: "Onboard Optical Processing", href: "/solutions/onboard-optical" },
      { label: "All solutions", href: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "People", href: "/team" },
      { label: "News", href: "/news" },
      { label: "Careers", href: CAREERS_URL, external: true },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      // Preserved from the old site: the early-adopter programme form.
      { label: "Early adopter programme", href: "https://forms.office.com/r/btRMdhuk4E", external: true },
      { label: "Contact", href: "/contact" },
      // Documentation slots in here when it exists.
    ],
  },
];

export const LEGAL_NAME = "Orbtrix Space Pvt Ltd";
