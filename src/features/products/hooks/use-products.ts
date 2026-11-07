"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/get-products";

export const productsQueryKey = ["products"] as const;

/** Shared by the list and the detail page, so both read one cache entry. */
export function useProducts() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: ({ signal }) => getProducts(signal),
  });
}
