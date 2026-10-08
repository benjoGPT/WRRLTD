import { site } from "@/config/site";

/**
 * Vacancies for the jobs board (/jobs).
 *
 * To add a job: copy one of the entries below, give it a unique slug (used in
 * the web address) and fill in the details. Remove it when the job is filled.
 * Dates are YYYY-MM-DD. Leave `example` off for real jobs.
 *
 * Real jobs also appear in Google's job search, because each job page includes
 * Google's JobPosting data.
 */

export type JobType = "Permanent" | "Temporary" | "Temp to perm";

export type Job = {
  slug: string;
  title: string;
  /** Sector slug from src/lib/sectors.ts */
  sector: string;
  type: JobType;
  location: string;
  /** How the pay reads on screen, e.g. "£13.50 an hour" */
  pay: string;
  /** For Google: numbers and unit */
  payMin?: number;
  payMax?: number;
  payUnit?: "HOUR" | "YEAR";
  hours: string;
  posted: string;
  closes?: string;
  summary: string;
  duties: string[];
  requirements: string[];
  /** Marks a made-up job used to preview the design */
  example?: boolean;
};

const allJobs: Job[] = [
  {
    slug: "example-class-1-hgv-driver",
    title: "Class 1 HGV Driver (nights)",
    sector: "driving-hgv",
    type: "Temporary",
    location: "Preston, Lancashire",
    pay: "£16.50 an hour",
    payMin: 16.5,
    payUnit: "HOUR",
    hours: "4 nights a week, 10pm to 8am",
    posted: "2026-10-01",
    closes: "2026-11-30",
    summary:
      "Trunking between regional distribution centres for a retail client. Mostly motorway work, no multi-drop.",
    duties: ["Trunk runs between depots", "Daily vehicle checks", "Accurate tachograph records"],
    requirements: ["Class 1 (C+E) licence", "Valid CPC and digital tachograph card", "No more than 6 points"],
    example: true,
  },
  {
    slug: "example-warehouse-operative",
    title: "Warehouse Operative",
    sector: "warehouse-distribution",
    type: "Temp to perm",
    location: "Blackpool, Lancashire",
    pay: "£12.60 an hour",
    payMin: 12.6,
    payUnit: "HOUR",
    hours: "Monday to Friday, 7am to 3pm",
    posted: "2026-10-03",
    summary: "Picking and packing for a growing online retailer, with a permanent contract after 12 weeks for the right people.",
    duties: ["Picking orders with a handheld scanner", "Packing and labelling", "Keeping the work area tidy and safe"],
    requirements: ["Reliable and on time", "Happy on your feet all shift", "Forklift licence a bonus, not essential"],
    example: true,
  },
  {
    slug: "example-sous-chef",
    title: "Sous Chef",
    sector: "hospitality-catering",
    type: "Permanent",
    location: "Lytham St Annes, Lancashire",
    pay: "£30,000 to £33,000 a year",
    payMin: 30000,
    payMax: 33000,
    payUnit: "YEAR",
    hours: "45 hours a week, 5 days out of 7",
    posted: "2026-10-05",
    summary: "Second in command in a busy independent restaurant with a seasonal menu and a small, settled team.",
    duties: ["Running the pass when the head chef is off", "Ordering and stock rotation", "Training junior chefs"],
    requirements: ["Experience as a sous chef or strong junior sous", "Level 2 food hygiene", "Calm under pressure"],
    example: true,
  },
];

export const jobs = allJobs.filter((j) => !j.example || site.showExampleJobs);
export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
