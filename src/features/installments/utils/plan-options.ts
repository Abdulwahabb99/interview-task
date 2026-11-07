import type { AvailablePlanOption, PlanOption, PlanTerm } from "../types";
import { calculatePlan } from "./calculate-plan";
import { MIN_PRICE_USD_CENTS, PLAN_TERMS } from "./constants";
import { toMinorUnits, usdCentsToHalalas } from "./money";

/** Inclusive: a price exactly at the minimum qualifies. Compared in cents. */
export function isTermEligible(priceUsdCents: number, term: PlanTerm) {
  return priceUsdCents >= MIN_PRICE_USD_CENTS[term];
}

/**
 * Every term for a product, available or not, so the UI can show
 * unavailable plans (disabled, with the minimum) instead of hiding them.
 * Eligibility is checked on the original USD price — that's where the
 * rules are defined — and amounts are converted to SAR once.
 */
export function getPlanOptions(
  priceUsd: number,
  startDate: Date,
): PlanOption[] {
  const priceUsdCents = toMinorUnits(priceUsd);
  const priceHalalas = usdCentsToHalalas(priceUsdCents);

  return PLAN_TERMS.map((term) =>
    isTermEligible(priceUsdCents, term)
      ? {
          term,
          available: true,
          plan: calculatePlan(priceHalalas, term, startDate),
        }
      : {
          term,
          available: false,
          minimumPrice: usdCentsToHalalas(MIN_PRICE_USD_CENTS[term]),
        },
  );
}

/** The plan with the lowest monthly payment, or null if none qualify. */
export function getCheapestOption(
  options: PlanOption[],
): AvailablePlanOption | null {
  let cheapest: AvailablePlanOption | null = null;
  for (const option of options) {
    if (
      option.available &&
      (!cheapest || option.plan.monthlyPayment < cheapest.plan.monthlyPayment)
    ) {
      cheapest = option;
    }
  }
  return cheapest;
}
