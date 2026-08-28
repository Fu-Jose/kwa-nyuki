const CURRENCY_SYMBOLS: Record<string, string> = { "€": "EUR", $: "USD", "£": "GBP" };

export type ParsedPrice = {
  /** Dot-decimal numeric value, e.g. "18.50" — for schema.org structured data. */
  value: string;
  /** The number as typed, e.g. "18,50" — for display, keeps the local decimal style. */
  displayValue: string;
  currency: string;
  symbol: string;
};

/**
 * Reads a free-text price field (the Sanity schema leaves it as plain text, so
 * editors can type "€18", "18€", "18,50", or just "18"). Assumes euros when no
 * currency symbol is present, since the shop only sells in EUR. Returns null
 * when the string doesn't actually contain a number (e.g. "su richiesta"), so
 * callers can fall back to showing it unchanged instead of mangling free text.
 */
export function parsePrice(raw: string): ParsedPrice | null {
  const match = raw.match(/([€$£])?\s*(\d+(?:[.,]\d+)?)\s*([€$£])?/);
  if (!match) return null;
  const symbol = match[1] || match[3] || "€";
  const displayValue = match[2];
  return {
    value: displayValue.replace(",", "."),
    displayValue,
    currency: CURRENCY_SYMBOLS[symbol] ?? "EUR",
    symbol,
  };
}

/** Formats a raw price field for display, e.g. "18" -> "18 €", "€18" -> "18 €". */
export function formatPrice(raw: string): string {
  const parsed = parsePrice(raw);
  return parsed ? `${parsed.displayValue} ${parsed.symbol}` : raw;
}
