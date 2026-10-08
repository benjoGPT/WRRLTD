/**
 * The founders, shown on the About page and the home page.
 *
 * TODO from the client for each founder:
 * - surname and job title
 * - a square photo (save as public/images/team/<first-name>.jpg, at least 800px)
 * - a short bio in their own words: background, experience, why Wright Point
 * Until then the site shows their initials and a clearly marked placeholder.
 */

export type Founder = {
  firstName: string;
  surname?: string;
  role: string;
  /** Path under /public, once a photo exists */
  photo?: string;
  /** Leave empty until the founder supplies it */
  bio?: string;
};

export const founders: Founder[] = [
  { firstName: "Anthony", role: "Co-founder" },
  { firstName: "Tanya", role: "Co-founder" },
];

export const fullName = (f: Founder) => [f.firstName, f.surname].filter(Boolean).join(" ");
