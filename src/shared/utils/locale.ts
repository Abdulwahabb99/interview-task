import { LOCALES } from "@/shared/constants/locales";
import type { Locale } from "@/shared/types";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getOtherLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}

/** Swaps the leading locale segment: `/en/products/3` → `/ar/products/3`. */
export function switchLocaleInPath(pathname: string, locale: Locale): string {
  return pathname.replace(/^\/[^/]+/, `/${locale}`);
}
