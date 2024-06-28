import { NumberFormat } from '../classes';
import { Constants } from '../constants';

const calculateYearDifference = (startMonth: number, startYear: number, endMonth: number, endYear: number): number => {
  let yearDifference = endYear - startYear;

  if (endMonth < startMonth) {
    yearDifference -= 1;
  }

  return yearDifference;
};

export const LifeOverview = () => {
  const currentAge = calculateYearDifference(
    Constants.BIRTH_MONTH,
    Constants.BIRTH_YEAR,
    Constants.START_MONTH,
    Constants.START_YEAR,
  );

  return (
    <div className="flex space-x-16 h-screen items-center justify-center">
      <div className="inline-block">
        <div>Current age</div>
        <div className="text-7xl">{currentAge}</div>
      </div>
      <div className="inline-block">
        <div>Retirement age</div>
        <div className="text-7xl">{Constants.RETIREMENT_AGE}</div>
      </div>
      <div className="inline-block">
        <div>Life expectancy</div>
        <div className="text-7xl">{Constants.LIFE_EXPECTANCY}</div>
      </div>
      <div className="inline-block">
        <div>Monthly retirement withdrawal</div>
        <div className="text-7xl">{NumberFormat.toDollar(Constants.RETIREMENT_MONTHLY_WITHDRAWAL)}</div>
      </div>
    </div>
  );
};
