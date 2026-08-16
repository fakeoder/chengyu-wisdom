/** One chengyu entry. See design.md §4 for the field contract. */
export interface ChengyuEntry {
  id: number;
  /** Filename of the artwork in src/assets/idioms/, e.g. "saiwengshima.png" */
  img: string;
  idiom: string;
  pinyin: string;
  literal_translation_en: string | null;
  core_meaning_en: string;
  history_background_en: string | null;
  story_en: string;
  cultural_insight_en: string;
  modern_cultural_relevance_en: string | null;
  origin_source: string | null;
  tags: string[];
}

export type ChengyuEntryList = ChengyuEntry[];

/** A cultural category used for filtered browsing on the homepage. */
export interface ChengyuCategory {
  id: string;
  label: string;
  tagline: string;
}

export type ChengyuCategoryList = ChengyuCategory[];
