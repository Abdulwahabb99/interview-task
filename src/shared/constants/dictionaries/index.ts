import type { Dictionary, Locale } from "@/shared/types";
import { ar } from "./ar";
import { en } from "./en";

// Both dictionaries are small, so they're bundled statically rather than
// lazy-loaded per locale.
export const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };
