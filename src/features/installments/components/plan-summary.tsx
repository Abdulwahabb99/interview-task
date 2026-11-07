"use client";

import { useLocale } from "@/shared/hooks/use-locale";
import type { PlanSummaryProps } from "../types";

export function PlanSummary({ plan }: PlanSummaryProps) {
  const { t, format } = useLocale();

  return (
    <section
      aria-labelledby="plan-summary-heading"
      className="bg-card ring-border flex flex-col gap-5 rounded-xl p-5 ring-1"
    >
      {/* Atomic live region: switching plans announces
          "Monthly payment, SAR 641.25" as one phrase. */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="flex flex-col gap-1"
      >
        <h2 id="plan-summary-heading" className="text-muted-foreground text-sm">
          {t.plan.monthlyPayment}
        </h2>
        <p className="text-primary tabular text-4xl font-semibold tracking-tight">
          {format.money(plan.monthlyPayment)}
        </p>
      </div>

      <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-sm">
        <dt className="text-muted-foreground">{t.plan.productPrice}</dt>
        <dd className="tabular text-end">{format.money(plan.price)}</dd>

        <dt className="text-muted-foreground">
          {t.plan.serviceFee(format.percent(plan.feeRateBps))}
        </dt>
        <dd className="tabular text-end">{format.money(plan.serviceFee)}</dd>

        <dt className="border-border border-t pt-2 font-semibold">
          {t.plan.totalPayable}
        </dt>
        <dd className="border-border tabular border-t pt-2 text-end font-semibold">
          {format.money(plan.totalPayable)}
        </dd>
      </dl>
    </section>
  );
}
