"use client";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useLocale } from "@/shared/hooks/use-locale";
import type { ProductSearchProps } from "../types";

export function ProductSearch({
  query,
  onQueryChange,
  resultCount,
  inputRef,
}: ProductSearchProps) {
  const { t, format } = useLocale();

  return (
    <div className="flex flex-col gap-2 sm:max-w-sm">
      <Label htmlFor="product-search">{t.catalog.searchLabel}</Label>
      <Input
        ref={inputRef}
        id="product-search"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={t.catalog.searchPlaceholder}
        aria-describedby="product-search-count"
        className="bg-card h-10"
      />
      {/* Polite live region: the count is read after typing pauses, not
          on every keystroke interrupting the user. */}
      <p
        id="product-search-count"
        aria-live="polite"
        className="text-muted-foreground min-h-5 text-sm"
      >
        {resultCount !== null &&
          t.catalog.resultsCount(resultCount, format.number(resultCount))}
      </p>
    </div>
  );
}
