"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_CONFIG } from "@/shared/constants/locales";
import { useLocale } from "@/shared/hooks/use-locale";
import { getOtherLocale, switchLocaleInPath } from "@/shared/utils/locale";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, t } = useLocale();
  const otherLocale = getOtherLocale(locale);

  return (
    <header className="border-border bg-card border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          aria-label={t.header.homeLink}
          className="focus-visible:outline-ring rounded-sm text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {t.header.brand}
        </Link>
        {/* Named in its own language and tagged with `lang`, so screen
            readers pronounce it correctly. */}
        <Link
          href={switchLocaleInPath(pathname, otherLocale)}
          lang={otherLocale}
          hrefLang={otherLocale}
          className="text-primary focus-visible:outline-ring rounded-md px-3 py-1.5 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {LOCALE_CONFIG[otherLocale].nativeName}
        </Link>
      </div>
    </header>
  );
}
