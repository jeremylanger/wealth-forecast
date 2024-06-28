import { Account, EmergencyFund, Investment, Mortgage, RealEstate } from '../classes';
import { AccountSubtype, AccountType, AllAccounts } from '../types';

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
  new Investment('Investments', 0, 0.07, 0.03, 0, AccountType.investment, AccountSubtype.basic),
  new Account('Car', 25000, 0.08, 0.08, 500, AccountType.debt, AccountSubtype.basic),
  new Mortgage('Mortgage', 400000, 0.045, AccountType.debt, AccountSubtype.mortgage, 2026, 500),
  new RealEstate('House', 480000, 0.05, AccountType.investment, AccountSubtype.realEstate),
];
