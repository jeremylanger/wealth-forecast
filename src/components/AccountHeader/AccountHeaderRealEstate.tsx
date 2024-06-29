import { Account } from '../../types';

export const AccountHeaderRealEstate = (props: Account) => (
  <>
    <div className="p-2 text-2xl">{props.name}</div>
    <div className="p-2 text-sm">{(props.interestRate * 100).toFixed(2)}%</div>
    <div className="flex p-2">
      <div className="flex-auto p-2">Interest</div>
      <div className="flex-auto p-2">Value</div>
    </div>
  </>
);
