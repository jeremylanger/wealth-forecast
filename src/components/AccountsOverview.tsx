import { NumberFormat } from "../classes";
import { AccountSubtype, type AllAccounts, type Mortgage } from "../types";

export const AccountsOverview = ({ accounts }: { accounts: AllAccounts[] }) => (
  <div className="h-screen flex items-center justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 ">
      {accounts.map((x) => (
        <div key={`${x.type}-${x.subtype}-${x.name}`} className="inline-block text-xl space-y-4">
          <div className="text-3xl text-left underline underline-offset-4 mb-8">{x.name}</div>
          <div className="flex">
            <span className="w-1/2 text-left">Interest rate</span>
            <span className="w-1/2 text-right">{+(x.interestRate * 100).toFixed(2)}%</span>
          </div>
          <div className="flex">
            <span className="w-1/2 text-left">Starting balance</span>
            <span className="w-1/2 text-right">{NumberFormat.toDollar(x.balance)}</span>
          </div>
          {x.subtype === AccountSubtype.mortgage ? (
            <>
              <div className="flex">
                <span className="w-1/2 text-left">Principal</span>
                <span className="w-1/2 text-right">{NumberFormat.toDollar((x as Mortgage).principal)}</span>
              </div>
              <div className="flex">
                <span className="w-1/2 text-left">Escrow</span>
                <span className="w-1/2 text-right">{NumberFormat.toDollar((x as Mortgage).escrow)}</span>
              </div>
            </>
          ) : (
            <div className="flex">
              <span className="w-1/2 text-left">Payment</span>
              <span className="w-1/2 text-right font-bold">{NumberFormat.toDollar(x.monthlyPayment)}/mo</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
