import { Account as TypeAccount } from './Account';

export interface EmergencyFund extends TypeAccount {
  target: number;
}
