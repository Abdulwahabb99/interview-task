"use client";

import { useLocale } from "@/shared/hooks/use-locale";
import { useInstallmentPlan } from "../hooks/use-installment-plan";
import type { InstallmentPlannerProps } from "../types";
import { InstallmentSchedule } from "./installment-schedule";
import { PlanSelector } from "./plan-selector";
import { PlanSummary } from "./plan-summary";

/** Plan picker + breakdown + schedule for one product price (USD). */
export function InstallmentPlanner({ priceUsd }: InstallmentPlannerProps) {
  const { t } = useLocale();
  const { options, selected, selectTerm } = useInstallmentPlan(priceUsd);

  return (
    <div className="flex flex-col gap-8">
      {!selected && (
        <p className="bg-muted rounded-lg p-4 text-sm">{t.plan.noPlans}</p>
      )}
      <PlanSelector
        options={options}
        selectedTerm={selected?.term ?? null}
        onSelect={selectTerm}
      />
      {selected && (
        <>
          <PlanSummary plan={selected.plan} />
          <InstallmentSchedule installments={selected.plan.installments} />
        </>
      )}
    </div>
  );
}
