import { Constants } from '../constants';
import type { AllAccounts } from '../types';

export class Util {
  static calculateNetWorth = (accounts: AllAccounts[], month: number, year: number): number =>
    accounts.reduce((total, account) => total + account.getBalance(month, year), 0);

  static isRetirement = (month?: number, year?: number): boolean => {
    if (!month || !year) return false;

    const retirementYear = Constants.RETIREMENT_AGE + Constants.BIRTH_YEAR;
    return year > retirementYear || (year === retirementYear && month >= Constants.BIRTH_MONTH);
  };
}
