"use client";

import { useLocale } from "@/shared/hooks/use-locale";
import { useProductCatalog } from "../hooks/use-product-catalog";
import { ProductCard } from "./product-card";
import {
  EmptyResults,
  LoadError,
  ProductGridSkeleton,
} from "./product-grid-states";
import { ProductSearch } from "./product-search";

export function ProductCatalog() {
  const { t } = useLocale();
  const catalog = useProductCatalog();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {t.catalog.heading}
        </h1>
        <p className="text-muted-foreground max-w-prose">{t.catalog.intro}</p>
      </header>

      <ProductSearch
        query={catalog.query}
        onQueryChange={catalog.setQuery}
        resultCount={
          catalog.status === "success" ? catalog.results.length : null
        }
        inputRef={catalog.searchInputRef}
      />

      {catalog.status === "pending" && <ProductGridSkeleton />}

      {catalog.status === "error" && (
        <LoadError
          title={t.catalog.errorTitle}
          onRetry={catalog.retry}
          isRetrying={catalog.isFetching}
        />
      )}

      {catalog.status === "success" &&
        (catalog.results.length === 0 ? (
          <EmptyResults query={catalog.query} onClear={catalog.clearSearch} />
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {catalog.results.map((item) => (
              <ProductCard key={item.product.id} item={item} />
            ))}
          </ul>
        ))}
    </div>
  );
}
