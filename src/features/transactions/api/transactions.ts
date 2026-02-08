import type { Transaction } from "../types";

const URL = import.meta.env.VITE_TRANSACTIONS_URL as string | undefined;

export async function fetchTransactions(): Promise<Transaction[]> {
  if (!URL) throw new Error("Missing VITE_TRANSACTIONS_URL");

  const res = await fetch(URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Invalid JSON format");

  return data as Transaction[];
}
