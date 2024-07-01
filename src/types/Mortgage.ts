import type { Account } from "./Account";

export interface Mortgage extends Account {
  homeownersInsurance?: number;
  escrow: number;
  principal: number;
  propertyTaxes?: number;
}
