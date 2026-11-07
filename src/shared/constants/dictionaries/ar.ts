import type { Dictionary } from "@/shared/types";

export const ar: Dictionary = {
  meta: {
    title: "تسوّق الآن وادفع شهريًا",
    description: "اعرف بالضبط ما ستدفعه كل شهر لأي منتج.",
  },
  header: { brand: "الدفع بالتقسيط", homeLink: "الدفع بالتقسيط، كل المنتجات" },
  catalog: {
    heading: "تسوّق الآن وادفع شهريًا",
    intro: "اختر منتجًا لترى بالضبط ما ستدفعه كل شهر.",
    searchLabel: "ابحث عن المنتجات بالاسم",
    searchPlaceholder: "مثال: أحمر شفاه",
    resultsCount: (_count, formatted) => `عدد المنتجات: ${formatted}`,
    loading: "جارٍ تحميل المنتجات",
    errorTitle: "تعذّر تحميل المنتجات",
    errorDescription: "تحقّق من اتصالك ثم حاول مرة أخرى.",
    retry: "حاول مرة أخرى",
    emptyTitle: "لا توجد منتجات مطابقة",
    emptyDescription: (query) =>
      `لا يوجد ما يطابق «${query}». جرّب اسمًا أقصر أو مختلفًا.`,
    clearSearch: "مسح البحث",
    fromPerMonth: (amount) => `ابتداءً من ${amount} شهريًا`,
    notEligible: "غير متاح بالتقسيط",
    fullPrice: "السعر الكامل",
  },
  plan: {
    back: "العودة إلى المنتجات",
    selectorLegend: "مدة السداد",
    // Arabic counted nouns: 3–10 take the plural (أشهر), 11+ the singular accusative (شهرًا).
    months: (count, formatted) =>
      count <= 10 ? `${formatted} أشهر` : `${formatted} شهرًا`,
    perMonth: (amount) => `${amount} شهريًا`,
    unavailable: (minimum) => `يتطلب سعرًا لا يقل عن ${minimum}`,
    noPlans: "سعر هذا المنتج أقل من الحد الأدنى للتقسيط.",
    monthlyPayment: "الدفعة الشهرية",
    productPrice: "سعر المنتج",
    serviceFee: (rate) => `رسوم الخدمة (${rate})`,
    totalPayable: "إجمالي المبلغ",
    scheduleHeading: "جدول الدفعات",
    installment: (index) => `الدفعة ${index}`,
    dueToday: "مستحقة اليوم",
    dueOn: (date) => `تستحق في ${date}`,
    roundingNote: "عُدّلت للتقريب ليطابق الإجمالي تمامًا",
    notFoundTitle: "المنتج غير موجود",
    notFoundDescription: "ربما أُزيل هذا المنتج. عُد لعرض جميع المنتجات.",
    loading: "جارٍ تحميل المنتج",
    errorTitle: "تعذّر تحميل هذا المنتج",
  },
};
