import { LucideIcon, Cpu, Globe } from "lucide-react";

/* =========================
   Navigation
========================= */

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Mission", href: "/mission" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* =========================
   Products
========================= */

export interface Product {
  id: string;
  name: string;
  description: string;
  status: "In Development" | "Validated";
  features: string[];
  icon?: LucideIcon;
}

export const PRODUCTS: Product[] = [
  {
    id: "disha",
    name: "DISHA",
    description:
      "Digital Infrastructure for Spacecraft Handling and Analytics (DISHA) is an automated ground operations software system designed to streamline spacecraft monitoring, command execution, and anomaly handling with minimal human intervention.",
    status: "In Development",
    features: [
      "Automated command sequencing and execution workflows",
      "Telemetry ingestion, interpretation, and health state assessment",
      "Operator decision support and anomaly triage",
      "Interoperable with existing flight dynamics and ground systems",
    ],
    icon: Globe,
  },
  {
    id: "rigel-os",
    name: "Rigel OS",
    description:
      "Rigel OS is an autonomous onboard operating suite that enables spacecraft to execute guidance, navigation, control, and mission logic directly onboard, supporting low-latency decision making and resilient in-orbit operations.",
    status: "In Development",
    features: [
      "Onboard execution of mission and maneuver plans",
      "Autonomous handling of nominal and off-nominal scenarios",
      "Integrated spacecraft state awareness and system management",
      "Designed for deterministic, flight-qualified onboard execution",
    ],
    icon: Cpu,
  },
];

/* =========================
   Team
========================= */

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  linkedin?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Aswin Sunil",
    role: "CEO & Chief Engineer",
    photo: "/team/aswin.jpg",
    linkedin: "https://www.linkedin.com/in/aswin-sunil-1681341a1/"
  },
  {
    name: "Aaron Steephen",
    role: "Chief Operations Officer",
    photo: "/team/aaron.jpg",
    linkedin: "https://www.linkedin.com/in/aaron-steephen-934297201/"
  },
  {
    name: "Jilsha Saji",
    role: "Space Systems Engineer",
    photo: "/team/jilsha.jpg",
    linkedin: "https://www.linkedin.com/in/jilsha-saji-79809b291/"
  },
  {
    name: "Salinimol T A",
    role: "Mission Planning Engineer",
    photo: "/team/salinimol.jpg",
    linkedin: "https://www.linkedin.com/in/salinimol-t-a-1a9990290/"
  },
];
