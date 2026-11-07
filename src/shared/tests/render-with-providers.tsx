import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { LocaleProvider } from "@/shared/components/layout/locale-provider";
import type { Locale } from "@/shared/types";

/**
 * Renders with the same providers as the app. A fresh QueryClient per test
 * keeps cache from leaking between tests; retries are off (or instant where
 * a hook sets its own retry policy) so error states appear immediately.
 */
export function renderWithProviders(ui: ReactElement, locale: Locale = "en") {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, retryDelay: 0 } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <LocaleProvider locale={locale}>{ui}</LocaleProvider>
    </QueryClientProvider>,
  );
}
