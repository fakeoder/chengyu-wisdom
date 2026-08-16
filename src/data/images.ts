/**
 * Idiom artwork loader.
 *
 * Images live in src/assets/idioms/ and are named after the idiom's full
 * pinyin (e.g. saiwengshima.webp). They are imported at build time via
 * import.meta.glob — no runtime fetch, works on any static host.
 *
 * Drop a new WebP (or PNG, converted to WebP) into src/assets/idioms/ and
 * reference it by filename in the `img` field of entries.json; it is picked
 * up automatically.
 */
const idiomImages = import.meta.glob<string>("../assets/idioms/*.webp", {
  eager: true,
  import: "default",
});

const resolveKey = (filename: string) => `../assets/idioms/${filename}`;

/** Resolve an entry's img filename to its bundled asset URL ("" if missing). */
export function getEntryImage(filename: string | null | undefined): string {
  if (!filename) return "";
  return idiomImages[resolveKey(filename)] ?? "";
}

/** File basenames (e.g. "saiwengshima.webp") of every bundled idiom image. */
export function bundledIdiomImages(): string[] {
  return Object.keys(idiomImages).map((key) => key.split("/").pop() ?? "");
}
