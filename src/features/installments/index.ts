// Public API of the installments feature. Other features import from here
// only, never from internal paths.
export { InstallmentPlanner } from "./components/installment-planner";
export { calculatePlan } from "./utils/calculate-plan";
export { usdToHalalas } from "./utils/money";
export { getCheapestOption, getPlanOptions } from "./utils/plan-options";
export type {
  AvailablePlanOption,
  Installment,
  InstallmentPlan,
  PlanOption,
  PlanTerm,
  UnavailablePlanOption,
} from "./types";
