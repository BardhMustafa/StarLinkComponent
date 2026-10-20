export const CATEGORY_SLUGS = [
  "semiconductors",
  "passives",
  "connectors",
  "electromechanical",
  "obsolete-eol",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

/** Message key for each category (messages.categories.<key>). */
export const CATEGORY_KEY = {
  semiconductors: "semiconductors",
  passives: "passives",
  connectors: "connectors",
  electromechanical: "electromechanical",
  "obsolete-eol": "obsolete",
} as const satisfies Record<CategorySlug, string>;

/**
 * Product lines listed under each family. Keys point at messages.products.<key>.
 * Connectors and Electromechanical have no product copy yet (see CONTENT_TODO).
 */
export const CATEGORY_PRODUCTS = {
  semiconductors: [
    "microcontrollers",
    "integratedCircuits",
    "memory",
    "transistors",
    "diodes",
    "voltageRegulators",
  ],
  passives: ["capacitors", "resistors", "inductors"],
  connectors: [],
  electromechanical: [],
  "obsolete-eol": [],
} as const satisfies Record<CategorySlug, readonly string[]>;

export function isCategorySlug(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(value);
}
