import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/render";
import userEvent from "@testing-library/user-event";
import { TransactionsPage } from "./TransactionsPage";

/**
 * UI tests using React Testing Library:
 * - Simulate user interaction with the search input.
 * - Ensure the rendered list updates based on the query.
 *
 * `useTransactions` is mocked to isolate the UI from network requests.
 */

vi.mock("./hooks/useTransactions", () => {
  return {
    useTransactions: () => ({
      isLoading: false,
      isError: false,
      error: null,
      data: [
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
          date: 1688072641,
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
          date: 1688069641,
          statusErrorDisplay: "",
          status: "pending",
        },
      ],
    }),
  };
});

describe("TransactionsPage (UI)", () => {
  it("filters transactions when typing in search (case-insensitive)", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransactionsPage />);

    // Ensure both items are visible initially
    expect(screen.getByText("Facture EDF")).toBeInTheDocument();
    expect(screen.getByText("Courses Carrefour")).toBeInTheDocument();

    // Type "edf" in the search input
    const input = screen.getByLabelText("Search transactions by label");
    await user.type(input, "edf");

    // EDF remains visible, Carrefour is filtered out
    expect(screen.getByText("Facture EDF")).toBeInTheDocument();
    expect(screen.queryByText("Courses Carrefour")).not.toBeInTheDocument();
  });

  it("shows empty state when no results", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransactionsPage />);

    const input = screen.getByLabelText("Search transactions by label");
    await user.type(input, "amazon");

    expect(screen.getByText("Aucun résultat")).toBeInTheDocument();
  });
});
