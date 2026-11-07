import { describe, expect, it } from "vitest";
import { addMonthsClamped } from "../utils/schedule";

describe("addMonthsClamped", () => {
  it("clamps to the last day of shorter months", () => {
    const jan31 = new Date(2026, 0, 31);
    expect(addMonthsClamped(jan31, 1)).toEqual(new Date(2026, 1, 28));
    expect(addMonthsClamped(jan31, 3)).toEqual(new Date(2026, 3, 30));
  });

  it("keeps the original day after a short month", () => {
    // Anchored on the start date, so March is the 31st, not the 28th.
    expect(addMonthsClamped(new Date(2026, 0, 31), 2)).toEqual(
      new Date(2026, 2, 31),
    );
  });

  it("handles leap years", () => {
    expect(addMonthsClamped(new Date(2028, 0, 31), 1)).toEqual(
      new Date(2028, 1, 29),
    );
  });

  it("rolls over the year", () => {
    expect(addMonthsClamped(new Date(2026, 10, 30), 11)).toEqual(
      new Date(2027, 9, 30),
    );
  });
});
