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
  address: string | null;
};

export const OFFICES: readonly Office[] = [
  {
    id: "ca",
    code: "CA",
    utc: "UTC−5",
    country: "CA",
    phone: { display: "+1 514 927 6023", tel: "+15149276023" },
    address: null,
  },
  { id: "de", code: "DE", utc: "UTC+1", country: "DE", phone: null, address: null },
  { id: "hk", code: "HK", utc: "UTC+8", country: "HK", phone: null, address: null },
];
