import { NumberFormat, Util } from '../classes';
import { Constants } from '../constants';
import { AllAccounts } from '../types';

export const NetWorthOverview = ({ accounts }: { accounts: AllAccounts[] }) => {
  const netWorthAtRetirement = Util.calculateNetWorth(
    accounts,
    Constants.BIRTH_MONTH,
    Constants.BIRTH_YEAR + Constants.RETIREMENT_AGE,
  );
  const netWorthAtEndOfLife = Util.calculateNetWorth(
    accounts,
    Constants.BIRTH_MONTH,
    Constants.BIRTH_YEAR + Constants.LIFE_EXPECTANCY,
  );

  return (
    <div className="flex space-x-16 h-screen items-center justify-center">
      <div className="inline-block">
        <div>Net worth at retirement</div>
        <div className="text-9xl">{NumberFormat.format(netWorthAtRetirement)}</div>
      </div>
      <div className="inline-block">
        <div>Net worth at life expectancy</div>
        <div className="text-9xl">{NumberFormat.format(netWorthAtEndOfLife)}</div>
      </div>
    </div>
  );
};
