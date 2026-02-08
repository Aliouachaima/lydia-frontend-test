import type { Transaction } from "../types";
/**
 * Filters transactions based on their label (case-insensitive).
 *
 * @param transactions List of transactions to filter.
 * @param query Search query entered by the user.
 * @returns Filtered list while preserving the original order.
 */

export function filterTransactionsByLabel(
  transactions: Transaction[],
  query: string
): Transaction[] {
  const q = query.trim().toLowerCase();
  if (!q) return transactions;

  return transactions.filter((t) => t.label.toLowerCase().includes(q));
}
