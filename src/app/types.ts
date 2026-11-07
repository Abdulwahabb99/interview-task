import type { ReactNode } from "react";
import type { Locale } from "@/shared/types";

/** Raw route params: `lang` is validated against LOCALES before use. */
export type LangParams = Promise<{ lang: string }>;

export type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: LangParams;
}>;

/** Props for any page or metadata function directly under `[lang]`. */
export type LocaleRouteProps = Readonly<{ params: LangParams }>;

export type ProductPageProps = Readonly<{
  params: Promise<{ lang: string; id: string }>;
}>;

export type ProvidersProps = Readonly<{
  locale: Locale;
  children: ReactNode;
}>;
