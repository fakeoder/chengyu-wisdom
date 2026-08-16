import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { categories, getCategoryById, getEntriesByCategory } from "../data";
import EntryCard from "../components/EntryCard";

export default function CategoryPage() {
  const { categoryId = "" } = useParams();
  const category = getCategoryById(categoryId);
  const entries = getEntriesByCategory(categoryId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-serif text-2xl font-bold text-ink">Category not found</h1>
        <p className="mt-3 text-ink-soft">That category does not exist.</p>
        <Link to="/" className="mt-6 inline-block text-seal hover:underline">
          ← Back to home
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-paper-edge bg-paper-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-seal">
            Category
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {category.label}
          </h1>
          <p className="mt-3 max-w-xl text-ink-soft">{category.tagline}</p>
          <p className="mt-4 text-sm text-ink-faint">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-10">
        {entries.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-ink-soft">
            No entries yet in this category.
          </p>
        )}

        <div className="mt-14 border-t border-paper-edge pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-faint">
            Other categories
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories
              .filter((c) => c.id !== category.id)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/category/${c.id}`}
                  className="flex min-h-9 items-center rounded-full border border-paper-edge px-4 py-1.5 text-sm text-ink-soft transition-colors hover:border-seal hover:text-seal"
                >
                  {c.label}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
