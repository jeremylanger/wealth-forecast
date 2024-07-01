import { NumberFormat } from "../../classes";
import type { Payment } from "../../types";

export const AccountPaymentRowMortgage = (props: Payment) => {
  const columns = 4;
  const widthPercent = 100 / columns;

  return (
    <>
      <div className="px-2" style={{ width: `${widthPercent}%` }}>
        {NumberFormat.addCommas(+props.interest.toFixed(0))}
      </div>
      <div className="px-2" style={{ width: `${widthPercent}%` }}>
        {NumberFormat.addCommas(+(props.principal ?? 0).toFixed(0))}
      </div>
      <div className="px-2" style={{ width: `${widthPercent}%` }}>
        {NumberFormat.addCommas(+(props.escrow ?? 0).toFixed(0))}
      </div>
      <div className="px-2" style={{ width: `${widthPercent}%` }}>
        {NumberFormat.addCommas(+props.balance.toFixed(0))}
      </div>
    </>
  );
};
