/**
 * Photos used on the site. All are from Unsplash under the free Unsplash
 * License (free for commercial use, no credit required, though we credit the
 * photographers on /privacy anyway as a courtesy).
 * https://unsplash.com/license
 *
 * The files live in /public/images. Download them with:
 *   python3 scripts/fetch-photos.py
 * Until a file exists, the site shows a branded placeholder in its place.
 *
 * TODO: before launch, check each photo page still shows the free Unsplash
 * License (not Unsplash+), and swap in real photos of the client's work if
 * they have any.
 */

export type PhotoKey = keyof typeof photos;

export const photos = {
  construction: {
    file: "/images/construction.jpg",
    alt: "Construction worker in a hard hat on a building frame",
    unsplashId: "X1P1_EDNnok",
    credit: "Josh Olalde",
    label: "Construction",
  },
  kitchen: {
    file: "/images/kitchen.jpg",
    alt: "Chefs preparing food in a busy restaurant kitchen",
    unsplashId: "fuR0Iwu5dkk",
    credit: "blackieshoot",
    label: "Hospitality",
  },
  warehouse: {
    file: "/images/warehouse.jpg",
    alt: "Warehouse aisles stacked with boxes and pallets",
    unsplashId: "VnMbc9Szs-E",
    credit: "Unsplash contributor",
    label: "Warehouse",
  },
  officeTeam: {
    file: "/images/office-team.jpg",
    alt: "Colleagues working together around a computer in an office",
    unsplashId: "UikYLDQj9_I",
    credit: "Vitaly Gariev",
    label: "Employers",
  },
  candidateChat: {
    file: "/images/candidate-chat.jpg",
    alt: "Two people talking at a desk in an office",
    unsplashId: "aoweP90-XwM",
    credit: "Vitaly Gariev",
    label: "Candidates",
  },
  blackpool: {
    file: "/images/blackpool-tower.jpg",
    alt: "Blackpool Tower against a cloudy sky",
    unsplashId: "J0i08cBFerQ",
    credit: "Mark McNeill",
    label: "Blackpool",
  },
} as const;
