import { type Event, NumberFormat } from '../classes';
import { Constants } from '../constants';
import { EventType } from '../types';

const Dot = ({ offset }: { offset?: number }) => (
  <div
    className="w-5 h-5 transition-all rounded-full bg-slate-400 group-hover:bg-slate-200"
    style={{ marginTop: `${offset}px` }}
  >
    &nbsp;
  </div>
);

const Line = ({ offset }: { offset: number }) => (
  <div
    className="w-0.5 transition-all bg-slate-500 group-hover:bg-slate-300 ml-[9px]"
    style={{ height: `${offset}px` }}
  />
);

export const EventLine = (event: Event) => {
  const getDiffInMonths = (m1: number, y1: number, m2?: number, y2?: number): number =>
    (m2 ?? m1) - m1 + 12 * ((y2 ?? y1) - y1);

  const accountHeaderHeight = 146;
  const pixelsPerMonth = 32;
  const startInMonths = getDiffInMonths(Constants.START_MONTH, Constants.START_YEAR, event.startMonth, event.startYear);
  const durationInMonths = getDiffInMonths(event.startMonth, event.startYear, event.endMonth, event.endYear);

  return (
    <div
      className="relative inline-block mr-2 align-top group cursor-pointer"
      style={{ marginTop: `${startInMonths * pixelsPerMonth + accountHeaderHeight}px` }}
    >
      <div className="transition-all text-left pointer-events-none opacity-0 group-hover:opacity-100 fixed top-1/2 ml-8 font-gemunu-libre bg-stone-100 z-10 text-slate-900 py-1 rounded px-2">
        <div>{event.name}</div>
        <div className={`${event.type === EventType.income ? 'text-teal-700' : 'text-red-500'} font-bold`}>
          {event.type === EventType.income ? '+' : '-'}
          {NumberFormat.toDollar(event.amount)}
          {event.recurring && '/mo'}
        </div>
        <div>
          {event.startMonth}/{event.startYear}
          {event.endMonth && event.endYear && (
            <span>
              {' '}
              - {event.endMonth}/{event.endYear}
            </span>
          )}
        </div>
      </div>
      <div className="absolute font-gemunu-libre inline-block pointer-events-none -left-28 -top-0.5 w-24 text-right">
        {event.type === EventType.income ? '+' : '-'}
        {NumberFormat.toDollar(event.amount)}
        {event.recurring && '/mo'}
      </div>
      <Dot />
      <Line offset={durationInMonths * pixelsPerMonth} />
      <Dot offset={-20} />
    </div>
  );
};
