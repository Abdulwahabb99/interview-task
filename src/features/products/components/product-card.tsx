"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/shared/hooks/use-locale";
import type { ProductCardProps } from "../types";

export function ProductCard({ item }: ProductCardProps) {
  const { locale, t, format } = useLocale();
  const { product, price, cheapestMonthly } = item;

  return (
    <li>
      {/* One link per card: a single tab stop whose accessible name is the
          card's text (title, monthly price, full price). */}
      <Link
        href={`/${locale}/products/${product.id}`}
        className="group focus-visible:outline-ring flex h-full flex-col gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <div className="bg-card ring-border group-hover:ring-primary/40 relative aspect-square overflow-hidden rounded-lg ring-1 transition-shadow group-hover:ring-2">
          {/* Decorative here: the title right below names the product. */}
          <Image
            src={product.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
            className="object-contain p-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="line-clamp-2 text-sm leading-snug font-medium group-hover:underline">
            {product.title}
          </h2>
          {cheapestMonthly !== null ? (
            <p className="text-primary tabular text-lg font-semibold">
              {t.catalog.fromPerMonth(format.money(cheapestMonthly))}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              {t.catalog.notEligible}
            </p>
          )}
          <p className="text-muted-foreground tabular text-sm">
            {t.catalog.fullPrice} {format.money(price)}
          </p>
        </div>
      </Link>
    </li>
  );
}
