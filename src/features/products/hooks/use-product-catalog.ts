"use client";

import { useMemo, useRef, useState } from "react";
import {
  getCheapestOption,
  getPlanOptions,
  usdToHalalas,
} from "@/features/installments";
import type { CatalogItem } from "../types";
import { filterByTitle } from "../utils/filter-by-title";
import { useProducts } from "./use-products";

/**
 * Everything the list page needs: fetch state, search state and per-product
 * amounts. Search lives in component state, so a refresh clears it.
 */
export function useProductCatalog() {
  const { data, status, isFetching, refetch } = useProducts();
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Fixed for the page's lifetime so amounts don't shift if midnight passes.
  const [today] = useState(() => new Date());

  const items = useMemo<CatalogItem[]>(
    () =>
      (data ?? []).map((product) => ({
        product,
        price: usdToHalalas(product.price),
        cheapestMonthly:
          getCheapestOption(getPlanOptions(product.price, today))?.plan
            .monthlyPayment ?? null,
      })),
    [data, today],
  );

  const results = useMemo(() => filterByTitle(items, query), [items, query]);

  // The "Clear search" button unmounts itself; move focus back to the
  // input so keyboard and screen-reader users aren't dropped to <body>.
  const clearSearch = () => {
    setQuery("");
    searchInputRef.current?.focus();
  };

  return {
    status,
    isFetching,
    retry: () => void refetch(),
    query,
    setQuery,
    clearSearch,
    searchInputRef,
    results,
  };
}
