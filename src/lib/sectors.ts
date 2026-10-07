import {
  Briefcase,
  ChefHat,
  ClipboardList,
  Cog,
  Factory,
  Hammer,
  HardHat,
  Route,
  Shovel,
  Truck,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * The 12 sectors. This one list feeds the sector cards, the sector dropdowns
 * in both forms and the sector links in the footer, so a change here shows up
 * everywhere.
 *
 * TODO: ask the client to check the example roles in each line.
 */

export type Sector = {
  name: string;
  slug: string;
  icon: LucideIcon;
  blurb: string;
};

export const sectors: Sector[] = [
  {
    name: "Construction & Building",
    slug: "construction-building",
    icon: HardHat,
    blurb: "Site operatives, supervisors and trades for building projects.",
  },
  {
    name: "Engineering",
    slug: "engineering",
    icon: Cog,
    blurb: "Mechanical, electrical and production engineering roles.",
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    icon: Factory,
    blurb: "Production, assembly and quality roles on the factory floor.",
  },
  {
    name: "Skilled Trades",
    slug: "skilled-trades",
    icon: Hammer,
    blurb: "Joiners, electricians, plumbers, bricklayers and more.",
  },
  {
    name: "Transport & Logistics",
    slug: "transport-logistics",
    icon: Route,
    blurb: "Planning, transport office and supply chain roles.",
  },
  {
    name: "Driving & HGV",
    slug: "driving-hgv",
    icon: Truck,
    blurb: "HGV, van and multi-drop drivers.",
  },
  {
    name: "Administration & Office",
    slug: "administration-office",
    icon: ClipboardList,
    blurb: "Administrators, receptionists and office support.",
  },
  {
    name: "Hospitality & Catering",
    slug: "hospitality-catering",
    icon: ChefHat,
    blurb: "Chefs, kitchen staff, front of house and events teams.",
  },
  {
    name: "Commercial & Professional",
    slug: "commercial-professional",
    icon: Briefcase,
    blurb: "Sales, account management and professional services roles.",
  },
  {
    name: "Technical & Maintenance",
    slug: "technical-maintenance",
    icon: Wrench,
    blurb: "Maintenance engineers, technicians and facilities staff.",
  },
  {
    name: "Industrial & General Labour",
    slug: "industrial-general-labour",
    icon: Shovel,
    blurb: "General operatives and labourers for industrial sites.",
  },
  {
    name: "Warehouse & Distribution",
    slug: "warehouse-distribution",
    icon: Warehouse,
    blurb: "Pickers, packers, forklift drivers and warehouse supervisors.",
  },
];

export const sectorNames = sectors.map((s) => s.name);
