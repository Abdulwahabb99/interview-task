"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InstallmentPlanner } from "@/features/installments";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useLocale } from "@/shared/hooks/use-locale";
import { useProduct } from "../hooks/use-product";
import type { ProductPlanViewProps } from "../types";
import { ProductHeader } from "./product-header";
import { LoadError } from "./product-grid-states";

export function ProductPlanView({ id }: ProductPlanViewProps) {
  const { locale, t } = useLocale();
  const { product, isNotFound, isError, isFetching, retry } = useProduct(id);

  return (
    <div className="flex flex-col gap-8">
      <Link
        href={`/${locale}`}
        className="text-primary focus-visible:outline-ring inline-flex w-fit items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {/* Arrow points "back" in reading direction. */}
        <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
        {t.plan.back}
      </Link>

      {isNotFound ? (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{t.plan.notFoundTitle}</h1>
          <p className="text-muted-foreground">{t.plan.notFoundDescription}</p>
        </div>
      ) : isError ? (
        <LoadError
          title={t.plan.errorTitle}
          onRetry={retry}
          isRetrying={isFetching}
        />
      ) : !product ? (
        <div role="status" aria-busy="true">
          <span className="sr-only">{t.plan.loading}</span>
          <div
            aria-hidden="true"
            className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          <div className="bg-card ring-border relative aspect-square overflow-hidden rounded-xl ring-1 lg:sticky lg:top-6">
            <Image
              src={product.images[0] ?? product.thumbnail}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain p-6"
            />
          </div>
          <div className="flex flex-col gap-8">
            <ProductHeader product={product} />
            <InstallmentPlanner priceUsd={product.price} />
          </div>
        </div>
      )}
    </div>
  );
}
