"use client";

/**
 * Hands a BOM file picked in the hero console to the RFQ form on /rfq.
 * Lives in module scope, so it survives client-side navigation but never
 * leaves the browser tab.
 */
let pending: File | null = null;

export function setPendingBom(file: File | null) {
  pending = file;
}

export function takePendingBom(): File | null {
  const file = pending;
  pending = null;
  return file;
}
