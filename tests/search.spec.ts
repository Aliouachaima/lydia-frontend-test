import { test, expect, type Page } from "@playwright/test";
/**
 * E2E tests (Playwright):
 * - Runs the application in a real browser.
 * - Verifies overall behavior: search, empty state, and sorting.
 *
 * Note:
 * - The network request is mocked.
 */

const FIXTURE_TRANSACTIONS = [
  {
    paymentId: "1",
    receiverFirstname: "EDF",
    receiverLastname: null,
    transactionType: "lydia_transaction",
    memberId: 1,
    label: "Facture EDF",
    firstname: "Alice",
    lastname: "Durand",
    amount: "50,00 €",
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
    amount: "30,00 €",
    date: 1688069641, 
    statusErrorDisplay: "",
    status: "pending",
  },
  {
    paymentId: "3",
    receiverFirstname: "Orange",
    receiverLastname: null,
    transactionType: "lydia_transaction",
    memberId: 3,
    label: "Abonnement Orange",
    firstname: "Claire",
    lastname: "Petit",
    amount: "20,00 €",
    date: 1688065641, 
    statusErrorDisplay: "",
    status: "completed",
  },
];

async function mockTransactionsApi(page: Page) {
  // Intercepte le fetch vers l'URL contenant "transactions.json"
  await page.route("**/transactions.json**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify(FIXTURE_TRANSACTIONS),
    });
  });

  // si l'URL n'a pas "transactions.json" mais "file.notion.so"
  await page.route("**file.notion.so/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify(FIXTURE_TRANSACTIONS),
    });
  });
}

async function waitReady(page: Page) {
  await expect(page.getByTestId("transactions-page")).toBeVisible();
  // liste OU empty-state OU erreur
  await Promise.race([
    page.getByTestId("transactions-list").waitFor({ state: "visible", timeout: 20000 }),
    page.getByTestId("empty-state").waitFor({ state: "visible", timeout: 20000 }),
    page.getByTestId("error").waitFor({ state: "visible", timeout: 20000 }),
  ]);
}

test.describe("Transactions search & sort (E2E)", () => {
  test.beforeEach(async ({ page }) => {
    await mockTransactionsApi(page);
  });

  test("filters transactions by label (case-insensitive)", async ({ page }) => {
    await page.goto("/");
    await waitReady(page);

    const input = page.getByLabel("Search transactions by label");
    await input.fill("edf");

    await expect(page.getByText("Facture EDF")).toBeVisible();
    await expect(page.getByText("Courses Carrefour")).toHaveCount(0);
  });

  test("shows empty state when no result", async ({ page }) => {
    await page.goto("/");
    await waitReady(page);

    const input = page.getByLabel("Search transactions by label");
    await input.fill("zzzz-not-found");

    await expect(page.getByTestId("empty-state")).toBeVisible();
  });

  test("sort order changes the list (date desc/asc)", async ({ page }) => {
    await page.goto("/");
    await waitReady(page);

    await expect(page.locator('[data-testid="transaction-label"]').first()).toBeVisible();

    const firstLabelBefore = await page
      .locator('[data-testid="transaction-label"]')
      .first()
      .innerText();

    const sortSelect = page.getByLabel("Sort transactions by date");
    await sortSelect.selectOption("date_asc");

    const firstLabelAfter = await page
      .locator('[data-testid="transaction-label"]')
      .first()
      .innerText();

    expect(firstLabelAfter).not.toBe(firstLabelBefore);
  });
});
