"use client";

import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { useLocale } from "@/shared/hooks/use-locale";
import { cn } from "@/shared/utils/cn";
import type { PlanSelectorProps, PlanTerm } from "../types";

/**
 * Radio group of all terms. Unavailable terms stay visible but disabled,
 * with the reason linked via aria-describedby so screen readers announce
 * why. Arrow keys move between enabled options (Base UI, RTL-aware).
 */
export function PlanSelector({
  options,
  selectedTerm,
  onSelect,
}: PlanSelectorProps) {
  const { t, format } = useLocale();

  return (
    <section
      aria-labelledby="plan-selector-heading"
      className="flex flex-col gap-3"
    >
      <h2 id="plan-selector-heading" className="text-base font-semibold">
        {t.plan.selectorLegend}
      </h2>
      <RadioGroup
        aria-labelledby="plan-selector-heading"
        value={selectedTerm}
        onValueChange={(value: PlanTerm) => onSelect(value)}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {options.map((option) => {
          const reasonId = `plan-${option.term}-reason`;
          return (
            <label
              key={option.term}
              className={cn(
                "bg-card border-border flex min-h-24 flex-col justify-between gap-2 rounded-lg border p-3 transition-colors",
                "has-focus-visible:outline-ring has-focus-visible:outline-2 has-focus-visible:outline-offset-2",
                option.available
                  ? "hover:border-primary/60 has-data-checked:border-primary has-data-checked:bg-accent cursor-pointer"
                  : "hatch cursor-not-allowed",
              )}
            >
              <span className="flex items-center gap-2">
                <RadioGroupItem
                  value={option.term}
                  disabled={!option.available}
                  aria-describedby={option.available ? undefined : reasonId}
                />
                <span className="font-semibold">
                  {t.plan.months(option.term, format.number(option.term))}
                </span>
              </span>
              {option.available ? (
                <span className="tabular text-sm">
                  {t.plan.perMonth(format.money(option.plan.monthlyPayment))}
                </span>
              ) : (
                <span
                  id={reasonId}
                  className="text-muted-foreground bg-card/90 rounded-sm text-xs leading-snug"
                >
                  {t.plan.unavailable(format.money(option.minimumPrice))}
                </span>
              )}
            </label>
          );
        })}
      </RadioGroup>
    </section>
  );
}
