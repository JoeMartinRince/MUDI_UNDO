/**
 * MUDI UNDO?™ — CENSUS TWIN DATABASE
 * -----------------------------------------------------------------------------
 * Data-driven character database for hair-census character matching.
 * Contains 20 popular fictional and real-world hair icons.
 * Standard root-relative image paths pointing to public/census-twins/*.webp.
 * Strictly hair-based metrics — NO facial recognition or identity tracking.
 */

export interface CensusTwinProfile {
  id: string;
  name: string;
  franchise: string;
  image: string;
  targetHairCoverage: number;
  minHairCoverage: number;
  maxHairCoverage: number;
  description: string;
  association: string;
}

export const CENSUS_TWINS: CensusTwinProfile[] = [
  // 1. Saitama — 0%
  {
    id: "saitama",
    name: "Saitama",
    franchise: "One-Punch Man",
    image: "/census-twins/saitama.webp",
    targetHairCoverage: 0,
    minHairCoverage: 0,
    maxHairCoverage: 1,
    description: "The census confirms: there is no hair. Only confidence.",
    association: "MAXIMUM BALD EFFICIENCY",
  },
  // 2. Krillin — 2%
  {
    id: "krillin",
    name: "Krillin",
    franchise: "Dragon Ball",
    image: "/census-twins/krillin.webp",
    targetHairCoverage: 2,
    minHairCoverage: 1,
    maxHairCoverage: 2.5,
    description: "Maximum scalp efficiency detected.",
    association: "LOW-FOLLICLE MONK",
  },
  // 3. Professor X — 3%
  {
    id: "professor-x",
    name: "Professor X",
    franchise: "X-Men",
    image: "/census-twins/professor-x.webp",
    targetHairCoverage: 3,
    minHairCoverage: 2.5,
    maxHairCoverage: 3.5,
    description: "Your hair has apparently developed telepathic independence.",
    association: "TELEPATHIC SCALP DENSITY",
  },
  // 4. Voldemort — 4%
  {
    id: "voldemort",
    name: "Voldemort",
    franchise: "Harry Potter",
    image: "/census-twins/voldemort.webp",
    targetHairCoverage: 4,
    minHairCoverage: 3.5,
    maxHairCoverage: 8,
    description: "Even dark lords respect a clean scalp.",
    association: "DARK LORD AERODYNAMICS",
  },
  // 5. Walter White — 12%
  {
    id: "walter-white",
    name: "Walter White",
    franchise: "Breaking Bad",
    image: "/census-twins/walter-white.webp",
    targetHairCoverage: 12,
    minHairCoverage: 8,
    maxHairCoverage: 15,
    description: "The hair has entered its final season.",
    association: "HEISENBERG PRECISION",
  },

  // 6. Gollum — 18%
  {
    id: "gollum",
    name: "Gollum",
    franchise: "Lord of the Rings",
    image: "/census-twins/gollum.webp",
    targetHairCoverage: 18,
    minHairCoverage: 15,
    maxHairCoverage: 28,
    description: "Precious follicles detected.",
    association: "PRECIOUS FOLLICLE PATTERN",
  },
  // 7. Marty McFly — 40%
  {
    id: "marty-mcfly",
    name: "Marty McFly",
    franchise: "Back to the Future",
    image: "/census-twins/marty-mcfly.webp",
    targetHairCoverage: 40,
    minHairCoverage: 28,
    maxHairCoverage: 44,
    description: "Your hair density has travelled through time.",
    association: "TEMPORAL DENSITY SHIFT",
  },
  // 8. Levi Ackerman — 48%
  {
    id: "levi",
    name: "Levi Ackerman",
    franchise: "Attack on Titan",
    image: "/census-twins/levi.webp",
    targetHairCoverage: 48,
    minHairCoverage: 44,
    maxHairCoverage: 54,
    description: "Hair density acceptable. Cleaning standards remain questionable.",
    association: "PRECISION UNDERCUT",
  },
  // 9. Shikamaru Nara — 60%
  {
    id: "shikamaru",
    name: "Shikamaru Nara",
    franchise: "Naruto",
    image: "/census-twins/shikamaru.webp",
    targetHairCoverage: 60,
    minHairCoverage: 54,
    maxHairCoverage: 64,
    description: "Your hair density is acceptable. Your motivation is questionable.",
    association: "PONYTAIL TACTICIAN",
  },
  // 10. Tony Stark — 68%
  {
    id: "tony-stark",
    name: "Tony Stark",
    franchise: "Marvel",
    image: "/census-twins/tony-stark.webp",
    targetHairCoverage: 68,
    minHairCoverage: 64,
    maxHairCoverage: 70,
    description: "A perfect balance of technology, confidence and follicles.",
    association: "ARC-REACTOR FOLLICLE MATRIX",
  },

  // 11. Luffy — 72%
  {
    id: "luffy",
    name: "Luffy",
    franchise: "One Piece",
    image: "/census-twins/luffy.webp",
    targetHairCoverage: 72,
    minHairCoverage: 70,
    maxHairCoverage: 74,
    description: "Your hair has set sail toward unprecedented density.",
    association: "STRAW HAT FOLLICLE CREW",
  },
  // 12. Naruto Uzumaki — 75%
  {
    id: "naruto",
    name: "Naruto Uzumaki",
    franchise: "Naruto",
    image: "/census-twins/naruto.webp",
    targetHairCoverage: 75,
    minHairCoverage: 74,
    maxHairCoverage: 76.5,
    description: "Your hair has officially entered ninja territory.",
    association: "NINJA CROWN DENSITY",
  },
  // 13. Tanjiro Kamado — 78%
  {
    id: "tanjiro",
    name: "Tanjiro Kamado",
    franchise: "Demon Slayer",
    image: "/census-twins/tanjiro.webp",
    targetHairCoverage: 78,
    minHairCoverage: 76.5,
    maxHairCoverage: 79,
    description: "Your follicles have mastered the Water Breathing technique.",
    association: "WATER BREATHING CROP",
  },
  // 14. Ichigo Kurosaki — 80%
  {
    id: "ichigo",
    name: "Ichigo Kurosaki",
    franchise: "Bleach",
    image: "/census-twins/ichigo.webp",
    targetHairCoverage: 80,
    minHairCoverage: 79,
    maxHairCoverage: 81,
    description: "Your hair has crossed into Soul Reaper territory.",
    association: "SOUL REAPER SPIKES",
  },
  // 15. Gojo Satoru — 82%
  {
    id: "gojo",
    name: "Gojo Satoru",
    franchise: "Jujutsu Kaisen",
    image: "/census-twins/gojo.webp",
    targetHairCoverage: 82,
    minHairCoverage: 81,
    maxHairCoverage: 85,
    description: "Your hair appears to possess its own domain expansion.",
    association: "DOMAIN EXPANSION VOLUME",
  },

  // 16. Johnny Bravo — 88%
  {
    id: "johnny-bravo",
    name: "Johnny Bravo",
    franchise: "Cartoon Network",
    image: "/census-twins/johnny-bravo.webp",
    targetHairCoverage: 88,
    minHairCoverage: 85,
    maxHairCoverage: 89,
    description: "Hair population: absolutely fabulous.",
    association: "FABULOUS POMPADOUR",
  },
  // 17. Goku — 90%
  {
    id: "goku",
    name: "Goku",
    franchise: "Dragon Ball",
    image: "/census-twins/goku.webp",
    targetHairCoverage: 90,
    minHairCoverage: 89,
    maxHairCoverage: 91,
    description: "Your follicular energy level is dangerously high.",
    association: "SUPER SAIYAN MAXIMUM",
  },
  // 18. Bob Ross — 92%
  {
    id: "bob-ross",
    name: "Bob Ross",
    franchise: "Art",
    image: "/census-twins/bob-ross.webp",
    targetHairCoverage: 92,
    minHairCoverage: 91,
    maxHairCoverage: 93,
    description: "A happy little follicle has entered the census.",
    association: "HAPPY LITTLE AFRO",
  },
  // 19. Einstein — 94%
  {
    id: "einstein",
    name: "Einstein",
    franchise: "Science",
    image: "/census-twins/einstein.webp",
    targetHairCoverage: 94,
    minHairCoverage: 93,
    maxHairCoverage: 95,
    description: "The hair is doing more calculations than the computer.",
    association: "RELATIVISTIC DENSITY",
  },
  // 20. Hagrid — 96%
  {
    id: "hagrid",
    name: "Hagrid",
    franchise: "Harry Potter",
    image: "/census-twins/hagrid.webp",
    targetHairCoverage: 96,
    minHairCoverage: 95,
    maxHairCoverage: 100,
    description: "The census detected an unusually powerful follicular ecosystem.",
    association: "WILD WILDERNESS ECOSYSTEM",
  },
];

export const FALLBACK_TWIN: CensusTwinProfile = {
  id: "unknown_entity",
  name: "Unknown Follicular Entity",
  franchise: "Census Bureau Archives",
  image: "/census-twins/placeholder.webp",
  targetHairCoverage: 50,
  minHairCoverage: 0,
  maxHairCoverage: 100,
  description: "No registered character profile matches your unique hair metrics. You are a true follicular anomaly.",
  association: "UNCLASSIFIED FOLLICLE PATTERN",
};
