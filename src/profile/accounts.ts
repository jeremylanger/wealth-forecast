import { Debt, EmergencyFund, Investment, Mortgage, RealEstate } from '../classes';
import { AccountSubtype, AccountType, AllAccounts } from '../types';

const sortByPaymentOrder = (a: AllAccounts, b: AllAccounts): number => {
  const subtypePriority: Record<AccountSubtype, number> = {
    [AccountSubtype.emergencyFund]: 1,
    [AccountSubtype.basic]: 2,
    [AccountSubtype.mortgage]: 3,
    [AccountSubtype.realEstate]: 4,
  };

  // Compare by subtype priority first
  const priorityComparison = subtypePriority[a.subtype] - subtypePriority[b.subtype];
  if (priorityComparison !== 0) {
    return priorityComparison;
  }

  // If subtypes are the same, sort by interest rate descending
  return b.interestRate - a.interestRate;
};

export const accounts: AllAccounts[] = [
  new EmergencyFund(
    'Emergency fund / savings',
    0,
    0,
    1200,
    AccountType.investment,
    AccountSubtype.emergencyFund,
    30000,
  ),
  new Investment('Investments', 0, 0.07, 0.03, 300, AccountType.investment, AccountSubtype.basic),
  new Debt('Car', 25000, 0.08, 0.08, 500, AccountType.debt, AccountSubtype.basic),
  new Mortgage('Mortgage', 400000, 0.045, AccountType.debt, AccountSubtype.mortgage, 2026, 500),
  new RealEstate('House', 480000, 0.05, AccountType.investment, AccountSubtype.realEstate),
].sort(sortByPaymentOrder);
