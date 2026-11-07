"use client";

import { useLocale } from "@/shared/hooks/use-locale";
import { cn } from "@/shared/utils/cn";
import type { InstallmentScheduleProps } from "../types";
import { toIsoDate } from "../utils/schedule";

/**
 * The schedule as a vertical rail: one stop per payment, today's filled.
 * An <ol> because order is the content; the rail is decoration.
 */
export function InstallmentSchedule({
  installments,
}: InstallmentScheduleProps) {
  const { t, format } = useLocale();

  return (
    <section aria-labelledby="schedule-heading" className="flex flex-col gap-4">
      <h2 id="schedule-heading" className="text-base font-semibold">
        {t.plan.scheduleHeading}
      </h2>
      <ol className="flex flex-col">
        {installments.map((installment, index) => (
          <li
            key={installment.number}
            className={cn(
              "relative grid grid-cols-[1fr_auto] items-baseline gap-x-4 ps-8 pb-6 last:pb-0",
              // Rail segment linking this stop to the next one.
              "before:bg-border before:absolute before:start-[7px] before:top-5 before:bottom-1 before:w-0.5 last:before:hidden",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "border-primary absolute start-0 top-1 size-4 rounded-full border-2",
                index === 0 ? "bg-primary" : "bg-card",
              )}
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">
                {t.plan.installment(format.number(installment.number))}
              </span>
              <time
                dateTime={toIsoDate(installment.dueDate)}
                className="text-muted-foreground text-sm"
              >
                {index === 0
                  ? t.plan.dueToday
                  : t.plan.dueOn(format.date(installment.dueDate))}
              </time>
              {installment.isAdjusted && (
                <span className="text-muted-foreground text-xs">
                  {t.plan.roundingNote}
                </span>
              )}
            </div>
            <span className="tabular font-semibold">
              {format.money(installment.amount)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
