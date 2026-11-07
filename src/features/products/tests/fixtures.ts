import { LOCALE_CONFIG } from "@/shared/constants/locales";
import { createFormatters } from "@/shared/utils/format";
import type { Product, ProductDetails } from "../types";

const thumbnail =
  "https://cdn.dummyjson.com/product-images/test/thumbnail.webp";

/** Three price bands: no plans, 4 months only, all plans. */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    brand: "Essence",
    category: "beauty",
    price: 9.99,
    thumbnail,
  },
  {
    id: 6,
    title: "Calvin Klein CK One",
    brand: "Calvin Klein",
    category: "fragrances",
    price: 49.99,
    thumbnail,
  },
  {
    id: 11,
    title: "Annibale Colombo Bed",
    brand: "Annibale Colombo",
    category: "furniture",
    price: 1899.99,
    thumbnail,
  },
];

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function detailsOf(product: Product): ProductDetails {
  return {
    ...product,
    description: `About ${product.title}.`,
    images: [product.thumbnail],
  };
}

const formatters = createFormatters(LOCALE_CONFIG.en.intlLocale);

/**
 * English SAR amount as testing-library sees it: text matchers collapse
 * the no-break space Intl puts after "SAR", so do the same here.
 */
export const money = (halalas: number) =>
  formatters.money(halalas).replace(/\s/g, " ");
