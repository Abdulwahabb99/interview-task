"use client";

import { createContext, useMemo } from "react";
import { DICTIONARIES } from "@/shared/constants/dictionaries";
import { LOCALE_CONFIG } from "@/shared/constants/locales";
import type { LocaleContextValue, LocaleProviderProps } from "@/shared/types";
import { createFormatters } from "@/shared/utils/format";

export const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Exposes the route's locale, its dictionary and Intl formatters to client
 * components. The locale comes from the URL segment, so nothing is stored.
 */
export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  const value = useMemo<LocaleContextValue>(() => {
    const { dir, intlLocale } = LOCALE_CONFIG[locale];
    return {
      locale,
      dir,
      t: DICTIONARIES[locale],
      format: createFormatters(intlLocale),
    };
  }, [locale]);

  return <LocaleContext value={value}>{children}</LocaleContext>;
}
