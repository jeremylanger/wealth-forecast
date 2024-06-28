export class NumberFormat {
  static internationalNumberFormat = new Intl.NumberFormat('en-US');

  static addCommas = (value: number): string => this.toDollar(value, false);

  static toDollar = (value: number, dollar = true, precision = 0): string =>
    dollar
      ? `$${this.internationalNumberFormat.format(+value.toFixed(precision))}`
      : `${this.internationalNumberFormat.format(+value.toFixed(precision))}`;

  static format = (value: number, dollar = true): string => {
    let formatted: string = value.toString();

    if (value >= 10000000) {
      formatted = `${this.toDollar(value / 1000000, dollar, 1)}M`;
    } else if (value >= 1000000) {
      formatted = `${this.toDollar(value / 1000000, dollar, 2)}M`;
    } /* else if (value >= 1000) {
			formatted = `${this.toDollar((value / 1000), dollar, 2)}K`;
		}*/ else {
      formatted = this.toDollar(Math.floor(value), dollar);
    }

    return `${formatted}`;
  };
}
