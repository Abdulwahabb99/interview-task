"use client";

import { useContext } from "react";
import { LocaleContext } from "@/shared/components/layout/locale-provider";
import type { LocaleContextValue } from "@/shared/types";

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used inside <LocaleProvider>.");
  }
  return value;
}
