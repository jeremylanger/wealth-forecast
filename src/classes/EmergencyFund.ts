import { type AccountSubtype, type AccountType, type EmergencyFund as TypeEmergencyFund, MonthMode } from "../types";
import { Account } from "./Account";

export class EmergencyFund extends Account implements TypeEmergencyFund {
  target: number;

  constructor(
    name: string,
    balance: number,
    interestRate: number,
    monthlyPayment: number,
    type: AccountType,
    subtype: AccountSubtype,
    target: number,
  ) {
    super(name, balance, interestRate, interestRate, monthlyPayment, type, subtype);
    this.target = target;
  }

  calculatePaymentAmount = (cashLeft: number): number => {
    let amount = 0;

    if (this.mode === MonthMode.emergencyFund) {
      amount = Math.min(cashLeft, this.target - this.getLatestBalance());
    }

    if (this.target === this.getLatestBalance()) {
      // console.log("EF hit target");
    }

    return amount;
  };
}
