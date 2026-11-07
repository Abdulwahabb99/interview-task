import type { InstallmentPlan, PlanTerm } from "../types";
import { FEE_RATE_BPS } from "./constants";
import { divideRoundHalfUp } from "./money";
import { addMonthsClamped } from "./schedule";

/**
 * Pure installment calculation, in integer halalas throughout:
 *
 *   serviceFee     = price × feeRate(n)        (rounded half-up)
 *   totalPayable   = price + serviceFee
 *   monthlyPayment = totalPayable / n          (rounded half-up)
 *   last           = totalPayable − monthly × (n − 1)
 *
 * The last installment absorbs the rounding difference, so the schedule
 * always sums to exactly `totalPayable`. The first payment is due on
 * `startDate`, then one per calendar month.
 */
export function calculatePlan(
  priceHalalas: number,
  term: PlanTerm,
  startDate: Date,
): InstallmentPlan {
  const feeRateBps = FEE_RATE_BPS[term];
  const serviceFee = divideRoundHalfUp(priceHalalas * feeRateBps, 10_000);
  const totalPayable = priceHalalas + serviceFee;
  const monthlyPayment = divideRoundHalfUp(totalPayable, term);
  const lastPayment = totalPayable - monthlyPayment * (term - 1);

  const installments = Array.from({ length: term }, (_, index) => {
    const isLast = index === term - 1;
    return {
      number: index + 1,
      dueDate: addMonthsClamped(startDate, index),
      amount: isLast ? lastPayment : monthlyPayment,
      isAdjusted: isLast && lastPayment !== monthlyPayment,
    };
  });

  return {
    term,
    price: priceHalalas,
    feeRateBps,
    serviceFee,
    totalPayable,
    monthlyPayment,
    installments,
  };
}
