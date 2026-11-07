import { describe, expect, it } from "vitest";
import { getCheapestOption, getPlanOptions } from "../utils/plan-options";

const START = new Date(2026, 10, 6);
const availableTerms = (priceUsd: number) =>
  getPlanOptions(priceUsd, START)
    .filter((option) => option.available)
    .map((option) => option.term);

describe("getPlanOptions", () => {
  it("always returns all four terms in order", () => {
    expect(getPlanOptions(9.99, START).map((o) => o.term)).toEqual([
      4, 6, 9, 12,
    ]);
  });

  it.each([
    [19.99, []],
    [20, [4]],
    [49.99, [4]],
    [50, [4, 6]],
    [149.99, [4, 6]],
    [150, [4, 6, 9]],
    [299.99, [4, 6, 9]],
    [300, [4, 6, 9, 12]],
  ])("$%d qualifies for %j (minimum is inclusive)", (price, terms) => {
    expect(availableTerms(price)).toEqual(terms);
  });

  it("gives unavailable terms their minimum price in SAR", () => {
    const options = getPlanOptions(9.99, START);
    expect(options.map((o) => (o.available ? null : o.minimumPrice))).toEqual([
      7_500, 18_750, 56_250, 112_500,
    ]);
  });
});

describe("getCheapestOption", () => {
  it("picks the lowest monthly payment among available plans", () => {
    const cheapest = getCheapestOption(getPlanOptions(1899.99, START));
    expect(cheapest?.term).toBe(12);
    expect(cheapest?.plan.monthlyPayment).toBe(64_125);
  });

  it("returns null when nothing qualifies", () => {
    expect(getCheapestOption(getPlanOptions(9.99, START))).toBeNull();
  });
});
