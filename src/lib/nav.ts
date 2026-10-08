// Main navigation: one page per topic.
export const navLinks = [
  { label: "Employers", href: "/employers" },
  { label: "Candidates", href: "/candidates" },
  { label: "Sectors", href: "/sectors" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Where the two main buttons go: straight to each page's form.
export const cvLink = "/candidates#apply";
export const hireLink = "/employers#enquire";

/** Link to a form with the sector already chosen, e.g. from a sector page. */
export const formLink = (kind: "employer" | "candidate", sectorSlug?: string) => {
  const base = kind === "employer" ? "/employers" : "/candidates";
  const hash = kind === "employer" ? "#enquire" : "#apply";
  return sectorSlug ? `${base}?sector=${sectorSlug}${hash}` : `${base}${hash}`;
};
