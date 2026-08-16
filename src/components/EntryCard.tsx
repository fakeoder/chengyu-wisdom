import { Link } from "react-router-dom";
import type { ChengyuEntry } from "../types";
import { getCategoryById } from "../data";
import { getEntryImage } from "../data/images";
import SealMark from "./SealMark";
import EntryImage from "./EntryImage";

export default function EntryCard({ entry }: { entry: ChengyuEntry }) {
  const hasImage = Boolean(getEntryImage(entry.img));
  return (
    <Link
      to={`/idiom/${entry.id}`}
      className="group flex flex-col border border-paper-edge bg-paper-deep/40 transition-all hover:-translate-y-0.5 hover:border-seal/50 hover:bg-paper-deep"
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <SealMark char={entry.idiom[0]} size="sm" title={entry.idiom} />
          <div>
            <h3 className="font-cn text-xl font-semibold text-ink">{entry.idiom}</h3>
            <p className="text-xs text-ink-faint">{entry.pinyin}</p>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {entry.core_meaning_en}
        </p>
        {hasImage && (
          <div className="mt-4 border border-paper-edge">
            <EntryImage entry={entry} className="aspect-[3/2]" />
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-paper-edge px-2.5 py-0.5 text-[11px] text-ink-soft"
            >
              {getCategoryById(tag)?.label ?? tag}
            </span>
          ))}
        </div>
        <span className="mt-3 text-sm text-seal opacity-0 transition-opacity group-hover:opacity-100">
          Read the story →
        </span>
      </div>
    </Link>
  );
}
