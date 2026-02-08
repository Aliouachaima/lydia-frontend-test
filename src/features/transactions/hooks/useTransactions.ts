import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transactions";
import type { Transaction } from "../types";
/**
 * Custom hook to fetch transactions.
 */

export function useTransactions() {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 5 * 60 * 1000,
  });
}
