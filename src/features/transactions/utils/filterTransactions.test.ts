import { describe, it, expect } from "vitest";
import { filterTransactionsByLabel } from "./filterTransactions";
import type { Transaction } from "../types";
/**
 * Unit tests for the pure filtering logic (no React involved).
 */

const mockTransactions: Transaction[] = [
  {
    paymentId: "1",
    receiverFirstname: "EDF",
    receiverLastname: null,
    transactionType: "lydia_transaction",
    memberId: 1,
    label: "Facture EDF",
    firstname: "Alice",
    lastname: "Durand",
    amount: "50 €",
    date: 1,
    statusErrorDisplay: "",
    status: "completed",
  },
  {
    paymentId: "2",
    receiverFirstname: "Carrefour",
    receiverLastname: null,
    transactionType: "lydia_transaction",
    memberId: 2,
    label: "Courses Carrefour",
    firstname: "Bob",
    lastname: "Martin",
    amount: "30 €",
    date: 2,
    statusErrorDisplay: "",
    status: "completed",
  },
];

describe("filterTransactionsByLabel", () => {
  it("filters by label (case-insensitive)", () => {
    const result = filterTransactionsByLabel(mockTransactions, "edf");
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("Facture EDF");
  });

  it("returns all transactions when query is empty", () => {
    const result = filterTransactionsByLabel(mockTransactions, "");
    expect(result).toHaveLength(2);
  });

  it("returns empty array when no match", () => {
    const result = filterTransactionsByLabel(mockTransactions, "amazon");
    expect(result).toHaveLength(0);
  });
});
