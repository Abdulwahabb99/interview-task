import { describe, expect, it } from "vitest";
import { calculatePlan } from "../utils/calculate-plan";
import { PLAN_TERMS } from "../utils/constants";
import { toMinorUnits, usdCentsToHalalas } from "../utils/money";

const START = new Date(2026, 10, 6); // 6 Nov 2026
const sar = (usd: number) => usdCentsToHalalas(toMinorUnits(usd));
const sum = (amounts: number[]) => amounts.reduce((a, b) => a + b, 0);

describe("calculatePlan", () => {
  it("applies the fee rate for each term", () => {
    const price = 100_000; // SAR 1,000.00
    expect(calculatePlan(price, 4, START).serviceFee).toBe(0);
    expect(calculatePlan(price, 6, START).serviceFee).toBe(3_000);
    expect(calculatePlan(price, 9, START).serviceFee).toBe(5_500);
    expect(calculatePlan(price, 12, START).serviceFee).toBe(8_000);
  });

  it("splits an evenly divisible total with no adjustment", () => {
    const plan = calculatePlan(7_500, 4, START); // $20 → SAR 75.00

    expect(plan.totalPayable).toBe(7_500);
    expect(plan.monthlyPayment).toBe(1_875);
    expect(plan.installments.map((i) => i.amount)).toEqual([
      1_875, 1_875, 1_875, 1_875,
    ]);
    expect(plan.installments.some((i) => i.isAdjusted)).toBe(false);
  });

  it("puts the rounding difference on the last installment (rounded up)", () => {
    // $49.99 → SAR 187.46; 18746 / 4 = 4686.5 → 4687 × 3, last = 4685
    const plan = calculatePlan(sar(49.99), 4, START);

    expect(plan.totalPayable).toBe(18_746);
    expect(plan.monthlyPayment).toBe(4_687);
    expect(plan.installments.at(-1)).toMatchObject({
      amount: 4_685,
      isAdjusted: true,
    });
    expect(sum(plan.installments.map((i) => i.amount))).toBe(18_746);
  });

  it("puts the rounding difference on the last installment (rounded down)", () => {
    // $1,899.99 → SAR 7,124.96; 9 months at 5.5%
    // fee 39187.28 → 39187, total 751683, 751683 / 9 = 83520.33 → 83520
    const plan = calculatePlan(sar(1899.99), 9, START);

    expect(plan.serviceFee).toBe(39_187);
    expect(plan.totalPayable).toBe(751_683);
    expect(plan.monthlyPayment).toBe(83_520);
    expect(plan.installments.at(-1)?.amount).toBe(83_523);
    expect(sum(plan.installments.map((i) => i.amount))).toBe(751_683);
  });

  it("rounds the service fee half-up to the halala", () => {
    // $1,899.99 at 8%: 712496 × 0.08 = 56999.68 → 57000
    const plan = calculatePlan(sar(1899.99), 12, START);
    expect(plan.serviceFee).toBe(57_000);
    expect(plan.totalPayable).toBe(769_496);
  });

  it("always sums to exactly totalPayable", () => {
    // Every cent from $20.00 to $40.00, plus large prices, across all terms.
    const prices = [
      ...Array.from({ length: 2_001 }, (_, i) => 2_000 + i),
      189_999,
      249_999,
      1_000_001,
    ].map(usdCentsToHalalas);

    for (const price of prices) {
      for (const term of PLAN_TERMS) {
        const plan = calculatePlan(price, term, START);
        expect(sum(plan.installments.map((i) => i.amount))).toBe(
          plan.totalPayable,
        );
        expect(plan.installments.every((i) => Number.isInteger(i.amount))).toBe(
          true,
        );
      }
    }
  });

  it("schedules the first payment today, then monthly", () => {
    const plan = calculatePlan(7_500, 4, START);
    expect(plan.installments.map((i) => i.dueDate)).toEqual([
      new Date(2026, 10, 6),
      new Date(2026, 11, 6),
      new Date(2027, 0, 6),
      new Date(2027, 1, 6),
    ]);
    expect(plan.installments.map((i) => i.number)).toEqual([1, 2, 3, 4]);
  });
});
