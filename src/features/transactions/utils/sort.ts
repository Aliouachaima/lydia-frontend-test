import type { Transaction } from "../types";

export function sortByDateDesc(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => b.date - a.date);
}

export function sortByDateAsc(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => a.date - b.date);
}
