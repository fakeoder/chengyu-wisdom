import { getFeaturedEntries } from "../data";
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
    </section>
  );
}
