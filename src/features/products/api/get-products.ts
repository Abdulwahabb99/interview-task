import type { Product, ProductDetails } from "../types";
import { ApiError } from "./api-error";
import { productDetailsSchema, productsResponseSchema } from "./product-schema";

const PRODUCTS_PAGE_SIZE = 20;

function productsUrl(): string {
  // Must be read as a literal `process.env.NEXT_PUBLIC_…` for Next.js to
  // inline it into the client bundle.
  const url = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_PRODUCTS_API_URL is not set. Copy .env.example to .env.",
    );
  }
  return url;
}

/**
 * GET + status check + JSON. `signal` comes from TanStack Query so a
 * request is cancelled when its query is no longer needed.
 */
async function getJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Request to ${url} failed with status ${response.status}`,
    );
  }
  return response.json();
}

/** GET /products?limit=20 */
export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const url = `${productsUrl()}?limit=${PRODUCTS_PAGE_SIZE}`;
  return productsResponseSchema.parse(await getJson(url, signal)).products;
}

/** GET /products/{id} — throws ApiError(404) for an unknown id. */
export async function getProduct(
  id: number,
  signal?: AbortSignal,
): Promise<ProductDetails> {
  const url = `${productsUrl()}/${id}`;
  return productDetailsSchema.parse(await getJson(url, signal));
}
