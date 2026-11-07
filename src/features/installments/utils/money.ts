import { SAR_PER_USD_X100 } from "./constants";

/**
 * Decimal amount → integer minor units. `Math.round` absorbs binary
 * floating-point error, e.g. 19.99 * 100 === 1998.9999999999998 → 1999.
 * This is the only place a float enters the money pipeline.
 */
export function toMinorUnits(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Integer division rounded half-up (non-negative integers only).
 * Exact for the magnitudes here (products stay far below 2^53).
 */
export function divideRoundHalfUp(numerator: number, denominator: number) {
  const quotient = Math.floor(numerator / denominator);
  const remainder = numerator - quotient * denominator;
  return remainder * 2 >= denominator ? quotient + 1 : quotient;
}

/** USD cents → SAR halalas at the fixed peg, rounded half-up once. */
export function usdCentsToHalalas(usdCents: number): number {
  return divideRoundHalfUp(usdCents * SAR_PER_USD_X100, 100);
}

/** USD price as delivered by the API → SAR halalas for display. */
export function usdToHalalas(usd: number): number {
  return usdCentsToHalalas(toMinorUnits(usd));
}
