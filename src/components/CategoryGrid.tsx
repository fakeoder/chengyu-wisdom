import { Link } from "react-router-dom";
import { categories, getEntriesByCategory } from "../data";
import SectionHeading from "./SectionHeading";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 sm:pt-20" id="categories">
      <SectionHeading
        kicker="Browse by theme"
        title="Nine Windows into Chinese Thought"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const count = getEntriesByCategory(cat.id).length;
          return (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group border border-paper-edge bg-paper-deep/40 p-5 transition-all hover:border-seal/50 hover:bg-paper-deep"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-lg font-bold text-ink transition-colors group-hover:text-seal">
                  {cat.label}
                </h3>
                <span className="text-xs tabular-nums text-ink-faint">
                  {count} {count === 1 ? "entry" : "entries"}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{cat.tagline}</p>
              <span className="mt-3 inline-block text-sm text-seal opacity-0 transition-opacity group-hover:opacity-100">
                Browse →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
