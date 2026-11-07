import { DISPLAY_CURRENCY } from "@/shared/constants/locales";
import type { Formatters } from "@/shared/types";

/**
 * Builds Intl formatters once per locale (Intl constructors are relatively
 * expensive). Money arrives as integer halalas; dividing by 100 only happens
 * here, at the display edge, so no arithmetic is ever done on floats.
 */
export function createFormatters(intlLocale: string): Formatters {
  const currency = new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: DISPLAY_CURRENCY,
  });
  const number = new Intl.NumberFormat(intlLocale);
  const percent = new Intl.NumberFormat(intlLocale, {
    style: "percent",
    maximumFractionDigits: 2,
  });
  const date = new Intl.DateTimeFormat(intlLocale, { dateStyle: "long" });

  return {
    money: (halalas) => currency.format(halalas / 100),
    number: (value) => number.format(value),
    percent: (basisPoints) => percent.format(basisPoints / 10_000),
    date: (value) => date.format(value),
  };
}
