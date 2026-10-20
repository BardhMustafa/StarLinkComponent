export const SERVICES = [
  { key: "sourcing", code: "S—01" },
  { key: "inventory", code: "S—02" },
  { key: "obsolescence", code: "S—03" },
  { key: "jit", code: "S—04" },
] as const;

export type ServiceKey = (typeof SERVICES)[number]["key"];
