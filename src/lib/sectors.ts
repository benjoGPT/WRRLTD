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
import type { PhotoKey } from "./photos";

/**
 * The 12 sectors. This one list feeds the sectors page, each sector's own page
 * (/sectors/<slug>), the form dropdowns and the footer links.
 *
 * TODO: ask the client to check the intro and example roles for each sector.
 */

// Groups for the filter buttons on the sectors page
export const sectorGroups = ["Industrial & logistics", "Construction & trades", "Office & hospitality"] as const;
export type SectorGroup = (typeof sectorGroups)[number];

export type Sector = {
  name: string;
  slug: string;
  group: SectorGroup;
  icon: LucideIcon;
  photo: PhotoKey;
  /** One line for lists */
  blurb: string;
  /** A short paragraph for the sector's own page */
  intro: string;
  /** Example roles we recruit for */
  roles: string[];
};

export const sectors: Sector[] = [
  {
    name: "Construction & Building",
    slug: "construction-building",
    group: "Construction & trades",
    icon: HardHat,
    photo: "construction",
    blurb: "Site operatives, supervisors and trades for building projects.",
    intro:
      "From groundworks to fit-out, we find people for building sites of every size. Contractors get reliable site staff, often at short notice, and workers get steady work that suits their tickets and experience.",
    roles: ["Site operatives", "Groundworkers", "Site supervisors", "Plant operators", "Labourers", "Site managers"],
  },
  {
    name: "Engineering",
    slug: "engineering",
    group: "Construction & trades",
    icon: Cog,
    photo: "factory",
    blurb: "Mechanical, electrical and production engineering roles.",
    intro:
      "We recruit engineers for production, maintenance and project work. We check qualifications and experience before introducing anyone, so you only meet people who can do the job.",
    roles: ["Mechanical engineers", "Electrical engineers", "Production engineers", "Multi-skilled engineers", "CAD technicians"],
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    group: "Industrial & logistics",
    icon: Factory,
    photo: "factory",
    blurb: "Production, assembly and quality roles on the factory floor.",
    intro:
      "Production lines need dependable people on every shift. We supply permanent staff and temporary cover for busy periods, from line operatives to team leaders.",
    roles: ["Production operatives", "Machine operators", "Assemblers", "Quality inspectors", "Team leaders"],
  },
  {
    name: "Skilled Trades",
    slug: "skilled-trades",
    group: "Construction & trades",
    icon: Hammer,
    photo: "tradesman",
    blurb: "Joiners, electricians, plumbers, bricklayers and more.",
    intro:
      "Qualified tradespeople are in demand everywhere. We match experienced trades with contractors and businesses that need them, for single jobs, longer contracts or permanent roles.",
    roles: ["Joiners", "Electricians", "Plumbers", "Bricklayers", "Plasterers", "Painters and decorators"],
  },
  {
    name: "Transport & Logistics",
    slug: "transport-logistics",
    group: "Industrial & logistics",
    icon: Route,
    photo: "port",
    blurb: "Planning, transport office and supply chain roles.",
    intro:
      "Behind every delivery is a team planning routes, managing stock and keeping customers updated. We recruit for the office side of logistics as well as the operational roles.",
    roles: ["Transport planners", "Transport administrators", "Supply chain coordinators", "Shift managers", "Customer service staff"],
  },
  {
    name: "Driving & HGV",
    slug: "driving-hgv",
    group: "Industrial & logistics",
    icon: Truck,
    photo: "trucks",
    blurb: "HGV, van and multi-drop drivers.",
    intro:
      "We place licensed drivers in permanent jobs and temporary assignments. We check every licence and any CPC or tachograph card before a driver starts.",
    roles: ["Class 1 HGV drivers", "Class 2 HGV drivers", "7.5 tonne drivers", "Van drivers", "Multi-drop drivers"],
  },
  {
    name: "Administration & Office",
    slug: "administration-office",
    group: "Office & hospitality",
    icon: ClipboardList,
    photo: "reception",
    blurb: "Administrators, receptionists and office support.",
    intro:
      "Good office staff keep a business running. We recruit administrators and support staff for permanent roles and short-term cover during holidays or busy spells.",
    roles: ["Administrators", "Receptionists", "Office managers", "Data entry clerks", "Customer service advisors"],
  },
  {
    name: "Hospitality & Catering",
    slug: "hospitality-catering",
    group: "Office & hospitality",
    icon: ChefHat,
    photo: "kitchen",
    blurb: "Chefs, kitchen staff, front of house and events teams.",
    intro:
      "Hotels, restaurants and event venues need staff who can step straight in. We recruit for kitchens and front of house, for the season or for good.",
    roles: ["Chefs", "Kitchen porters", "Waiting staff", "Bar staff", "Housekeeping", "Event staff"],
  },
  {
    name: "Commercial & Professional",
    slug: "commercial-professional",
    group: "Office & hospitality",
    icon: Briefcase,
    photo: "officeTeam",
    blurb: "Sales, account management and professional services roles.",
    intro:
      "We recruit for client-facing and professional roles where experience and the right attitude both matter. We take the time to understand your team before we introduce anyone.",
    roles: ["Sales executives", "Account managers", "Business development managers", "Buyers", "Office-based professionals"],
  },
  {
    name: "Technical & Maintenance",
    slug: "technical-maintenance",
    group: "Construction & trades",
    icon: Wrench,
    photo: "tradesman",
    blurb: "Maintenance engineers, technicians and facilities staff.",
    intro:
      "When something breaks, you need someone who can fix it. We recruit maintenance and technical staff for factories, sites and facilities teams.",
    roles: ["Maintenance engineers", "Maintenance technicians", "Facilities staff", "Multi-trade operatives", "Electrical technicians"],
  },
  {
    name: "Industrial & General Labour",
    slug: "industrial-general-labour",
    group: "Industrial & logistics",
    icon: Shovel,
    photo: "siteWorker",
    blurb: "General operatives and labourers for industrial sites.",
    intro:
      "Plenty of industrial work needs willing people more than specialist tickets. We supply general operatives for permanent jobs and temporary assignments, briefed and checked before they start.",
    roles: ["General operatives", "Labourers", "Cleaning operatives", "Yard operatives", "Recycling operatives"],
  },
  {
    name: "Warehouse & Distribution",
    slug: "warehouse-distribution",
    group: "Industrial & logistics",
    icon: Warehouse,
    photo: "warehouse",
    blurb: "Pickers, packers, forklift drivers and warehouse supervisors.",
    intro:
      "Warehouses run on accuracy and pace. We recruit warehouse staff for steady permanent roles and for peak periods, including licensed forklift drivers.",
    roles: ["Pickers and packers", "Forklift drivers", "Warehouse operatives", "Goods in and out staff", "Warehouse supervisors"],
  },
];

export const sectorNames = sectors.map((s) => s.name);
export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
