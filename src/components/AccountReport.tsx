import { Account, Payment } from '../types';
import { AccountHeader } from './AccountHeader';
import { AccountPaymentRow } from './AccountPaymentRow';

interface Props extends Account {
  debug: boolean;
}

export const AccountReport = (props: Props) => {
  const getBreakdownPayments = (month: number, year: number): Array<Payment> =>
    props.paymentsBreakdown.filter((x) => x.month === month && x.year === year);

  return (
    <div className="inline-block align-top">
      <AccountHeader {...props} />
      <div className="fixed-width-font text-sm font-bold">
        {props.payments.map((x) => (
          <AccountPaymentRow
            key={`account-${props.name}-${x.month}-${x.year}`}
            accountName={props.name}
            debug={props.debug}
            {...x}
            subtype={props.subtype}
            breakdown={getBreakdownPayments(x.month, x.year)}
          />
        ))}
      </div>
    </div>
  );
};
