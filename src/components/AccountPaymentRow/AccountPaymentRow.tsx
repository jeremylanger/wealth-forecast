import { NumberFormat } from '../../classes';
import { AccountSubtype, MonthModeHelper, type Payment } from '../../types';
import { AccountPaymentRowDefault, AccountPaymentRowMortgage, AccountPaymentRowRealEstate } from './';

interface Props extends Payment {
  accountName: string;
  breakdown: Payment[];
  subtype: AccountSubtype;
}

export const AccountPaymentRow = (props: Props) => {
  const subtypeComponentMap = {
    [AccountSubtype.emergencyFund]: AccountPaymentRowDefault,
    [AccountSubtype.basic]: AccountPaymentRowDefault,
    [AccountSubtype.mortgage]: AccountPaymentRowMortgage,
    [AccountSubtype.realEstate]: AccountPaymentRowRealEstate,
  };

  const RowComponent = subtypeComponentMap[props.subtype];

  return (
    <div className="relative">
      <div className="peer flex text-right h-8 pt-1.5 transition hover:bg-slate-700 px-2">
        <RowComponent {...props} />
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
