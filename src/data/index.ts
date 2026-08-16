import entriesJson from "./entries.json";
import categoriesJson from "./categories.json";
import type { ChengyuEntry, ChengyuCategory } from "../types";

export const entries = entriesJson as ChengyuEntry[];
export const categories = categoriesJson as ChengyuCategory[];

const entryById = new Map(entries.map((e) => [e.id, e]));
const categoryById = new Map(categories.map((c) => [c.id, c]));

export function getEntryById(id: number): ChengyuEntry | undefined {
  return entryById.get(id);
}

export function getCategoryById(id: string): ChengyuCategory | undefined {
  return categoryById.get(id);
}

/** Entries whose tags include the given category id. */
export function getEntriesByCategory(categoryId: string): ChengyuEntry[] {
  return entries.filter((e) => e.tags.includes(categoryId));
}

/** Curated preview list for the homepage featured grid. */
export function getFeaturedEntries(count = 6): ChengyuEntry[] {
  return entries.slice(0, count);
}

/** A random entry, optionally excluding one id (used by the Next Random button). */
export function getRandomEntry(excludeId?: number): ChengyuEntry {
  const pool = excludeId == null ? entries : entries.filter((e) => e.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}
