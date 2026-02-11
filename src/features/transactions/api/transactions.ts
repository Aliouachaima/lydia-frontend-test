import type { Transaction } from "../types";

/**
 * Fetch transactions from:
 * 1) Remote URL (VITE_TRANSACTIONS_URL) if available
 * 2) Local public file (/transactions.json) as fallback
 */

const REMOTE_URL = import.meta.env.VITE_TRANSACTIONS_URL as string | undefined;

async function fetchFrom(url: string): Promise<Transaction[]> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid JSON format");
  }

  return data as Transaction[];
}

export async function fetchTransactions(): Promise<Transaction[]> {
  // Try remote URL first
  if (REMOTE_URL) {
    try {
      return await fetchFrom(REMOTE_URL);
    } catch {
      console.warn("Remote fetch failed, falling back to local JSON...");
    }
  }

  // Fallback to local public file
  return fetchFrom("/transactions.json");
}
