/** Plan lengths offered, in months. */
export type PlanTerm = 4 | 6 | 9 | 12;

export type Installment = {
  /** 1-based position in the schedule. */
  number: number;
  dueDate: Date;
  /** Halalas (SAR minor units). */
  amount: number;
  /** True only for the last installment when it absorbs a rounding difference. */
  isAdjusted: boolean;
};

/** All amounts are integer halalas. */
export type InstallmentPlan = {
  term: PlanTerm;
  price: number;
  feeRateBps: number;
  serviceFee: number;
  totalPayable: number;
  /** The regular installment; the last one may differ by rounding. */
  monthlyPayment: number;
  installments: Installment[];
};

export type AvailablePlanOption = {
  term: PlanTerm;
  available: true;
  plan: InstallmentPlan;
};

export type UnavailablePlanOption = {
  term: PlanTerm;
  available: false;
  /** Minimum product price for this term, converted to halalas for display. */
  minimumPrice: number;
};

export type PlanOption = AvailablePlanOption | UnavailablePlanOption;

export type InstallmentPlannerProps = Readonly<{ priceUsd: number }>;

export type PlanSelectorProps = Readonly<{
  options: PlanOption[];
  selectedTerm: PlanTerm | null;
  onSelect: (term: PlanTerm) => void;
}>;

export type PlanSummaryProps = Readonly<{ plan: InstallmentPlan }>;

export type InstallmentScheduleProps = Readonly<{
  installments: Installment[];
}>;
