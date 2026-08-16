import type { ChengyuEntry } from "../types";
import { getEntryImage } from "../data/images";

interface EntryImageProps {
  entry: ChengyuEntry;
  /** Fixed aspect ratio, e.g. "aspect-[3/2]" */
  className?: string;
  eager?: boolean;
}

/**
 * Idiom artwork, bundled from src/assets/idioms/ (see data/images.ts).
 * Renders nothing when the entry has no image — callers should gate the
 * surrounding block on getEntryImage() so no empty frame is left behind.
 */
export default function EntryImage({ entry, className = "", eager = false }: EntryImageProps) {
  const src = getEntryImage(entry.img);
  if (!src) return null;

  return (
    <img
      src={src}
      alt={`${entry.idiom} — ${entry.pinyin}`}
      loading={eager ? "eager" : "lazy"}
      className={`w-full object-cover ${className}`}
    />
  );
}
