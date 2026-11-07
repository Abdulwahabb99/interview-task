import { describe, expect, it } from "vitest";
import {
  divideRoundHalfUp,
  toMinorUnits,
  usdCentsToHalalas,
} from "../utils/money";

describe("toMinorUnits", () => {
  it("absorbs binary floating-point error", () => {
    // Naive multiplication drifts: 19.99 * 100 === 1998.9999999999998
    expect(19.99 * 100).not.toBe(1999);
    expect(toMinorUnits(19.99)).toBe(1999);
    expect(toMinorUnits(4.35)).toBe(435);
    expect(toMinorUnits(1899.99)).toBe(189999);
  });
});

describe("divideRoundHalfUp", () => {
  it.each([
    [12, 4, 3], // exact
    [13, 4, 3], // .25 rounds down
    [14, 4, 4], // .5 rounds up
    [15, 4, 4], // .75 rounds up
    [0, 7, 0],
  ])("%i / %i → %i", (numerator, denominator, expected) => {
    expect(divideRoundHalfUp(numerator, denominator)).toBe(expected);
  });
});

describe("usdCentsToHalalas", () => {
  it("converts at 3.75 SAR per USD", () => {
    expect(usdCentsToHalalas(2_000)).toBe(7_500); // $20 → SAR 75
    expect(usdCentsToHalalas(30_000)).toBe(112_500); // $300 → SAR 1,125
  });

  it("rounds sub-halala results half-up", () => {
    expect(usdCentsToHalalas(999)).toBe(3_746); // 3746.25 → 3746
    expect(usdCentsToHalalas(2)).toBe(8); // 7.5 → 8
  });
});
