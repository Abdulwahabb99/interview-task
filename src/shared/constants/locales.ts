import type { Locale, LocaleConfig } from "@/shared/types";

export const LOCALES: readonly Locale[] = ["en", "ar"];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
  en: { dir: "ltr", intlLocale: "en-SA", nativeName: "English" },
  // Browsers default ar-SA to the Umm al-Qura calendar; due dates are
  // Gregorian, so the calendar is pinned explicitly.
  ar: { dir: "rtl", intlLocale: "ar-SA-u-ca-gregory", nativeName: "العربية" },
};

/** Every amount shown to the customer is in Saudi riyals. */
export const DISPLAY_CURRENCY = "SAR";
