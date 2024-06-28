import { Constants } from '../constants';
import Umbrella from '../images/umbrella-beach-solid.svg';

const END_YEAR = Constants.BIRTH_YEAR + Constants.LIFE_EXPECTANCY;

interface Row {
  age?: number;
  month: number;
  year: number;
  discretionaryDiff: number;
}

export const Sidebar = () => {
  const getAge = (month: number, year: number): number =>
    year - Constants.BIRTH_YEAR - 1 + Math.floor(month / Constants.BIRTH_MONTH);

  let month = Constants.START_MONTH;
  let year = Constants.START_YEAR;

  // Build data
  const agesAndYears: Row[] = [];
  while (year < END_YEAR || (year === END_YEAR && month <= Constants.START_MONTH)) {
    const age = month === Constants.BIRTH_MONTH ? getAge(month, year) : undefined;
    const discretionaryDiff = 0;

    agesAndYears.push({
      age,
      discretionaryDiff,
      month,
      year,
    });

    if (month === 12) {
      month = 1;
      year++;
    } else {
      month++;
    }
  }

  return (
    <div className="inline-block align-top mt-[9px] border border-transparent select-none">
      <div className="text-center">
        <div className="p-2">&nbsp;</div>
        <div className="p-2 text-xs">&nbsp;</div>
        <div className="flex p-2">
          <div className="flex-auto p-2">&nbsp;</div>
          <div className="flex-auto p-2">&nbsp;</div>
        </div>
      </div>
      <div className="fixed-width-font text-sm">
        {agesAndYears.map((x) => (
          <div key={`age-${x.month}-${x.year}`} className="h-8 pt-1.5 font-bold text-left">
            <div className={`${x.age && 'rounded-full bg-stone-100 text-slate-900'} inline-block py-0.5 px-2 mr-2`}>
              {x.age}
            </div>
            <div className={`${x.age && 'rounded-full bg-stone-100 text-slate-900'} inline-block py-0.5 px-2 mr-2`}>
              {x.age && x.year}
            </div>
            {x.age && x.age >= Constants.RETIREMENT_AGE && (
              <img src={Umbrella} alt="" className="h-6 inline-block align-top" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
