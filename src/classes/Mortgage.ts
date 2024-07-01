import type { AccountSubtype, AccountType, Mortgage as TypeMortgage, Payment } from "../types";
import { Account } from "./Account";

export class Mortgage extends Account implements TypeMortgage {
  principal: number;
  escrow: number;

  constructor(
    name: string,
    balance: number,
    interestRate: number,
    type: AccountType,
    subtype: AccountSubtype,
    principal: number,
    escrow = 0,
  ) {
    super(name, balance, interestRate, interestRate, principal + escrow, type, subtype);
    this.principal = principal;
    this.escrow = escrow;
  }

  getForeverMonthlyPayment = () => this.escrow;

  getPayment = (payment: number): Payment => {
    const interest = this.calculateInterest();

    const paymentTowardsEscrow = Math.min(payment, this.escrow);
    const paymentTowardsPrincipal = payment - paymentTowardsEscrow;

    const balance = this.getLatestBalance() - paymentTowardsPrincipal + interest;

    return {
      mode: this.mode,
      month: this.month,
      year: this.year,
      interest,
      payment,
      balance,
      escrow: paymentTowardsEscrow,
      principal: paymentTowardsPrincipal,
    };
  };
}
