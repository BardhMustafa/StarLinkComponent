/**
 * Soft hyphens (U+00AD) for long display words that don't fit a 360px screen
 * at H1 size. Browsers without hyphenation dictionaries then break at a
 * sensible point ("Électro-/mécanique") instead of mid-syllable.
 */
const BREAKS: ReadonlyArray<[RegExp, string]> = [
  // `\b` is ASCII-only in JS, so anchor on start/whitespace to match "É".
  [/(^|\s)([ÉEée]lectro)(?=m)/g, "$1$2­"],
];

export function softHyphenate(text: string) {
  return BREAKS.reduce((out, [pattern, replacement]) => out.replace(pattern, replacement), text);
}
