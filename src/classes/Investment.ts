import { Constants } from "../constants";
import { type Account as TypeAccount, MonthMode } from "../types";
import { Account } from "./Account";
import { Util } from "./Util";

export class Investment extends Account implements TypeAccount {
  calculatePaymentAmount = (cashLeft: number): number => {
    let amount = super.calculatePaymentAmount(cashLeft);

    if (this.mode === MonthMode.retirement && Util.isRetirement(this.month, this.year)) {
      // TODO: inflate this
      amount = -Math.min(Constants.RETIREMENT_MONTHLY_WITHDRAWAL, this.getLatestBalance());
    }

    return amount;
  };
}
