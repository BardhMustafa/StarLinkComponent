/**
 * Part search abstraction. Today there is no live stock feed, so every part is
 * "quote on request". To plug in a real stock API, implement PartSearchProvider
 * and swap `activeProvider` below — the UI only depends on this interface.
 */

export type StockStatus = "in-stock" | "limited" | "lead-time" | "quote-on-request";

export type PartResult = {
  /** Normalised manufacturer part number. */
  partNumber: string;
  manufacturer?: string;
  description?: string;
  status: StockStatus;
  /** Units available across hubs, when known. */
  quantityAvailable?: number;
  /** Hub codes holding stock, e.g. ["CA", "HK"]. */
  hubs?: string[];
  leadTimeDays?: number;
};

export type PartQuery = {
  partNumber: string;
  quantity?: number;
};

export interface PartSearchProvider {
  readonly id: string;
  search(query: PartQuery, options?: { signal?: AbortSignal }): Promise<PartResult[]>;
}

/** Characters that legitimately appear in manufacturer part numbers. */
export const PART_NUMBER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9\-/.#+,_ ]*$/;
export const PART_NUMBER_MAX = 64;

/** Trim, collapse whitespace and upper-case a part number. */
export function normalizePartNumber(input: string): string {
  return input.trim().replace(/\s+/g, " ").toUpperCase().slice(0, PART_NUMBER_MAX);
}

export function parseQuantity(input: string | number | null | undefined): number | undefined {
  if (input === null || input === undefined || input === "") return undefined;
  const n = typeof input === "number" ? input : Number(String(input).replace(/[\s,_]/g, ""));
  return Number.isFinite(n) && n >= 1 ? Math.min(Math.floor(n), 100_000_000) : undefined;
}

/** Default provider: no inventory feed yet, everything is quoted on request. */
const quoteOnRequestProvider: PartSearchProvider = {
  id: "quote-on-request",
  async search({ partNumber }) {
    const normalized = normalizePartNumber(partNumber);
    if (!normalized) return [];
    return [{ partNumber: normalized, status: "quote-on-request" }];
  },
};

export const activeProvider: PartSearchProvider = quoteOnRequestProvider;

export function searchParts(query: PartQuery, options?: { signal?: AbortSignal }) {
  return activeProvider.search(query, options);
}

/** Build the /rfq query string used by the console, ticker and example parts. */
export function rfqSearchParams(query: Partial<PartQuery> & { bom?: boolean }) {
  const params = new URLSearchParams();
  const part = query.partNumber ? normalizePartNumber(query.partNumber) : "";
  const qty = parseQuantity(query.quantity);
  if (part) params.set("part", part);
  if (qty) params.set("qty", String(qty));
  if (query.bom) params.set("bom", "1");
  return params;
}
