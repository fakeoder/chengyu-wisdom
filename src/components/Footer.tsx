import { Link } from "react-router-dom";
import { categories } from "../data";
import SealMark from "./SealMark";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-paper-edge bg-paper-deep/60">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-[max(3rem,env(safe-area-inset-bottom))]">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <SealMark char="慧" size="sm" />
              <span className="font-serif text-base font-bold text-ink">Chengyu Wisdom</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              Classic four-character Chinese idioms as a gateway to traditional
              philosophy, mindset and values — for culture enthusiasts, not
              language learners.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Categories
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-sm text-ink-soft transition-colors hover:text-seal"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
              About
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              No grammar lessons, no HSK levels, no exercises — just the stories
              and the cultural insight behind them.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-paper-edge pt-5 text-xs text-ink-faint">
          © {new Date().getFullYear()} Chengyu Wisdom contributors. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
