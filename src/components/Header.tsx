import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories, getRandomEntry } from "../data";
import SealMark from "./SealMark";
import ThemeToggle from "./ThemeToggle";

function RandomButton({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        navigate(`/idiom/${getRandomEntry().id}`);
        onNavigate?.();
      }}
      className="flex min-h-11 cursor-pointer items-center border border-seal bg-paper px-4 py-2 text-sm font-medium tracking-wide text-seal transition-colors hover:bg-seal hover:text-paper"
    >
      Random Idiom
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-edge bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <SealMark char="慧" size="md" title="Chengyu Wisdom" />
          <span className="leading-tight">
            <span className="block font-serif text-base font-bold tracking-tight text-ink sm:text-lg">
              Chengyu Wisdom
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.2em] text-ink-faint sm:block">
              Wisdom in Four Characters
            </span>
          </span>
        </Link>

        <nav ref={navRef} className="flex items-center gap-2 sm:gap-4" aria-label="Primary">
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="true"
              className="flex min-h-11 cursor-pointer items-center gap-1 px-2 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Categories
              <svg
                className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-1 w-64 border border-paper-edge bg-paper py-1 shadow-lg">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
                  >
                    <span className="font-medium text-ink">{cat.label}</span>
                    <span className="block text-xs text-ink-faint">{cat.tagline}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <RandomButton onNavigate={() => setOpen(false)} />
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile category strip */}
      <div className="scrollbar-none overflow-x-auto border-t border-paper-edge px-4 py-2 md:hidden">
        <div className="flex gap-1">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="flex min-h-9 shrink-0 items-center whitespace-nowrap rounded-full border border-paper-edge px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-seal hover:text-seal"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
