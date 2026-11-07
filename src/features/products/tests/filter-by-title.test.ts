import { describe, expect, it } from "vitest";
import type { CatalogItem } from "../types";
import { filterByTitle } from "../utils/filter-by-title";
import { PRODUCTS } from "./fixtures";

const items: CatalogItem[] = PRODUCTS.map((product) => ({
  product,
  price: 0,
  cheapestMonthly: null,
}));
const titles = (result: CatalogItem[]) => result.map((i) => i.product.title);

describe("filterByTitle", () => {
  it("returns everything for a blank query", () => {
    expect(filterByTitle(items, "   ")).toHaveLength(3);
  });

  it("matches case-insensitively and ignores surrounding spaces", () => {
    expect(titles(filterByTitle(items, "  ck ONE "))).toEqual([
      "Calvin Klein CK One",
    ]);
  });

  it("matches anywhere in the title", () => {
    expect(titles(filterByTitle(items, "bed"))).toEqual([
      "Annibale Colombo Bed",
    ]);
  });

  it("returns nothing when no title matches", () => {
    expect(filterByTitle(items, "laptop")).toEqual([]);
  });
});
