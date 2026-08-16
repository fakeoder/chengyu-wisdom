import { Link } from "react-router-dom";
import { entries } from "../data";
import EntryCard from "../components/EntryCard";

export default function StoriesPage() {
  return (
    <>
      <section className="border-b border-paper-edge bg-paper-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-seal">
            All stories
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Explore the Stories
          </h1>
          <p className="mt-3 max-w-xl text-ink-soft">
            Every idiom is a compressed story. Browse all of them here — from
            origins and drama to the philosophy behind each phrase.
          </p>
          <p className="mt-4 text-sm text-ink-faint">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>

        <div className="mt-14 border-t border-paper-edge pt-8">
          <Link
            to="/"
            className="inline-block text-sm text-ink-soft transition-colors hover:text-seal"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
