/** BOM upload limits, shared by the console, the RFQ form and the server action. */
export const BOM_MAX_BYTES = 4 * 1024 * 1024;

export const BOM_EXTENSIONS = [".xlsx", ".xls", ".csv", ".pdf"] as const;

export const BOM_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
  "application/csv",
  "application/pdf",
] as const;

export const BOM_ACCEPT = [...BOM_EXTENSIONS, ...BOM_MIME_TYPES].join(",");

export function hasBomExtension(name: string) {
  const lower = name.toLowerCase();
  return BOM_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export type BomCheck = "ok" | "type" | "size";

export function checkBomFile(file: Pick<File, "name" | "size">): BomCheck {
  if (!hasBomExtension(file.name)) return "type";
  if (file.size > BOM_MAX_BYTES) return "size";
  return "ok";
}
