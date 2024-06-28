import { EventType } from '../types';

export class Event {
  amount: number;
  endMonth: number;
  endYear: number;
  name: string;
  recurring: boolean;
  startMonth: number;
  startYear: number;
  type: EventType;

  constructor(
    name: string,
    type: EventType,
    amount: number,
    recurring: boolean,
    startMonth: number,
    startYear: number,
    endMonth: number,
    endYear: number,
  ) {
    this.name = name;
    this.type = type;
    this.amount = amount;
    this.recurring = recurring;
    this.startMonth = startMonth;
    this.startYear = startYear;
    this.endMonth = endMonth;
    this.endYear = endYear;
  }

  getRelativeAmount = (): number => (this.type === EventType.income ? this.amount : -this.amount);

  hasNotEnded = (month: number, year: number): boolean =>
    year < this.endYear || (year === this.endYear && month < this.endMonth);

  isNowOrInTheFuture = (month: number, year: number): boolean =>
    year > this.startYear || (year === this.startYear && month >= this.startMonth);

  isActive = (month: number, year: number): boolean => {
    if (!this.recurring) {
      return this.startMonth === month && this.startYear === year;
    }
    return this.isNowOrInTheFuture(month, year) && this.hasNotEnded(month, year);
  };
}
