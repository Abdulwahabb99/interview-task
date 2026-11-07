import type { Dictionary } from "@/shared/types";

export const en: Dictionary = {
  meta: {
    title: "Shop now, pay monthly",
    description: "See exactly what you'll pay each month for any product.",
  },
  header: { brand: "Split payments", homeLink: "Split payments, all products" },
  catalog: {
    heading: "Shop now, pay monthly",
    intro: "Pick a product to see exactly what you'll pay each month.",
    searchLabel: "Search products by name",
    searchPlaceholder: "e.g. lipstick",
    resultsCount: (count, formatted) =>
      count === 1 ? "1 product" : `${formatted} products`,
    loading: "Loading products",
    errorTitle: "Products couldn't load",
    errorDescription: "Check your connection, then try again.",
    retry: "Try again",
    emptyTitle: "No matching products",
    emptyDescription: (query) =>
      `Nothing matches “${query}”. Try a shorter or different name.`,
    clearSearch: "Clear search",
    fromPerMonth: (amount) => `From ${amount}/mo`,
    notEligible: "Not available in installments",
    fullPrice: "Full price",
  },
  plan: {
    back: "Back to products",
    selectorLegend: "Pay over",
    months: (_count, formatted) => `${formatted} months`,
    perMonth: (amount) => `${amount}/mo`,
    unavailable: (minimum) => `Needs a price of ${minimum} or more`,
    noPlans: "This product is under the minimum price for installments.",
    monthlyPayment: "Monthly payment",
    productPrice: "Product price",
    serviceFee: (rate) => `Service fee (${rate})`,
    totalPayable: "Total to pay",
    scheduleHeading: "Payment schedule",
    installment: (index) => `Payment ${index}`,
    dueToday: "Due today",
    dueOn: (date) => `Due ${date}`,
    roundingNote: "Adjusted for rounding so the total is exact",
    notFoundTitle: "Product not found",
    notFoundDescription:
      "It may have been removed. Go back to see all products.",
    loading: "Loading product",
    errorTitle: "This product couldn't load",
  },
};
