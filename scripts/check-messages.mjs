// Fails if any messages/<locale>.json has keys missing or extra compared to en.json,
// or if ICU placeholders differ. Run: pnpm i18n:check
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(import.meta.dirname, "..", "messages");
const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, String(v)]],
  );
const args = (s) => [...s.matchAll(/\{(\w+)/g)].map((m) => m[1]).sort().join(",");

const base = new Map(flatten(JSON.parse(readFileSync(join(dir, "en.json"), "utf8"))));
let failed = false;

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "en.json")) {
  const other = new Map(flatten(JSON.parse(readFileSync(join(dir, file), "utf8"))));
  const missing = [...base.keys()].filter((k) => !other.has(k));
  const extra = [...other.keys()].filter((k) => !base.has(k));
  const badArgs = [...base.keys()].filter((k) => other.has(k) && args(base.get(k)) !== args(other.get(k)));
  const asciiQuote = [...other.entries()].filter(([, v]) => v.includes("'")).map(([k]) => k);

  for (const [label, keys] of [
    ["missing", missing],
    ["extra", extra],
    ["placeholder mismatch", badArgs],
    ["ASCII apostrophe (use ’ — ' is an ICU escape)", asciiQuote],
  ]) {
    if (keys.length) {
      failed = true;
      console.error(`${file}: ${label}:\n  ${keys.join("\n  ")}`);
    }
  }
}

const baseQuotes = [...base.entries()].filter(([, v]) => v.includes("'")).map(([k]) => k);
if (baseQuotes.length) {
  failed = true;
  console.error(`en.json: ASCII apostrophe (use ’):\n  ${baseQuotes.join("\n  ")}`);
}

if (failed) process.exit(1);
console.log(`messages OK (${base.size} keys)`);
