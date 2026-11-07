"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useLocale } from "@/shared/hooks/use-locale";
import type { EmptyResultsProps, LoadErrorProps } from "../types";

const SKELETON_COUNT = 8;

export function ProductGridSkeleton() {
  const { t } = useLocale();
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">{t.catalog.loading}</span>
      <ul
        aria-hidden="true"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
      >
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <li key={index} className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Shared by the list and detail pages; `title` says what failed. */
export function LoadError({ title, onRetry, isRetrying }: LoadErrorProps) {
  const { t } = useLocale();
  return (
    <Alert variant="destructive" className="max-w-lg">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{t.catalog.errorDescription}</p>
        <Button
          variant="outline"
          className="mt-3"
          onClick={onRetry}
          disabled={isRetrying}
        >
          {t.catalog.retry}
        </Button>
      </AlertDescription>
    </Alert>
  );
}

export function EmptyResults({ query, onClear }: EmptyResultsProps) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col items-start gap-2 py-8">
      <h2 className="text-lg font-semibold">{t.catalog.emptyTitle}</h2>
      <p className="text-muted-foreground">
        {t.catalog.emptyDescription(query.trim())}
      </p>
      <Button variant="outline" className="mt-2" onClick={onClear}>
        {t.catalog.clearSearch}
      </Button>
    </div>
  );
}
