import type { Ref } from "react";
import type { z } from "zod";
import type {
  productDetailsSchema,
  productSchema,
} from "../api/product-schema";

export type Product = z.infer<typeof productSchema>;

export type ProductDetails = z.infer<typeof productDetailsSchema>;

/** A product plus the amounts the list shows, all in halalas. */
export type CatalogItem = {
  product: Product;
  price: number;
  /** Lowest monthly payment across available plans; null if none qualify. */
  cheapestMonthly: number | null;
};

export type ProductCardProps = Readonly<{ item: CatalogItem }>;

export type ProductSearchProps = Readonly<{
  query: string;
  onQueryChange: (query: string) => void;
  /** Shown (and announced) once products have loaded. */
  resultCount: number | null;
  inputRef: Ref<HTMLInputElement>;
}>;

export type LoadErrorProps = Readonly<{
  title: string;
  onRetry: () => void;
  isRetrying: boolean;
}>;

export type EmptyResultsProps = Readonly<{
  query: string;
  onClear: () => void;
}>;

export type ProductPlanViewProps = Readonly<{ id: string }>;

export type ProductHeaderProps = Readonly<{ product: ProductDetails }>;
