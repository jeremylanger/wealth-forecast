export enum MonthMode {
  base = 1,
  emergencyFund = 2,
  highestRate = 3,
  events = 4,
  retirement = 5,
  done = 6,
}

export class MonthModeHelper {
  static getMonthModeName(mode?: MonthMode) {
    switch (mode) {
      case MonthMode.base:
        return "Base";
      case MonthMode.done:
        return "Done";
      case MonthMode.emergencyFund:
        return "Emergency Fund";
      case MonthMode.events:
        return "Events";
      case MonthMode.highestRate:
        return "Highest Rate";
      case MonthMode.retirement:
        return "Retirement";
      default:
        return "";
    }
  }
}
