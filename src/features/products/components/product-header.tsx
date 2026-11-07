"use client";

import { usdToHalalas } from "@/features/installments";
import { useLocale } from "@/shared/hooks/use-locale";
import type { ProductHeaderProps } from "../types";

export function ProductHeader({ product }: ProductHeaderProps) {
  const { t, format } = useLocale();

  return (
    <header className="flex flex-col gap-3">
      {product.brand && (
        <p className="text-muted-foreground text-sm">{product.brand}</p>
      )}
      <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {product.title}
      </h1>
      <p className="tabular text-lg">
        <span className="text-muted-foreground">{t.catalog.fullPrice} </span>
        {format.money(usdToHalalas(product.price))}
      </p>
      <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
        {product.description}
      </p>
    </header>
  );
}
