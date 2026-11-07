import { describe, expect, it } from "vitest";
import { LOCALE_CONFIG } from "@/shared/constants/locales";
import { createFormatters } from "@/shared/utils/format";
import { switchLocaleInPath } from "@/shared/utils/locale";

const en = createFormatters(LOCALE_CONFIG.en.intlLocale);
const ar = createFormatters(LOCALE_CONFIG.ar.intlLocale);
// Intl output contains invisible characters: bidi marks around Arabic
// currency and a no-break space after "SAR". Normalise them for asserts.
const clean = (value: string) =>
  value.replace(/[\u200E\u200F\u061C]/g, "").replace(/[\u00A0\u202F]/g, " ");

describe("createFormatters", () => {
  it("formats halalas as SAR with 2 decimals", () => {
    expect(clean(en.money(123_450))).toBe("SAR 1,234.50");
    expect(clean(ar.money(123_450))).toBe("١٬٢٣٤٫٥٠ ر.س.");
  });

  it("formats fee rates from basis points", () => {
    expect(en.percent(550)).toBe("5.5%");
    expect(en.percent(0)).toBe("0%");
  });

  it("uses the Gregorian calendar for Arabic dates", () => {
    const date = new Date(2026, 10, 6);
    expect(en.date(date)).toBe("November 6, 2026");
    expect(clean(ar.date(date))).toBe("٦ نوفمبر ٢٠٢٦");
  });
});

describe("switchLocaleInPath", () => {
  it("swaps only the leading locale segment", () => {
    expect(switchLocaleInPath("/en", "ar")).toBe("/ar");
    expect(switchLocaleInPath("/en/products/3", "ar")).toBe("/ar/products/3");
  });
});
