import type { Account as TypeAccount, AccountSubtype, AccountType } from '../types';
import { Account } from './Account';

export class RealEstate extends Account implements TypeAccount {
  constructor(name: string, balance: number, interestRate: number, type: AccountType, subtype: AccountSubtype) {
    super(name, balance, interestRate, interestRate, 0, type, subtype);
  }
}
