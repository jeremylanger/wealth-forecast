import { Account } from '../../types';

export const AccountHeaderMortgage = (props: Account) => (
  <>
    <div className="p-2 text-2xl">{props.name}</div>
    <div className="p-2 text-sm">{(props.interestRate * 100).toFixed(2)}%</div>
    <div className="flex p-2">
      <div className="flex-auto p-2">Interest</div>
      <div className="flex-auto p-2">Principal</div>
      <div className="flex-auto p-2">Escrow</div>
      <div className="flex-auto p-2">Balance</div>
    </div>
  </>
);
