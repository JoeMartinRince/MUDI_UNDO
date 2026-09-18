/**
 * MUDI UNDO? — ADVANCED HAIR FEATURE ENGINE & DATA MODELS
 * -----------------------------------------------------------------------------
 * Provides mathematical modeling, archetype generators, economic valuation algorithms,
 * synthetic DNA mapping, and global census telemetries for the Hair Census Bureau.
 */

import type { CensusResult } from "./census";

// --- 1. HAIR ECONOMY ENGINE ---
export interface HairEconomyMetrics {
  folliclePrice: number; // $ per follicle
  netHairWorth: number; // Total portfolio valuation in USD
  barberTaxLiability: number; // Estimated annual maintenance cost
  shampooConsumptionLiters: number; // Liters per year
  carbonSequestrationGram: number; // Follicle carbon capture
}

export function calculateHairEconomy(hairPopulation: number, hairCoverage: number): HairEconomyMetrics {
  const folliclePrice = 0.045; // $0.045 per strand benchmark
  const netHairWorth = Math.round(hairPopulation * folliclePrice);
  
  // Barber tax liability scales with coverage and maintenance requirement
  const maintenanceTier = hairCoverage > 70 ? 240 : hairCoverage > 40 ? 160 : 80;
  const barberTaxLiability = Math.round(maintenanceTier + (hairCoverage * 1.5));

  // Shampoo consumption scales with hair population density
  const shampooConsumptionLiters = Number(((hairPopulation / 10000) * 1.25).toFixed(1));

  // Carbon capture efficiency per follicle
  const carbonSequestrationGram = Math.round(hairPopulation * 0.082);

  return {
    folliclePrice,
    netHairWorth,
    barberTaxLiability,
    shampooConsumptionLiters,
    carbonSequestrationGram,
  };
}

// --- 2. HAIR PERSONALITY ARCHETYPES ---
export interface HairPersonalityArchetype {
  code: string;
  title: string;
  subtitle: string;
  trait: string;
  description: string;
  motto: string;
  stats: {
    density: number;
    volume: number;
    chaos: number;
    shine: number;
  };
}

export const PERSONALITY_ARCHETYPES: HairPersonalityArchetype[] = [
  {
    code: "PERS-01",
    title: "SMOOTH OPERATOR",
    subtitle: "0% - 15% Coverage",
    trait: "AERODYNAMIC PERFECTION & ZERO DRAG",
    description: "Your scalp operates at peak aerodynamic efficiency. Unbothered by wind, humidity, or bad hair days.",
    motto: "Why fight friction when you can glide over it?",
    stats: { density: 12, volume: 8, chaos: 5, shine: 95 },
  },
  {
    code: "PERS-02",
    title: "THE FLUFF ARCHITECT",
    subtitle: "16% - 40% Coverage",
    trait: "STRATEGIC VOLUME MANAGEMENT",
    description: "You master the art of lightweight height and strategic arrangement. Every strand has a deliberate purpose.",
    motto: "Precision geometry elevates any canopy.",
    stats: { density: 38, volume: 54, chaos: 42, shine: 78 },
  },
  {
    code: "PERS-03",
    title: "ORGANIZED FOREST",
    subtitle: "41% - 65% Coverage",
    trait: "BALANCED CANOPY HARMONY",
    description: "A structured, respectable follicular ecosystem. Well-behaved during business meetings, resilient outdoors.",
    motto: "Order in all things, especially the crown.",
    stats: { density: 62, volume: 68, chaos: 28, shine: 84 },
  },
  {
    code: "PERS-04",
    title: "CHAOS HAIR",
    subtitle: "66% - 85% Coverage",
    trait: "UNPREDICTABLE FOLLICULAR ENERGY",
    description: "Your hair defies gravity, combs, and weather reports. It possesses its own strong opinion on style.",
    motto: "Embrace the storm above your brow.",
    stats: { density: 79, volume: 88, chaos: 92, shine: 74 },
  },
  {
    code: "PERS-05",
    title: "FOREST LORD",
    subtitle: "86% - 100% Coverage",
    trait: "UNSTOPPABLE LION MANE",
    description: "An absolute force of nature. Your scalp commands an expansive canopy that dominates room acoustics.",
    motto: "Bow before the supreme follicular empire.",
    stats: { density: 96, volume: 98, chaos: 65, shine: 91 },
  },
];

