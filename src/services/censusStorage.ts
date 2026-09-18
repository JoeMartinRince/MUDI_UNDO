/**
 * MUDI UNDO? — LOCAL STORAGE & CENSUS ARCHIVES SERVICE
 * -----------------------------------------------------------------------------
 * Persistence layer for saving user scan history, guesses, leaderboard entries,
 * and real accumulated global statistics in browser LocalStorage.
 * Strictly ZERO hardcoded/fabricated data.
 */

import type { CensusResult } from "@/data/census";

const KEYS = {
  HISTORY: "mudi_census_history_v1",
  USER_GUESS: "mudi_user_guess_temp",
  LEADERBOARD: "mudi_leaderboard_v1",
  EASTER_EGGS: "mudi_unlocked_easter_eggs_v1",
};

export interface LeaderboardEntry {
  id: string;
  censusNumber: string;
  name: string;
  hairPopulation: number;
  hairCoverage: number;
  classification: string;
  date: string;
  funnyTitle?: string;
  badge?: string;
}

export interface RealGlobalStats {
  peopleScanned: number;
  totalHairsCounted: number;
  averageHairPopulation: number;
  highestEstimate: number;
  numberOfScans: number;
}

/**
 * Save user pre-scan guess in temporary session memory / localStorage.
 */
export function saveUserGuess(guess: number) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEYS.USER_GUESS, String(guess));
  } catch (err) {
    console.warn("[MUDI STORAGE] Unable to save user guess:", err);
  }
}

/**
 * Consume and retrieve saved user guess.
 */
export function getSavedUserGuess(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem(KEYS.USER_GUESS);
    if (val) {
      localStorage.removeItem(KEYS.USER_GUESS);
      return Number(val);
    }
  } catch (err) {
    console.warn("[MUDI STORAGE] Unable to read user guess:", err);
  }
  return null;
}

/**
 * Save a completed census result into History Archives.
 */
export function saveCensusToHistory(result: CensusResult) {
  if (typeof window === "undefined") return;
  try {
    const history = getCensusHistory();
    // Avoid duplicate entries by censusNumber
    const existsIndex = history.findIndex((item) => item.censusNumber === result.censusNumber);
    if (existsIndex >= 0) {
      history[existsIndex] = result;
    } else {
      history.unshift(result);
    }
    // Limit history to latest 50 records
    const trimmed = history.slice(0, 50);
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(trimmed));
  } catch (err) {
    console.warn("[MUDI STORAGE] Error saving census history:", err);
  }
}

/**
 * Get all past census history records.
 */
export function getCensusHistory(): CensusResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.HISTORY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("[MUDI STORAGE] Error loading census history:", err);
  }
  return [];
}

/**
 * Clear census history.
 */
export function clearCensusHistory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEYS.HISTORY);
  } catch (err) {
    console.warn("[MUDI STORAGE] Error clearing history:", err);
  }
}

/**
 * Retrieve current National Leaderboard entries (REAL DATA ONLY - NO HARDCODED RECORDS).
 */
export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.LEADERBOARD);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("[MUDI STORAGE] Error loading leaderboard:", err);
  }
  return [];
}

/**
 * Add a new score entry to the National Leaderboard. Prevents spam duplicates.
 */
export function addLeaderboardEntry(entry: Omit<LeaderboardEntry, "id">) {
  if (typeof window === "undefined") return;
  try {
    const leaderboard = getLeaderboard();

    // Spam / Duplicate Prevention: check if censusNumber already submitted
    const existingIndex = leaderboard.findIndex((item) => item.censusNumber === entry.censusNumber);
    
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: `lead-${Date.now()}`,
    };

    if (existingIndex >= 0) {
      leaderboard[existingIndex] = newEntry;
    } else {
      leaderboard.push(newEntry);
    }

    // Sort descending by hair population
    leaderboard.sort((a, b) => b.hairPopulation - a.hairPopulation);
    const trimmed = leaderboard.slice(0, 50);
    localStorage.setItem(KEYS.LEADERBOARD, JSON.stringify(trimmed));
  } catch (err) {
    console.warn("[MUDI STORAGE] Error adding leaderboard entry:", err);
  }
}

/**
 * Compute REAL accumulated global application statistics from stored census records.
 */
export function getRealGlobalStats(): RealGlobalStats {
  const history = getCensusHistory();
  const leaderboard = getLeaderboard();

  // Combine unique records by censusNumber
  const allRecordsMap = new Map<string, number>();

  for (const item of history) {
    allRecordsMap.set(item.censusNumber, item.hairPopulation);
  }
  for (const item of leaderboard) {
    allRecordsMap.set(item.censusNumber, item.hairPopulation);
  }

  const populations = Array.from(allRecordsMap.values());
  const numberOfScans = populations.length;

  if (numberOfScans === 0) {
    return {
      peopleScanned: 0,
      totalHairsCounted: 0,
      averageHairPopulation: 0,
      highestEstimate: 0,
      numberOfScans: 0,
    };
  }

  const totalHairsCounted = populations.reduce((sum, pop) => sum + pop, 0);
  const averageHairPopulation = Math.round(totalHairsCounted / numberOfScans);
  const highestEstimate = Math.max(...populations);

  return {
    peopleScanned: numberOfScans,
    totalHairsCounted,
    averageHairPopulation,
    highestEstimate,
    numberOfScans,
  };
}

/**
 * Easter egg unlock management.
 */
export function unlockEasterEgg(eggKey: string) {
  if (typeof window === "undefined") return;
  try {
    const unlocked = getUnlockedEasterEggs();
    if (!unlocked.includes(eggKey)) {
      unlocked.push(eggKey);
      localStorage.setItem(KEYS.EASTER_EGGS, JSON.stringify(unlocked));
    }
  } catch (err) {
    console.warn("[MUDI STORAGE] Error unlocking easter egg:", err);
  }
}

export function getUnlockedEasterEggs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.EASTER_EGGS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("[MUDI STORAGE] Error reading easter eggs:", err);
  }
  return [];
}
