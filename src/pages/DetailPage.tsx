import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategoryById, getEntryById, getRandomEntry } from "../data";
import { getEntryImage } from "../data/images";
import SealMark from "../components/SealMark";
import EntryImage from "../components/EntryImage";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-faint">
      {children}
    </p>
  );
}

export default function DetailPage() {
  const { id } = useParams();
  const entry = getEntryById(Number(id));
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!entry) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-serif text-2xl font-bold text-ink">Idiom not found</h1>
        <p className="mt-3 text-ink-soft">That entry does not exist.</p>
        <Link to="/" className="mt-6 inline-block text-seal hover:underline">
          ← Back to home
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-2xl px-5 pt-12 pb-4 sm:pt-16">
      {/* 1. Idiom header — characters, pinyin, literal translation */}
      <header className="flex flex-col items-center text-center">
        <SealMark char={entry.idiom[0]} size="lg" title={entry.idiom} />
        <h1 className="mt-6 font-cn text-5xl font-semibold tracking-wide text-ink sm:text-6xl">
          {entry.idiom}
        </h1>
        <p className="mt-3 text-sm text-ink-soft">{entry.pinyin}</p>
        {entry.literal_translation_en && (
          <p className="mt-2 text-sm italic text-ink-faint">
            “{entry.literal_translation_en}”
          </p>
        )}
      </header>

      {/* Idiom artwork — full-width visual anchor (only when an image exists) */}
      {getEntryImage(entry.img) && (
        <figure className="mt-10 border border-paper-edge">
          <EntryImage entry={entry} className="aspect-[3/2]" eager />
        </figure>
      )}

      {/* 2. Core meaning — bold, single-line summary */}
      <p className="mt-10 border-y border-paper-edge py-5 text-center text-lg font-bold leading-snug text-ink sm:text-xl">
        {entry.core_meaning_en}
      </p>

      {/* 3. Historical background (optional) */}
      {entry.history_background_en && (
        <section className="mt-10">
          <SectionLabel>Historical background</SectionLabel>
          <p className="mt-3 font-serif text-[17px] leading-8 text-ink-soft">
            {entry.history_background_en}
          </p>
        </section>
      )}

      {/* 4. Full story — the main narrative body */}
      <section className="mt-10">
        <SectionLabel>The story</SectionLabel>
        <p className="mt-3 font-serif text-[17px] leading-8 text-ink">
          {entry.story_en}
        </p>
      </section>

      {/* 5. Cultural insight — the focal point of the page */}
      <aside className="mt-12 border-l-4 border-seal bg-paper-deep/70 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <SealMark char={entry.idiom[0]} size="sm" />
          <h2 className="font-serif text-2xl font-bold text-ink">Cultural Insight</h2>
        </div>
        <p className="mt-5 font-serif text-[17px] leading-8 text-ink">
          {entry.cultural_insight_en}
        </p>
      </aside>

      {/* 6. Modern cultural relevance (optional) */}
      {entry.modern_cultural_relevance_en && (
        <section className="mt-10">
          <SectionLabel>In modern China</SectionLabel>
          <p className="mt-3 font-serif text-[17px] leading-8 text-ink-soft">
            {entry.modern_cultural_relevance_en}
          </p>
        </section>
      )}

      {/* 7. Source attribution (optional, low visual weight) */}
      {entry.origin_source && (
        <p className="mt-10 text-xs leading-relaxed text-ink-faint">
          Source — {entry.origin_source}
        </p>
      )}

      {/* 8. Bottom actions — tags + next random idiom */}
      <footer className="mt-12 border-t border-paper-edge pt-8">
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Link
              key={tag}
              to={`/category/${tag}`}
              className="flex min-h-9 items-center rounded-full border border-paper-edge px-4 py-1.5 text-sm text-ink-soft transition-colors hover:border-seal hover:text-seal"
            >
              {getCategoryById(tag)?.label ?? tag}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => navigate(`/idiom/${getRandomEntry(entry.id).id}`)}
          className="mt-8 w-full cursor-pointer bg-ink px-6 py-4 text-sm font-semibold tracking-wide text-paper transition-colors hover:bg-seal"
        >
          Next Random Idiom →
        </button>
      </footer>
    </article>
  );
}
