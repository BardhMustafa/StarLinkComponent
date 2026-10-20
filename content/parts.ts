/** Example parts used in the ticker and the console's "recently requested" list. */
export const EXAMPLE_PARTS = [
  { part: "STM32F103C8T6", kind: "microcontroller" },
  { part: "LM317T", kind: "voltageRegulator" },
  { part: "GRM188R71H104KA93D", kind: "ceramicCapacitor" },
] as const;

export type TickerItem =
  { type: "part"; value: string } | { type: "category"; key: TickerCategory };

export type TickerCategory =
  "microcontrollers" | "capacitors" | "memory" | "connectors" | "diodes" | "regulators";

export const TICKER: readonly TickerItem[] = [
  { type: "category", key: "microcontrollers" },
  { type: "part", value: "STM32F103C8T6" },
  { type: "category", key: "capacitors" },
  { type: "part", value: "LM317T" },
  { type: "category", key: "memory" },
  { type: "part", value: "ATMEGA328P-AU" },
  { type: "category", key: "connectors" },
  { type: "part", value: "GRM188R71H104KA93D" },
  { type: "category", key: "diodes" },
  { type: "part", value: "1N4148W" },
  { type: "category", key: "regulators" },
  { type: "part", value: "NE555DR" },
];
