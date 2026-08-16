/**
 * Content validation script (design.md §8.3: "Content lives as JSON data files,
 * validated against the JSON Schema in §4").
 *
 * Runs on `npm run validate` and before every `npm run build`.
 * Exits non-zero on any error so broken content can never ship.
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Ajv from "ajv";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src", "data");
const idiomsDir = path.join(root, "src", "assets", "idioms");

const read = (p) =>
  readFile(path.join(dataDir, p), "utf8").then((t) => JSON.parse(t));

const errors = [];
const warnings = [];
const report = (msg) => {
  errors.push(msg);
  console.error(`  ✗ ${msg}`);
};
const warn = (msg) => {
  warnings.push(msg);
  console.warn(`  ⚠ ${msg}`);
};

const ajv = new Ajv({ allErrors: true, strict: false });

try {
  const [schema, categoriesSchema, entries, categories] = await Promise.all([
    read("schema.json"),
    read("category-schema.json"),
    read("entries.json"),
    read("categories.json"),
  ]);

  console.log("Validating content data files…");

  // 1. JSON Schema validation (Draft-07) — design.md §4
  const validateEntry = ajv.compile(schema);
  if (!Array.isArray(entries)) report("entries.json must be an array");
  else if (!entries.length) report("entries.json is empty");

  if (Array.isArray(entries)) {
    entries.forEach((entry, i) => {
      if (!validateEntry(entry)) {
        const label = entry?.idiom ?? `entry[${i}]`;
        report(
          `"${label}" fails schema: ${validateEntry.errors
            .map((e) => `${e.instancePath || "/"} ${e.message}`)
            .join("; ")}`,
        );
      }
    });
    // Artwork existence — advisory only; images are maintained by hand.
    entries.forEach((entry) => {
      if (!existsSync(path.join(idiomsDir, entry.img))) {
        warn(
          `"${entry.idiom}" references missing artwork: ${entry.img} — drop the file into src/assets/idioms/`,
        );
      }
    });
  }

  // 2. Entry IDs must be unique
  const ids = entries.map((e) => e.id);
  const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupIds.length) report(`duplicate entry id(s): ${[...new Set(dupIds)]}`);

  // 3. Categories must pass their own schema
  const validateCategory = ajv.compile(categoriesSchema);
  if (!Array.isArray(categories)) report("categories.json must be an array");
  else {
    categories.forEach((cat, i) => {
      if (!validateCategory(cat))
        report(
          `category[${i}] fails schema: ${validateCategory.errors
            .map((e) => `${e.instancePath || "/"} ${e.message}`)
            .join("; ")}`,
        );
    });
  }

  if (Array.isArray(categories) && Array.isArray(entries)) {
    const catIds = new Set(categories.map((c) => c.id));
    // 4. Every tag on an entry must be a known category (design.md §5.1: category filtering)
    entries.forEach((entry) => {
      entry.tags.forEach((tag) => {
        if (!catIds.has(tag))
          report(`"${entry.idiom}" uses unknown tag "${tag}"`);
      });
    });
    // 5. Exactly 9 cultural tag categories per design.md §5.1
    if (categories.length !== 9)
      report(`expected 9 categories, found ${categories.length}`);
    // 6. Every category must have at least one entry
    categories.forEach((cat) => {
      if (!entries.some((e) => e.tags.includes(cat.id)))
        report(`category "${cat.id}" (${cat.label}) has no entries`);
    });
    // 7. Enough entries to support a curated featured grid (design.md §5.1)
    if (entries.length < 9)
      report(`need at least 9 entries for the featured grid, found ${entries.length}`);
  }
} catch (err) {
  report(`could not read/parse data files: ${err.message}`);
}

if (errors.length) {
  console.error(`\nContent validation FAILED — ${errors.length} problem(s).`);
  process.exit(1);
}
if (warnings.length) {
  console.log(`\n${warnings.length} advisory warning(s) — see above.`);
}
console.log("Content validation passed ✓");
