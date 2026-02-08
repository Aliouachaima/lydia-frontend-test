import { Box, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { TransactionCard } from "./components/TransactionCard";
import { TransactionDetailsModal } from "./components/TransactionDetailsModal";
import { SortSelect } from "./components/SortSelect";
import { useTransactions } from "./hooks/useTransactions";
import type { SortOrder, Transaction } from "./types";
import { filterTransactionsByLabel } from "./utils/filterTransactions";
import { sortByDateAsc, sortByDateDesc } from "./utils/sort";

/**
 * Transactions Page 
 *
 * - Retrieve transactions through `useTransactions` (TanStack Query).
 * - Manage local UI state for search (`query`) and sorting (`sortOrder`).
 * - Derive the displayed transactions list (sorting + filtering) with `useMemo`.
 *
 * Notes:
 * - `useMemo` avoids unnecessary recomputation when dependencies have not changed.
 * - `data-testid` attributes are used exclusively for stable E2E and component tests.
 */

export function TransactionsPage() {
  const { data, isLoading, isError, error } = useTransactions();

  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("date_desc");

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [openDetails, setOpenDetails] = useState(false);

  const filtered = useMemo(() => {
    const base = data ?? [];
    const sorted =
      sortOrder === "date_desc" ? sortByDateDesc(base) : sortByDateAsc(base);

    return filterTransactionsByLabel(sorted, query);
  }, [data, query, sortOrder]);

  return (
    <Box data-testid="transactions-page">
      <Heading size="2xl">Transactions</Heading>

      <Text mt={3} fontSize="sm" color="gray.600">
        {filtered.length} résultat(s)
      </Text>

      <Box mt={3}>
        <SortSelect value={sortOrder} onChange={setSortOrder} />
      </Box>

      <Box mt={5}>
        <SearchBar value={query} onChange={setQuery} />
      </Box>

      <Box mt={6}>
        {isLoading ? (
          <Stack gap={3} data-testid="loading">
            <Skeleton height="96px" borderRadius="xl" />
            <Skeleton height="96px" borderRadius="xl" />
            <Skeleton height="96px" borderRadius="xl" />
          </Stack>
        ) : isError ? (
          <Text color="red.600" data-testid="error">
            {(error as Error).message}
          </Text>
        ) : filtered.length === 0 ? (
          <Box
            data-testid="empty-state"
            borderWidth="1px"
            borderRadius="xl"
            p={8}
            bg="gray.50"
            textAlign="center"
          >
            <Text fontWeight="semibold">Aucun résultat</Text>
            <Text mt={2} color="gray.600">
              Essaie un autre mot-clé.
            </Text>
          </Box>
        ) : (
          <Stack gap={3} data-testid="transactions-list">
            {filtered.map((tx) => (
              <TransactionCard
                key={tx.paymentId}
                tx={tx}
                onOpenDetails={() => {
                  setSelectedTx(tx);
                  setOpenDetails(true);
                }}
              />
            ))}
          </Stack>
        )}
      </Box>

      <TransactionDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        tx={selectedTx}
      />
    </Box>
  );
}
