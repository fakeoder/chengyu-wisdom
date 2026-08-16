# Chengyu Wisdom

> A lightweight cultural education platform that uses classic four-character
> Chinese idioms (_chengyu_) as a gateway to explain traditional Chinese
> philosophy, mindset, values, and historical wisdom to global audiences.

**Source code**: <https://github.com/fakeoder/chengyu-wisdom>

Built for **culture enthusiasts** — not Chinese language learners.

## Who It's For

Overseas audiences interested in Chinese history, philosophy, and traditional
culture: history enthusiasts, travelers, fans of Eastern thought, and general
cultural content consumers.

## What It Delivers

Deep cultural insight, not language instruction. Each entry tells the origin
story of an idiom and unpacks the traditional values and Chinese mindset behind
it, through concise, well-told stories.

**Explicitly excluded** — this is not a Chinese learning tool:

- No example sentences
- No grammar tips
- No HSK level tags
- No synonyms / antonyms
- No language practice exercises

## Content Priorities

Content weight, ordered by importance:

1. Cultural insight & traditional values
2. Complete narrative origin story
3. Historical & social background
4. Concise core meaning

## Product Highlights

**Homepage**

- Header: logo, category navigation, Random Idiom button
- Hero section: brand slogan, core value statement, primary CTA
- Category grid: 9 cultural tag categories for filtered browsing
- Featured entries: curated idiom previews
- Footer: copyright and project description

**Detail page (reading flow)**

Reading-first layout in natural reading order: idiom header (characters,
pinyin, literal translation) → core meaning → historical background (optional)
→ full story → **Cultural Insight** card (the focal point) → modern cultural
relevance (optional) → source attribution (optional) → tags + Next Random
Idiom button.

**Frictionless experience**

- No login, no comments, no popups — pure uninterrupted reading
- Fully responsive across desktop and mobile

## Design Principles

- **Reading-first**: optimized line length and line height for comfortable
  long-form English reading
- **Minimalist aesthetic**: clean layout with generous whitespace; no kitschy
  decorative elements
- **Cultural restraint**: subtle traditional Chinese visual cues (warm
  paper-toned background, serif font for Chinese characters)
- **Fully responsive**: adaptive layout on all screen sizes

## Data Model

Content is stored as JSON (validated against JSON Schema Draft-07) with one
entry per idiom. Each entry has a Chinese idiom, pinyin, an English story, a
core `cultural_insight_en` field, and an `img` field pointing to its artwork.

**Artwork** lives in `src/assets/idioms/`, named after the idiom's full pinyin
(e.g. `saiwengshima.webp` for 塞翁失马) and referenced by filename in the `img`
field. Drop a WebP in that folder to make it appear on the detail page and in
entry cards; entries without an image render no image area at all. `npm run
validate` warns (does not fail) about missing artwork files.

See [design.md](design.md) for the full schema and TypeScript definition.

## Technical Stack

Static site, compiled at build time — no runtime server. Built with
**Vite + TypeScript + React + Tailwind CSS**; content JSON files are imported
at build time and rendered into static pages. Deployable to any static CDN.

## Project Status

Implemented: static site built with **Vite + TypeScript + React + Tailwind CSS**,
with content validated against the JSON Schema (§4 of [design.md](design.md)).

```bash
npm install        # install dependencies
npm run dev        # start the dev server
npm run validate   # validate content JSON against the schema
npm run build      # validate + typecheck + emit static assets to dist/
npm run preview    # serve the built site locally
```

Static site, compiled at build time — no runtime server. Deployable to any
static CDN or object storage.

## License

Copyright © Chengyu Wisdom contributors. All rights reserved.
