import { MonthMode } from './MonthMode';

export interface Payment {
  mode?: MonthMode;
  month: number;
  year: number;
  interest: number;
  payment: number;
  balance: number;
  principal?: number;
  escrow?: number;
}
