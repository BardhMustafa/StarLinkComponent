export type OfficeId = "ca" | "de" | "hk";

export type Office = {
  id: OfficeId;
  code: string;
  /** Offset shown in the UI (standard time). */
  utc: string;
  /** ISO 3166-1 alpha-2, used in JSON-LD. */
  country: "CA" | "DE" | "HK";
  /** null = not known yet, rendered as a visible placeholder. */
  phone: { display: string; tel: string } | null;
  address: OfficeAddress | null;
};

export type OfficeAddress = {
  street: string;
  locality: string;
  /** Province / state code, if the country uses one. */
  region?: string;
  postalCode: string;
};

/** "Rue John Campbell, LaSalle, QC H8N 1C5" — country is shown separately. */
export function formatAddress(a: OfficeAddress) {
  return [a.street, a.locality, [a.region, a.postalCode].filter(Boolean).join(" ")].join(", ");
}

export const OFFICES: readonly Office[] = [
  {
    id: "ca",
    code: "CA",
    utc: "UTC−5",
    country: "CA",
    phone: { display: "+1 514 927 6023", tel: "+15149276023" },
    address: {
      street: "Rue John Campbell",
      locality: "LaSalle",
      region: "QC",
      postalCode: "H8N 1C5",
    },
  },
  { id: "de", code: "DE", utc: "UTC+1", country: "DE", phone: null, address: null },
  { id: "hk", code: "HK", utc: "UTC+8", country: "HK", phone: null, address: null },
];
