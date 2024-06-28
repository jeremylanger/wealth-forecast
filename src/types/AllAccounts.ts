import { Account } from '../classes/Account';
import { EmergencyFund } from '../classes/EmergencyFund';
import { Investment } from '../classes/Investment';
import { Mortgage } from '../classes/Mortgage';

export type AllAccounts = Account | Mortgage | EmergencyFund | Investment;
