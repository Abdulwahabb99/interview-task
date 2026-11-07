"use client";

import { skipToken, useQuery } from "@tanstack/react-query";
import { isNotFoundError } from "../api/api-error";
import { getProduct } from "../api/get-products";

/** Route ids are strings; only positive integers can be real products. */
function parseProductId(id: string): number | null {
  return /^[1-9]\d*$/.test(id) ? Number(id) : null;
}

export function useProduct(rawId: string) {
  const id = parseProductId(rawId);

  const query = useQuery({
    queryKey: ["products", id],
    // A malformed id can't exist — skip the request and show "not found".
    queryFn: id === null ? skipToken : ({ signal }) => getProduct(id, signal),
    // Retrying a 404 can't succeed; other errors get one retry.
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
  });

  return {
    product: query.data,
    isNotFound: id === null || isNotFoundError(query.error),
    isError: query.isError,
    isFetching: query.isFetching,
    retry: () => void query.refetch(),
  };
}
