import { Util } from "../classes";
import { Constants } from "../constants";
import { accounts, events } from "../profile";
import { AccountSubtype, AccountType, type AllAccounts, MonthMode } from "../types";

const END_YEAR = Constants.BIRTH_YEAR + Constants.LIFE_EXPECTANCY;

let currentMonth = Constants.START_MONTH;
let currentYear = Constants.START_YEAR;

const getEventDiscretionary = (month: number, year: number): number =>
  events.reduce((total, event) => (event.isActive(month, year) ? total + event.getRelativeAmount() : total), 0);

const getBaseDiscretionary = () => accounts.reduce((total, account) => total + account.monthlyPayment, 0);

const getAllPaymentsForMonth = (discretionary: number): void => {
  const eventDiscretionary = getEventDiscretionary(currentMonth, currentYear);
  let cashLeftForMonth = discretionary + eventDiscretionary;
  let monthMode = MonthMode.base;
  while (monthMode !== MonthMode.done) {
    for (const account of accounts) {
      account.mode = monthMode;
      account.month = currentMonth;
      account.year = currentYear;

      const amount = account.calculatePaymentAmount(cashLeftForMonth);
      const payment = account.getPayment(amount);

      account.paymentsBreakdown.push(payment);
      cashLeftForMonth -= payment.payment;
    }

    monthMode++;
  }
};

const postPaymentsForMonth = (): void => {
  for (let i = 0; i < accounts.length; i++) {
    const amount = accounts[i].calculatePaymentAmountFromBreakdown();
    const payment = accounts[i].getPayment(amount);
    accounts[i].payments.push(payment);
  }
};

const getAvailableCash = (): number =>
  accounts.reduce((total, account) => total + (account.canWithdrawCash() ? account.getLatestBalance() : 0), 0);

const getRetirementWithdrawalAccountIndex = (): number =>
  accounts.findIndex((x) => x.type === AccountType.investment && x.subtype === AccountSubtype.basic);

// May end up merging this with "getAllPaymentsForMonth"
const getAllPaymentsForMonthInRetirement = (): void => {
  const eventDiscretionary = getEventDiscretionary(currentMonth, currentYear); // May need to rework this
  let availableCash = getAvailableCash() + eventDiscretionary;
  let monthMode = MonthMode.base;
  while (monthMode !== MonthMode.done) {
    for (let i = 0; i < accounts.length; i++) {
      accounts[i].mode = monthMode;
      accounts[i].month = currentMonth;
      accounts[i].year = currentYear;

      const amount = accounts[i].calculatePaymentAmount(availableCash);
      const payment = accounts[i].getPayment(amount);
      if (accounts[i].type === AccountType.debt && amount !== 0) {
        const withdrawalAccountIndex = getRetirementWithdrawalAccountIndex();
        if (withdrawalAccountIndex === -1) {
          throw new Error("Could not find retirement withdrawal account");
        }
        const latestPaymentAmount = accounts[withdrawalAccountIndex].getLatestPaymentBreakdown()?.payment ?? 0;
        const withdrawal = accounts[withdrawalAccountIndex].getPayment(latestPaymentAmount - amount);
        accounts[withdrawalAccountIndex].paymentsBreakdown.pop();
        accounts[withdrawalAccountIndex].paymentsBreakdown.push(withdrawal);
      }

      accounts[i].paymentsBreakdown.push(payment);
      availableCash -= payment.payment;
    }

    monthMode++;
    if (monthMode === MonthMode.highestRate) {
      monthMode++;
    }
  }
};

const incrementMonth = (): void => {
  if (currentMonth === 12) {
    currentMonth = 1;
    currentYear++;
  } else {
    currentMonth++;
  }
};

export const optimize = (): AllAccounts[] => {
  const discretionary = getBaseDiscretionary();
  while (currentYear < END_YEAR || (currentYear === END_YEAR && currentMonth <= Constants.START_MONTH)) {
    if (Util.isRetirement(currentMonth, currentYear)) {
      getAllPaymentsForMonthInRetirement();
    } else {
      getAllPaymentsForMonth(discretionary);
    }
    postPaymentsForMonth();
    // TODO: if cash balance is zero, show that we ran out of money before end of life

    incrementMonth();
  }

  return accounts;
};
