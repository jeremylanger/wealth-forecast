import { NumberFormat } from "../../classes";
import type { Payment } from "../../types";

export const AccountPaymentRowDefault = (props: Payment) => {
  const columns = 3;
  const widthPercent = 100 / columns;

  return (
    <>
      <div className="px-2" style={{ width: `${widthPercent}%` }}>
        {NumberFormat.addCommas(+props.interest.toFixed(0))}
      </div>
      <div className="px-2" style={{ width: `${widthPercent}%` }}>
        {NumberFormat.addCommas(+props.payment.toFixed(0))}
      </div>
      <div className="px-2" style={{ width: `${widthPercent}%` }}>
        {NumberFormat.addCommas(+props.balance.toFixed(0))}
      </div>
    </>
  );
};
