/**
 * The steps for each side, shown on the employer and candidate pages.
 * TODO: ask the client to confirm these match how they actually work.
 */

export type Step = { title: string; text: string };

export const employerSteps: Step[] = [
  {
    title: "Tell us what you need",
    text: "The role, the hours, the location, and whether it's permanent or temporary.",
  },
  {
    title: "We find the people",
    text: "We advertise on our website, social media and job sites, and search the candidates already registered with us.",
  },
  {
    title: "You meet a checked shortlist",
    text: "We confirm identity, right to work and references before anyone reaches you.",
  },
  {
    title: "We stay in touch",
    text: "We arrange interviews or start dates and check in once your new starter is settled.",
  },
];

export const candidateSteps: Step[] = [
  {
    title: "Apply online",
    text: "Fill in the short form and attach your CV. No CV yet? Call or email us and we'll help.",
  },
  {
    title: "We give you a call",
    text: "We talk through your experience, the work you want, where you can travel and when you're free.",
  },
  {
    title: "We put you forward",
    text: "Only for jobs that suit you, and only after you've said yes to each one.",
  },
  {
    title: "You start work",
    text: "We help you prepare for interviews and keep in touch after your first day.",
  },
];
