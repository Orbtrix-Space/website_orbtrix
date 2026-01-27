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
      "Digital Infrastructure for Spacecraft Handling & Analytics (DISHA) is Orbtrix’s mission operations platform, designed to support scalable, automated spacecraft operations with minimal human-in-the-loop dependency.",
    status: "In Development",
    features: [
      "Automated mission operations workflows",
      "Centralized telemetry interpretation and health monitoring",
      "Designed for multi-satellite and hosted payload missions",
      "Foundation layer for Mission-as-a-Service deployments",
    ],
    icon: Globe,
  },
  {
    id: "autonomy",
    name: "Onboard Autonomy Software",
    description:
      "A modular onboard software stack enabling spacecraft to execute routine mission planning, system management, and operational decision-making directly onboard.",
    status: "In Development",
    features: [
      "Onboard execution of mission plans",
      "Autonomous handling of routine operational scenarios",
      "Reduced dependence on continuous ground commanding",
      "Designed for integration with Orbtrix satellite bus",
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
}

export const TEAM: TeamMember[] = [
  {
    name: "Aswin Sunil",
    role: "CEO & Chief Engineer",
    photo: "/team/aswin.jpg",
  },
  {
    name: "Aaron Steephen",
    role: "Chief Operations Officer",
    photo: "/team/aaron.jpg",
  },
  {
    name: "Jilsha Saji",
    role: "Space Systems Engineer",
    photo: "/team/jilsha.jpg",
  },
  {
    name: "Salinimol T A",
    role: "Mission Planning Engineer",
    photo: "/team/salinimol.jpg",
  },
];
