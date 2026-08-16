# Chengyu Wisdom — Design Document

## 1. Project Overview

Chengyu Wisdom is a lightweight cultural education platform that uses classic
four-character Chinese idioms (chengyu) as a gateway to explain traditional
Chinese philosophy, mindset, values and historical wisdom to global audiences.

It is built for **culture enthusiasts** — not Chinese language learners.

## 2. Product Positioning

### 2.1 Target Audience

Overseas audiences interested in Chinese history, philosophy and traditional
culture: history enthusiasts, travelers, fans of Eastern thought, and general
cultural content consumers.

### 2.2 Core Value

Deliver deep cultural insight, not language instruction. Help users understand
how ancient Chinese thinking shapes both traditional and modern Chinese
culture, through concise, well-told idiom stories.

### 2.3 What We Explicitly Exclude

No example sentences, grammar tips, HSK level tags, synonyms/antonyms, or
language practice exercises. This is not a Chinese learning tool.

## 3. Content Priority

Content weight, ordered by importance:

| Priority | Content |
| --- | --- |
| 1 | Cultural insight & traditional values |
| 2 | Complete narrative origin story |
| 3 | Historical & social background |
| 4 | Concise core meaning |

## 4. Data Schema

Based on JSON Schema Draft-07, used for content validation and frontend
rendering.

### 4.1 Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | Unique entry ID |
| `idiom` | string | Standard four-character Chinese idiom |
| `pinyin` | string | Full pinyin with tone marks |
| `core_meaning_en` | string | One-sentence modern definition |
| `story_en` | string | Complete, readable narrative of the idiom origin |
| `cultural_insight_en` | string | Core field: analysis of traditional values, Chinese mindset and philosophy |
| `tags` | string[] | Cultural category tags |

### 4.2 Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `literal_translation_en` | string \| null | Literal word-for-word translation, satisfying curiosity about Chinese character imagery |
| `history_background_en` | string \| null | Historical context and social environment of the story |
| `modern_cultural_relevance_en` | string \| null | How this cultural value appears in modern Chinese society |
| `origin_source` | string \| null | Original historical source, dynasty or figure |

### 4.3 TypeScript Definition

```typescript
interface ChengyuEntry {
  id: number;
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

type ChengyuEntryList = ChengyuEntry[];
```

## 5. Page Structure

### 5.1 Homepage

- **Header**: Logo, category navigation, Random Idiom button
- **Hero Section**: Brand slogan, core value statement, primary CTA
- **Category Grid**: 9 cultural tag categories for filtered browsing
- **Featured Entries**: Curated idiom previews
- **Footer**: Copyright and project description

### 5.2 Detail Page (Reading Flow)

Ordered by natural user reading path, with clear visual hierarchy:

1. **Idiom header**: Chinese characters, pinyin, literal translation
2. **Core meaning**: Bold, single-line summary
3. **Historical background** *(optional)*: Lightweight contextual setup
4. **Full story**: Main body text, narrative-focused
5. **Cultural Insight**: Highlighted card — the focal point of the page
6. **Modern cultural relevance** *(optional)*
7. **Source attribution** *(optional, low visual weight)*
8. **Bottom actions**: Tags + Next Random Idiom button

## 6. Design Principles

- **Reading-first**: Optimized line length and line height for comfortable
  long-form English reading
- **Minimalist aesthetic**: Clean layout with generous whitespace; avoid
  kitschy decorative elements
- **Cultural restraint**: Subtle traditional Chinese visual cues (warm
  paper-toned background, serif font for Chinese characters)
- **Frictionless experience**: No login, no comments, no popups — pure
  uninterrupted reading
- **Fully responsive**: Adaptive layout across desktop and mobile devices

## 7. Core Differentiation

| Standard Idiom Sites | Chengyu Wisdom |
| --- | --- |
| Built for language learners | Built for culture enthusiasts |
| Focus on usage and grammar | Focus on philosophy and mindset |
| Core product: dictionary reference | Core product: cultural understanding |
| Value: practical language skill | Value: cross-cultural insight |

## 8. Technical Stack

### 8.1 Build & Deployment Model

**Static site, compiled at build time.** Every release is a full compilation
that emits a set of static HTML/CSS/JS assets; no runtime server is required,
so the output can be hosted on any static CDN or object storage.

### 8.2 Framework

| Layer | Choice |
| --- | --- |
| Build tool | Vite |
| Language | TypeScript |
| UI framework | React |
| Styling | Tailwind CSS |

### 8.3 Content Pipeline

Content lives as JSON data files (validated against the JSON Schema in §4),
imported at build time and rendered into static pages by the React app. No
database or backend API is involved in serving the site.
