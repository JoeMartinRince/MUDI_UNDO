/**
 * MOCK CENSUS DATA
 * -----------------------------------------------------------------------------
 * Every value below is fabricated. When the real browser-based computer-vision
 * pipeline lands, `analyzeHair()` in src/lib/analyzeHair.ts should produce an
 * object with this exact `CensusResult` shape and nothing else in the UI needs
 * to change.
 */

export const SYSTEM_META = {
  protocol: "NHCA-PROTOCOL-01",
  status: "ACTIVE SURVEILLANCE",
  dataClass: "HUMAN HAIR CENSUS",
  version: "2.0-NHCA",
  department: "NATIONAL HAIR CENSUS AUTHORITY",
  tagline: "Because someone had to count them.",
  division: "FOLLICULAR ANALYTICS & POPULATION REGISTRATION",
  sealCode: "NHCA-GOV-2026",
} as const;

export const CLASSIFICATION_SCALE = [
  "Smooth Operator",
  "Grassland",
  "Savanna",
  "Forest",
  "Rainforest",
  "Amazon Prime",
] as const;

export type Classification = (typeof CLASSIFICATION_SCALE)[number] | string;

export interface ClassificationMeta {
  name: string;
  minCount: number;
  maxCount: number;
  icon: string;
  description: string;
  badge: string;
}

export const CLASSIFICATION_DETAILS: Record<string, ClassificationMeta> = {
  "Smooth Operator": {
    name: "SMOOTH OPERATOR",
    minCount: 0,
    maxCount: 10000,
    icon: "🥚",
    badge: "0k - 10k FOLLICLES",
    description: "Aerodynamic perfection. Zero drag, maximum thermal efficiency.",
  },
  "Grassland": {
    name: "GRASSLAND",
    minCount: 10000,
    maxCount: 30000,
    icon: "🌾",
    badge: "10k - 30k FOLLICLES",
    description: "A sparse but resilient follicular landscape traversing wide horizons.",
  },
  "Savanna": {
    name: "SAVANNA",
    minCount: 30000,
    maxCount: 60000,
    icon: "🏜️",
    badge: "30k - 60k FOLLICLES",
    description: "A balanced canopy capable of supporting classic strategic hairstyles.",
  },
  "Forest": {
    name: "FOREST",
    minCount: 60000,
    maxCount: 90000,
    icon: "🌲",
    badge: "60k - 90k FOLLICLES",
    description: "Structured, thriving canopy with robust shade capacity.",
  },
  "Rainforest": {
    name: "RAINFOREST",
    minCount: 90000,
    maxCount: 120000,
    icon: "🌧️",
    badge: "90k - 120k FOLLICLES",
    description: "Your scalp has officially become an ecosystem.",
  },
  "Amazon Prime": {
    name: "AMAZON PRIME",
    minCount: 120000,
    maxCount: 999999,
    icon: "⚡",
    badge: "120k+ FOLLICLES",
    description: "Unstoppable lion mane with next-day follicle delivery.",
  },
};

export type AnalysisStage = {
  id: string;
  label: string;
  /** ms after analysis start when this stage completes */
  at: number;
};

export const ANALYSIS_STAGES: AnalysisStage[] = [
  { id: "locate", label: "LOCATING HEAD", at: 900 },
  { id: "scalp", label: "MAPPING SCALP", at: 1800 },
  { id: "hair", label: "DETECTING HAIR", at: 2800 },
  { id: "population", label: "ESTIMATING POPULATION", at: 3700 },
  { id: "density", label: "CALCULATING DENSITY", at: 4500 },
  { id: "finalize", label: "FINALIZING CENSUS", at: 5300 },
];

export const ANALYSIS_DURATION_MS = 5800;

export const ANALYSIS_TELEMETRY = {
  pixelsAnalysed: 1_482_912,
  regionDetected: "HEAD / SCALP",
  segmentation: "IN PROGRESS",
  model: "MU-VISION / FOLLICLE-NET",
  frameRate: "30 FPS",
} as const;

export type CensusResult = {
  censusNumber: string;
  issuedAt: string;
  hairPopulation: number;
  populationMargin: number;
  hairCoverage: number;
  scalpExposure: number;
  baldnessIndex: number;
  confidence: number;
  classification: Classification;
  classificationGlyph: string;
  populationStatus: string;
  classificationNote: string;
  verdict: string;
  twin: {
    id?: string;
    name: string;
    association: string;
    note: string;
    franchise?: string;
    image?: string;
    matchScore?: number;
    targetHairCoverage?: number;
  };
  telemetry: {
    pixelsAnalysed: number;
    regionDetected: string;
    analysisRegion: string;
  };
  userGuess?: number;
  userGuessDifference?: number;
  userGuessAccuracy?: number;
  dnaCode?: string;
  personalityArchetype?: {
    title: string;
    code: string;
    trait: string;
    description: string;
  };
  netHairWorth?: number;
  barberTax?: number;
  dragCoefficient?: number;
  heatmapPoints?: Array<{ x: number; y: number; density: number }>;
};

export const MOCK_RESULT: CensusResult = {
  censusNumber: "MU-2026-48291",
  issuedAt: "2026-09-11",
  hairPopulation: 47_382,
  populationMargin: 11_420,
  hairCoverage: 78.4,
  scalpExposure: 21.6,
  baldnessIndex: 21.6,
  confidence: 84.7,
  classification: "DENSE FOREST",
  classificationGlyph: "🌳",
  populationStatus: "HAIR POPULATION: THRIVING",
  classificationNote:
    "Hair coverage exceeds the national threshold for healthy woodland classification.",
  verdict:
    "Hair detected. The census department confirms that the subject currently possesses a statistically significant quantity of hair.",
  twin: {
    id: "tanjiro",
    name: "TANJIRO KAMADO",
    association: "WATER BREATHING CROP",
    note: "Your follicles have mastered the Water Breathing technique.",
    franchise: "Demon Slayer",
    image: "/census-twins/tanjiro.webp",
    matchScore: 97.8,
    targetHairCoverage: 78,
  },
  telemetry: {
    pixelsAnalysed: 1_482_912,
    regionDetected: "HEAD / SCALP",
    analysisRegion: "01",
  },
};

export const DISPUTE_REASONS = [
  "I have more hair than reported",
  "I have less hair than reported",
  "The machine is lying",
  "I refuse to accept reality",
  "Other",
] as const;

export const DISPUTE_RESPONSE = [
  "Your complaint has been registered.",
  "Forwarded to the Department of Hair Affairs.",
  "Expected response time: 7–14 business follicles.",
] as const;

export const DISCLAIMER = [
  "FOR ENTERTAINMENT AND EXPERIMENTAL COMPUTER-VISION PURPOSES ONLY.",
  "RESULTS ARE ESTIMATES AND ARE NOT MEDICAL MEASUREMENTS.",
] as const;
