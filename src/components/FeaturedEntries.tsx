import { Link } from "react-router-dom";
import { getFeaturedEntries, entries } from "../data";
import SectionHeading from "./SectionHeading";
import EntryCard from "./EntryCard";

export default function FeaturedEntries() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 sm:pt-20" id="featured">
      <SectionHeading
        kicker="Curated stories"
        title="Featured Idioms"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {getFeaturedEntries(6).map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/stories"
          className="inline-flex min-h-11 items-center border border-ink/30 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors hover:border-seal hover:text-seal"
        >
          View All {entries.length} Stories →
        </Link>
      </div>
    </section>
  );
}
