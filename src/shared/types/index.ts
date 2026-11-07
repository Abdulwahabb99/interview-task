import type { ReactNode } from "react";

export type Locale = "en" | "ar";

export type Direction = "ltr" | "rtl";

export type LocaleConfig = {
  dir: Direction;
  /** BCP 47 tag handed to Intl — pins the Gregorian calendar for Arabic. */
  intlLocale: string;
  /** Language name in its own script, used by the language switch. */
  nativeName: string;
};

/** Locale-bound formatters. All money is passed in minor units (halalas). */
export type Formatters = {
  money: (halalas: number) => string;
  number: (value: number) => string;
  percent: (basisPoints: number) => string;
  date: (date: Date) => string;
};

export type Dictionary = {
  meta: { title: string; description: string };
  header: { brand: string; homeLink: string };
  catalog: {
    heading: string;
    intro: string;
    searchLabel: string;
    searchPlaceholder: string;
    resultsCount: (count: number, formatted: string) => string;
    loading: string;
    errorTitle: string;
    errorDescription: string;
    retry: string;
    emptyTitle: string;
    emptyDescription: (query: string) => string;
    clearSearch: string;
    fromPerMonth: (amount: string) => string;
    notEligible: string;
    fullPrice: string;
  };
  plan: {
    back: string;
    selectorLegend: string;
    months: (count: number, formatted: string) => string;
    perMonth: (amount: string) => string;
    unavailable: (minimum: string) => string;
    noPlans: string;
    monthlyPayment: string;
    productPrice: string;
    serviceFee: (rate: string) => string;
    totalPayable: string;
    scheduleHeading: string;
    installment: (index: string) => string;
    dueToday: string;
    dueOn: (date: string) => string;
    roundingNote: string;
    notFoundTitle: string;
    notFoundDescription: string;
    loading: string;
    errorTitle: string;
  };
};

export type LocaleContextValue = {
  locale: Locale;
  dir: Direction;
  t: Dictionary;
  format: Formatters;
};

export type LocaleProviderProps = Readonly<{
  locale: Locale;
  children: ReactNode;
}>;
