"use client";

import { useMemo, useState } from "react";
import type { AvailablePlanOption, PlanTerm } from "../types";
import { getCheapestOption, getPlanOptions } from "../utils/plan-options";

/**
 * Plan options for a price plus the customer's selection. Selection is
 * plain component state, so a refresh resets it.
 */
export function useInstallmentPlan(priceUsd: number) {
  // Fixed for the page's lifetime: the schedule starts "today" as of when
  // the customer opened the page.
  const [today] = useState(() => new Date());
  const options = useMemo(
    () => getPlanOptions(priceUsd, today),
    [priceUsd, today],
  );
  const [chosenTerm, setChosenTerm] = useState<PlanTerm | null>(null);

  // Until the customer picks, show the cheapest plan — the one advertised
  // as "From …/mo" on the list — so the two numbers match.
  const selected =
    options.find(
      (option): option is AvailablePlanOption =>
        option.available && option.term === chosenTerm,
    ) ?? getCheapestOption(options);

  return { options, selected, selectTerm: setChosenTerm };
}
