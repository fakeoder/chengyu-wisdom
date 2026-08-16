import { useNavigate } from "react-router-dom";
import { getRandomEntry } from "../data";
import SealMark from "./SealMark";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden border-b border-paper-edge">
      {/* Subtle oversized chengyu as background texture */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 select-none font-cn text-[8rem] leading-none text-paper-edge/70 sm:text-[16rem]"
      >
        慧
      </span>

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <SealMark char="慧" size="sm" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-seal">
              Chinese idioms · Cultural wisdom
            </span>
          </div>
          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Wisdom in Four Characters
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Every Chinese idiom is a compressed story. We unfold them — the
            origins, the drama, and above all the philosophy, values and
            mindset they carry from ancient China into the present.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex min-h-11 cursor-pointer items-center bg-ink px-6 py-3 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-seal"
            >
              Explore the Stories
            </button>
            <button
              type="button"
              onClick={() => navigate(`/idiom/${getRandomEntry().id}`)}
              className="flex min-h-11 cursor-pointer items-center border border-ink/30 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors hover:border-seal hover:text-seal"
            >
              Random Idiom →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
