import type { CatalogItem } from "../types";

/**
 * Case-insensitive substring match on the product title. A blank query
 * returns everything.
 */
export function filterByTitle(
  items: CatalogItem[],
  query: string,
): CatalogItem[] {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return items;
  return items.filter((item) =>
    item.product.title.toLocaleLowerCase().includes(needle),
  );
}
