import { NumberFormat } from '../classes';
import { AccountSubtype, MonthModeHelper, Payment } from '../types';

interface Props extends Payment {
  accountName: string;
  breakdown: Payment[];
  debug: boolean;
  subtype: AccountSubtype;
}

export const AccountPaymentRow = (props: Props) => {
  let columns = 3;

  if (props.debug) {
    columns++;
  }

  if (props.subtype === AccountSubtype.mortgage) {
    columns++;
  }

  const widthPercent = 100 / columns;

  return (
    <div className="relative">
      <div className="peer flex text-right h-8 pt-1.5 transition hover:bg-slate-700 px-2">
        {props.debug && (
          <div className="px-2" style={{ width: `${widthPercent}%` }}>
            {props.mode}
          </div>
        )}
        <div className="px-2" style={{ width: `${widthPercent}%` }}>
          {NumberFormat.addCommas(+props.interest.toFixed(0))}
        </div>
        {props.subtype === AccountSubtype.mortgage ? (
          <>
            <div className="px-2" style={{ width: `${widthPercent}%` }}>
              {NumberFormat.addCommas(+(props.principal ?? 0).toFixed(0))}
            </div>
            <div className="px-2" style={{ width: `${widthPercent}%` }}>
              {NumberFormat.addCommas(+(props.escrow ?? 0).toFixed(0))}
            </div>
          </>
        ) : (
          <div className="px-2" style={{ width: `${widthPercent}%` }}>
            {NumberFormat.addCommas(+props.payment.toFixed(0))}
          </div>
        )}
        <div className="px-2" style={{ width: `${widthPercent}%` }}>
          {NumberFormat.addCommas(+props.balance.toFixed(0))}
        </div>
      </div>
      <div className="absolute hidden peer-hover:block z-10">
        {props.breakdown.map((x) => (
          <div
            key={`${props.accountName}-payment-${x.mode}-${x.year}-${x.month}`}
            className="flex space-x-2 p-2 bg-white text-black"
          >
            <div className="flex-auto text-left">{MonthModeHelper.getMonthModeName(x.mode)}:</div>
            <div className="flex-auto text-right">{NumberFormat.addCommas(+x.payment.toFixed(0))}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
