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
}

/** External careers page (Notion). Linked from the footer's Company column. */
export const CAREERS_URL =
  "https://www.notion.so/Careers-at-Orbtrix-Space-3135b581cdb7809ea3ccc510b9325b9b";

/** Home is intentionally absent — the ORBTRIX logo is the home link. */
export const NAV_ITEMS: NavLink[] = [
  { label: "Products", href: "/products" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Onboard solutions", href: "/solutions#onboard" },
      { label: "Data processing", href: "/solutions#data-processing" },
      { label: "Ground solutions", href: "/solutions#ground" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Company", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "News", href: "/news" },
    ],
  },
];

/** Rendered as the accent-purple pill on the right of the nav. */
export const NAV_CTA: NavLink = { label: "Contact", href: "/contact" };

/* -------------------------------------------------------------------------- */

export const CONTACT = {
  email: "info@orbtrix.space",
  addressLines: [
    "Cabin 4B, Evolve Coworking Space",
    "Doddanakundi, Bengaluru 560048",
  ],
  city: "Bengaluru, India",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Orbtrix%20Space%20Private%20Limited%2C%20Doddanakundi%20Industrial%20Area%2C%20Brookefield%2C%20Bengaluru&output=embed",
};

/** `icon` keys map to react-icons in the footer. */
export interface Social {
  label: string;
  href: string;
  icon: "linkedin" | "instagram" | "x";
}

export const SOCIALS: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/orbtrix/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/orbtrix_space/", icon: "instagram" },
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

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { label: "Platform overview", href: "/products" },
      { label: "Capabilities", href: "/products#capabilities" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Onboard solutions", href: "/solutions#onboard" },
      { label: "Data processing", href: "/solutions#data-processing" },
      { label: "Ground solutions", href: "/solutions#ground" },
      { label: "Rigel OS", href: "/solutions#rigel-os" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "News", href: "/news" },
      { label: "Careers", href: CAREERS_URL, external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      // Preserved from the old site: the early-adopter programme form.
      { label: "Early adopter programme", href: "https://forms.office.com/r/btRMdhuk4E", external: true },
      { label: "Contact", href: "/contact" },
      // Room to grow: Docs, Blog, Login slot in here.
    ],
  },
  {
    title: "Contact",
    links: [
      { label: CONTACT.email, href: `mailto:${CONTACT.email}`, external: true },
      { label: "Bengaluru, India", href: "/contact" },
    ],
  },
];

export const LEGAL_NAME = "Orbtrix Space Pvt Ltd";
