"use client";

import { DirectionProvider } from "@base-ui/react/direction-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LocaleProvider } from "@/shared/components/layout/locale-provider";
import { LOCALE_CONFIG } from "@/shared/constants/locales";
import type { ProvidersProps } from "./types";

export function Providers({ locale, children }: ProvidersProps) {
  // Created in state (not module scope) so each request/session gets its own
  // client — sharing one across requests on the server would leak data
  // between users.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* Base UI reads direction from context (arrow-key order in the radio
          group, etc.), not from the DOM `dir` attribute. */}
      <DirectionProvider direction={LOCALE_CONFIG[locale].dir}>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </DirectionProvider>
    </QueryClientProvider>
  );
}
