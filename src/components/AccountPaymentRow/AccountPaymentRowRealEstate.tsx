import { NumberFormat } from '../../classes';
import type { Payment } from '../../types';

export const AccountPaymentRowRealEstate = (props: Payment) => {
  const columns = 2;
  const widthPercent = 100 / columns;

  return (
    <>
      <div className="px-2" style={{ width: `${widthPercent}%` }}>
        {NumberFormat.addCommas(+props.interest.toFixed(0))}
      </div>
      <div className="px-2" style={{ width: `${widthPercent}%` }}>
        {NumberFormat.addCommas(+props.balance.toFixed(0))}
      </div>
    </>
  );
};
