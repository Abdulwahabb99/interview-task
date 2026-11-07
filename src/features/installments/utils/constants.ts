import type { PlanTerm } from "../types";

export const PLAN_TERMS: readonly PlanTerm[] = [4, 6, 9, 12];

/**
 * Service fee per term in basis points (1 bp = 0.01%), so 5.5% is the
 * integer 550 and fee maths never touches a fractional rate.
 */
export const FEE_RATE_BPS: Record<PlanTerm, number> = {
  4: 0,
  6: 300,
  9: 550,
  12: 800,
};

/** Minimum product price per term, in USD cents (prices arrive in USD). */
export const MIN_PRICE_USD_CENTS: Record<PlanTerm, number> = {
  4: 2_000,
  6: 5_000,
  9: 15_000,
  12: 30_000,
};

/** Fixed SAR/USD peg (3.75), scaled ×100 to stay an integer. */
export const SAR_PER_USD_X100 = 375;
