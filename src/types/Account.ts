import { AccountSubtype } from './AccountSubtype';
import { AccountType } from './AccountType';
import { Payment } from './Payment';

export interface Account {
  balance: number;
  interestRate: number;
  interestRateRetirement: number;
  month: number;
  monthlyPayment: number;
  name: string;
  payments: Array<Payment>;
  paymentsBreakdown: Array<Payment>;
  subtype: AccountSubtype;
  type: AccountType;
  year: number;
}
