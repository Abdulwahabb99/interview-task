import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/shared/components/layout/site-header";
import { DICTIONARIES } from "@/shared/constants/dictionaries";
import { LOCALE_CONFIG, LOCALES } from "@/shared/constants/locales";
import { isLocale } from "@/shared/utils/locale";
import { Providers } from "../providers";
import type { LocaleLayoutProps, LocaleRouteProps } from "../types";
import "../globals.css";

// One variable family drawn for both Arabic and Latin, so both languages
// share the same voice and metrics.
const readex = Readex_Pro({
  variable: "--font-readex",
  subsets: ["latin", "arabic"],
});

// Only /en and /ar exist; any other first segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LocaleRouteProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { title, description } = DICTIONARIES[lang].meta;
  return { title, description };
}

/**
 * Root layout lives under [lang] so `<html lang dir>` is correct in the
 * server-rendered HTML — no LTR flash for Arabic, and screen readers pick
 * the right voice from the first paint.
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={LOCALE_CONFIG[lang].dir}
      className={`${readex.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers locale={lang}>
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
