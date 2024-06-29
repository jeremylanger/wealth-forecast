import { Constants } from '../constants';
import { Account as TypeAccount, AccountSubtype, AccountType, MonthMode, Payment } from '../types';
import { Util } from './Util';

export class Account implements TypeAccount {
  balance: number;
  interestRate: number;
  interestRateRetirement: number;
  mode: MonthMode;
  month: number;
  monthlyPayment: number;
  name: string;
  payments: Array<Payment>;
  paymentsBreakdown: Array<Payment>;
  subtype: AccountSubtype;
  type: AccountType;
  year: number;

  constructor(
    name: string,
    balance: number,
    interestRate: number,
    interestRateRetirement: number,
    monthlyPayment: number,
    type: AccountType,
    subtype: AccountSubtype,
  ) {
    this.balance = balance;
    this.interestRate = interestRate;
    this.interestRateRetirement = interestRateRetirement;
    this.mode = MonthMode.base;
    this.month = Constants.START_MONTH;
    this.monthlyPayment = monthlyPayment;
    this.name = name;
    this.payments = [];
    this.paymentsBreakdown = [];
    this.subtype = subtype;
    this.type = type;
    this.year = Constants.START_YEAR;
  }

  getInterestRate = (): number =>
    Util.isRetirement(this.month, this.year) ? this.interestRateRetirement : this.interestRate;

  calculateInterest = (): number => (this.getInterestRate() / 12) * this.getLatestBalance();

  calculatePaymentAmount(cashLeft: number): number {
    if (this.mode === MonthMode.base) {
      if (this.type === AccountType.investment) {
        return 0;
      }

      return Math.min(
        cashLeft,
        this.monthlyPayment,
        this.getLatestBalance() + this.calculateInterest() + this.getForeverMonthlyPayment(),
      );
    } else if (this.mode === MonthMode.highestRate) {
      return cashLeft;
    }

    return 0;
  }

  calculatePaymentAmountFromBreakdown(): number {
    const payments = this.getBreakdownPayments();
    return payments.reduce((total, x) => total + x.payment, 0);
  }

  canWithdrawCash = (): boolean => this.type === AccountType.investment && this.subtype !== AccountSubtype.realEstate;

  getBalance = (month: number, year: number): number => {
    const amount = this.payments.find((x) => x.month === month && x.year === year)?.balance;

    if (!amount) return -1;

    return this.type === AccountType.investment ? amount : -amount;
  };

  getBreakdownPayments = () => this.paymentsBreakdown.filter((x) => x.month === this.month && x.year === this.year);

  getForeverMonthlyPayment = (): number => 0;

  getLatestBalance = (): number => this.getLatestPayment()?.balance ?? this.balance;

  getLatestPayment = (): Payment | null => (this.payments.length > 0 ? this.payments[this.payments.length - 1] : null);

  getLatestPaymentBreakdown = (): Payment | null =>
    this.paymentsBreakdown.length > 0 ? this.paymentsBreakdown[this.paymentsBreakdown.length - 1] : null;

  getPayment = (payment: number): Payment => {
    const interest = this.calculateInterest();

    const balance =
      this.type === AccountType.debt
        ? this.getLatestBalance() - payment + interest
        : this.getLatestBalance() + payment + interest;

    return {
      mode: this.mode,
      month: this.month,
      year: this.year,
      interest,
      payment,
      balance,
    };
  };
}
