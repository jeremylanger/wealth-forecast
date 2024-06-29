import { Account as TypeAccount, MonthMode } from '../types';
import { Account } from './Account';

export class Debt extends Account implements TypeAccount {
  calculatePaymentAmount(cashLeft: number): number {
    const minPayment = Math.min(
      cashLeft,
      this.monthlyPayment,
      this.getLatestBalance() + this.calculateInterest() + this.getForeverMonthlyPayment(),
    );

    if (this.mode === MonthMode.base) {
      if (cashLeft < this.monthlyPayment) {
        console.warn("Ruh roh, scoobs, you don't have enough cash left in the month to make your base debt payment.");
      }

      return minPayment;
    } else if (this.mode === MonthMode.highestRate) {
      const balanceAfterMinPayment = this.getLatestBalance() + this.calculateInterest() - minPayment;
      return Math.min(cashLeft, balanceAfterMinPayment);
    }

    return 0;
  }
}