export function getPersonalityArchetype(hairCoverage: number, hairPopulation: number = 50000): HairPersonalityArchetype {
  if (hairCoverage <= 15) return PERSONALITY_ARCHETYPES[0];
  if (hairCoverage <= 40) return PERSONALITY_ARCHETYPES[1];
  if (hairCoverage <= 65) return PERSONALITY_ARCHETYPES[2];
  if (hairCoverage <= 85) return PERSONALITY_ARCHETYPES[3];
  return PERSONALITY_ARCHETYPES[4];
}

// --- 3. HAIR DNA ENGINE ---
export interface HairDnaMetrics {
  sequenceCode: string;
  density: number; // %
  volume: number; // %
  chaos: number; // %
  shine: number; // %
  darkness: number; // %
  curlIndex: number;
  growthPotential: number;
  solarReflectionRate: number;
  stressResilience: number;
}

export function generateHairDna(censusNumber: string, hairCoverage: number, confidence: number): HairDnaMetrics {
  // Deterministic seed generation based on census number
  const numSeed = censusNumber.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bases = ["A", "T", "C", "G"];
  let sequenceCode = "MUDI-";
  for (let i = 0; i < 12; i++) {
    sequenceCode += bases[(numSeed * (i + 1) * 7) % 4];
  }

  // Calculate 5 core Fictional Hair Profile stats
  const density = Math.min(99, Math.max(15, Math.round(hairCoverage * 0.95 + ((numSeed % 11) - 5))));
  const volume = Math.min(99, Math.max(12, Math.round(hairCoverage * 0.9 + ((numSeed % 17) - 3))));
  const chaos = Math.min(99, Math.max(10, Math.round(((numSeed % 40) + 40) * (hairCoverage > 60 ? 1.1 : 0.8))));
  const shine = Math.min(99, Math.max(20, Math.round(confidence * 0.85 + (numSeed % 15))));
  const darkness = Math.min(99, Math.max(25, Math.round(75 + ((numSeed % 25) - 10))));

  const curlIndex = Math.round(((numSeed % 50) + (hairCoverage * 0.4)) % 100);
  const growthPotential = Number((1.1 + ((numSeed % 7) * 0.05)).toFixed(1));
  const solarReflectionRate = Math.round(100 - hairCoverage * 0.65);
  const stressResilience = Math.min(99, Math.round(confidence * 0.9 + 5));

  return {
    sequenceCode,
    density,
    volume,
    chaos,
    shine,
    darkness,
    curlIndex,
    growthPotential,
    solarReflectionRate,
    stressResilience,
  };
}

// --- 4. AERODYNAMIC WIND TUNNEL ENGINE ---
export interface WindTunnelMetrics {
  dragCoefficient: number; // Cd (e.g. 0.25 to 0.85)
  topWindSpeedMph: number; // Maximum wind tolerance before disheveling
  aerodynamicEfficiencyScore: number; // 0 - 100
  downforceKg: number;
}

export function calculateAerodynamics(hairCoverage: number, baldnessIndex: number): WindTunnelMetrics {
  // Lower hair coverage / higher baldness = lower drag coefficient
  const baseCd = 0.22 + (hairCoverage / 100) * 0.58;
  const dragCoefficient = Number(baseCd.toFixed(2));
  
  const aerodynamicEfficiencyScore = Math.min(99, Math.round(100 - (hairCoverage * 0.7)));
  const topWindSpeedMph = Math.round(120 - (hairCoverage * 0.6));
  const downforceKg = Number(((hairCoverage / 100) * 4.2).toFixed(1));

  return {
    dragCoefficient,
    topWindSpeedMph,
    aerodynamicEfficiencyScore,
    downforceKg,
  };
}

// --- 5. COMPARATIVE POPULATION METRICS ---
export const ANIMAL_COMPARISONS = [
  { species: "Sea Otter", densityPerSqCm: 150000, name: "Sea Otter (Extreme Density)" },
  { species: "Domestic Cat", densityPerSqCm: 20000, name: "Domestic Cat (Furry)" },
  { species: "Human Average", densityPerSqCm: 250, name: "Average Human Scalp" },
  { species: "Chimpanzee", densityPerSqCm: 150, name: "Chimpanzee" },
  { species: "Elephant", densityPerSqCm: 2, name: "African Elephant (Sparse Hair)" },
];

// --- 6. GLOBAL CENSUS AGGREGATES ---
export const GLOBAL_CENSUS_TELEMETRY = {
  totalGlobalSurveys: 1482912,
  totalFolliclesCounted: 114892019482,
  nationalAverageCoverage: 74.2,
  globalLeaderboardCutoff: 118000,
  lastUpdated: "2026-09-18",
};
