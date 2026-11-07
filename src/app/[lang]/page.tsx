import { ProductCatalog } from "@/features/products";

// Server component shell; the catalog itself is a client component because
// it owns search state and fetches through TanStack Query.
export default function ProductsPage() {
  return <ProductCatalog />;
}
