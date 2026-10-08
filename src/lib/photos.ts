/**
 * Photos used on the site, all from Unsplash under the free Unsplash License
 * (free for commercial use, no credit required, though we credit the
 * photographers on /privacy as a courtesy). https://unsplash.com/license
 *
 * How they load:
 * - If the file exists in /public/images (download them all with
 *   `python3 scripts/fetch-photos.py`), the site serves its own copy.
 *   This is what should happen before launch: faster and more reliable.
 * - Otherwise the visitor's browser loads the photo straight from Unsplash,
 *   so the mock-up shows real images without anything downloaded.
 * - If that fails too, a branded navy placeholder shows instead.
 *
 * TODO before launch: run the download script, check each photo page still
 * shows the free Unsplash License (not Unsplash+), and swap in real photos of
 * the client's work if they have any.
 */

export type PhotoKey = keyof typeof photos;

export type PhotoInfo = {
  file: string;
  alt: string;
  unsplashId: string;
  credit: string;
  label: string;
};

export const photos = {
  construction: {
    file: "/images/construction.jpg",
    alt: "Construction worker in a hard hat on a building frame",
    unsplashId: "X1P1_EDNnok",
    credit: "Josh Olalde",
    label: "Construction",
  },
  siteWorker: {
    file: "/images/site-worker.jpg",
    alt: "Construction worker in an orange jumpsuit and hard hat",
    unsplashId: "CIzpIYEA130",
    credit: "Josh Marty",
    label: "General labour",
  },
  tradesman: {
    file: "/images/tradesman.jpg",
    alt: "Man in a hard hat working on a building site",
    unsplashId: "Z0DNWoUP65k",
    credit: "Mina Rad",
    label: "Trades",
  },
  factory: {
    file: "/images/factory.jpg",
    alt: "People working at a large machine on a factory production line",
    unsplashId: "0V9Ua2YsXfE",
    credit: "Homa Appliances",
    label: "Manufacturing",
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
  trucks: {
    file: "/images/trucks.jpg",
    alt: "Lorries driving on a motorway at sunset",
    unsplashId: "qms-kprAgJM",
    credit: "Unsplash contributor",
    label: "Driving",
  },
  port: {
    file: "/images/port.jpg",
    alt: "Aerial view of a busy shipping port with stacked containers",
    unsplashId: "JJCrTi0lvTs",
    credit: "Haris Illahi",
    label: "Logistics",
  },
  reception: {
    file: "/images/reception.jpg",
    alt: "Office reception desk",
    unsplashId: "hrzXCueUJ4M",
    credit: "Maciej Drążkiewicz",
    label: "Office",
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
  meeting: {
    file: "/images/meeting.jpg",
    alt: "A small team meeting around a table with a laptop",
    unsplashId: "YyJNda7nsPo",
    credit: "Vitaly Gariev",
    label: "Contact",
  },
  blackpool: {
    file: "/images/blackpool-tower.jpg",
    alt: "Blackpool Tower against a cloudy sky",
    unsplashId: "J0i08cBFerQ",
    credit: "Mark McNeill",
    label: "Blackpool",
  },
} satisfies Record<string, PhotoInfo>;

/** Direct Unsplash link, used until the photo is downloaded into /public/images. */
export const unsplashUrl = (id: string, width = 1600) =>
  `https://unsplash.com/photos/${id}/download?force=true&w=${width}`;
