/**
 * Adds calendar months, clamping to the target month's last day
 * (Jan 31 + 1 month → Feb 28/29, not Mar 3). Always computed from the
 * original start date, so a short month doesn't drag later dates earlier.
 */
export function addMonthsClamped(start: Date, months: number): Date {
  const year = start.getFullYear();
  const month = start.getMonth() + months; // Date normalises month > 11
  const lastDayOfTargetMonth = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(start.getDate(), lastDayOfTargetMonth));
}

/** Local calendar date as YYYY-MM-DD, for `<time dateTime>`. */
export function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}
