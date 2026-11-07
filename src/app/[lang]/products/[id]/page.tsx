import { ProductPlanView } from "@/features/products";
import type { ProductPageProps } from "../../../types";

// Server shell: reads the route id and hands it to the client view, which
// fetches the product and owns the plan selection.
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductPlanView id={id} />;
}
