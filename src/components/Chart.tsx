import {
  CategoryScale,
  Chart as ChartJS,
  defaults,
  Legend,
  LinearScale,
  LineElement,
  LogarithmicScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

import { Account } from '../classes/Account';
import { Constants } from '../constants';
import { AccountSubtype, AccountType } from '../types';

const END_YEAR = Constants.BIRTH_YEAR + Constants.LIFE_EXPECTANCY;

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  accounts: Account[];
}

const trimEndZeros = (arr: number[]) => {
  let lastIndex = arr.length - 1;

  // Find the position of the last non-zero element
  while (lastIndex >= 0 && arr[lastIndex] === 0) {
    lastIndex--;
  }

  // If there were trailing zeros, retain one zero
  if (lastIndex < arr.length - 1) {
    lastIndex++;
  }

  return arr.slice(0, lastIndex + 1);
};

export const Chart = ({ accounts }: Props) => {
  const [isLogarithmic, setIsLogarithmic] = useState(false);

  const handleToggle = () => setIsLogarithmic((curr) => !curr);

  const generateLabels = (): string[] => {
    if (!accounts.length) return [''];

    const labels = [];
    for (let i = Constants.START_YEAR; i <= END_YEAR; i++) {
      labels.push(i.toString());
    }

    return labels;
  };

  const generateAmounts = (type?: AccountType, subtype?: AccountSubtype): number[] => {
    let filtered = accounts;
    if (type) {
      filtered = filtered.filter((x) => x.type === type);
    }
    if (subtype) {
      filtered = filtered.filter((x) => x.subtype === subtype);
    }
    if (!filtered.length) return [];

    let payment, amount;
    const amounts = [];
    for (let i = Constants.START_YEAR; i <= END_YEAR; i++) {
      amount = 0;
      for (let j = 0; j < filtered.length; j++) {
        if (filtered[j].payments.find((x) => x.year === i)) {
          payment = filtered[j].payments.find((x) => x.year === i && x.month === Constants.BIRTH_MONTH);
          if (!payment) {
            payment = filtered[j].payments[filtered[j].payments.length - 1];
          }
          amount += filtered[j].type === AccountType.investment ? payment.balance : -payment.balance;
        }
      }
      amounts.push(+amount.toFixed(0));
    }

    return trimEndZeros(amounts);
  };

  const labels = generateLabels();
  const netWorthAmounts = generateAmounts();
  const realEstateAmounts = generateAmounts(undefined, AccountSubtype.realEstate);
  const investmentAmounts = generateAmounts(AccountType.investment, AccountSubtype.basic);
  const debtAmounts = generateAmounts(AccountType.debt);

  const data = {
    labels,
    datasets: [
      {
        label: 'Net worth',
        data: labels.map((_, i) => netWorthAmounts[i]),
        borderColor: 'rgba(0, 255, 162, 0.5)',
        backgroundColor: 'rgba(0, 255, 162, 0.5)',
      },
      {
        label: 'Real estate',
        data: labels.map((_, i) => realEstateAmounts[i]),
        borderColor: 'rgba(255, 233, 0, 0.5)',
        backgroundColor: 'rgba(255, 233, 0, 0.5)',
      },
      {
        label: 'Investments',
        data: labels.map((_, i) => investmentAmounts[i]),
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
      {
        label: 'Debts',
        data: labels.map((_, i) => -debtAmounts[i]),
        borderColor: 'rgba(255, 0, 40, 0.5)',
        backgroundColor: 'rgba(255, 0, 40, 0.5)',
      },
    ],
  };

  defaults.font.family = 'Gemunu Libre';
  defaults.font.size = 16;
  defaults.color = '#ffffff88';

  // From StackOverflow: https://stackoverflow.com/a/74443361/1076872
  const plugin = {
    id: 'corsair',
    afterInit: (chart, args, opts) => {
      chart.corsair = {
        x: 0,
        y: 0,
      };
    },
    afterEvent: (chart, args) => {
      const { inChartArea } = args;
      const { type, x, y } = args.event;

      chart.corsair = { x, y, draw: inChartArea };
      chart.draw();
    },
    beforeDatasetsDraw: (chart, args, opts) => {
      const { ctx } = chart;
      const { top, bottom, left, right } = chart.chartArea;
      const { x, y, draw } = chart.corsair;
      if (!draw) return;

      ctx.save();

      ctx.beginPath();
      ctx.lineWidth = opts.width;
      ctx.strokeStyle = opts.color;
      ctx.setLineDash(opts.dash);
      ctx.moveTo(x, bottom);
      ctx.lineTo(x, top);
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
      ctx.stroke();

      ctx.restore();
    },
  };

  const options: any = {
    type: 'line',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Lifetime overview',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      corsair: {
        color: '#FFFFFF66',
        width: 1,
        dash: [3, 3],
      },
    },
    scales: {
      y: {
        type: isLogarithmic ? 'logarithmic' : 'linear',
      },
    },
  };

  return (
    <div className="w-full">
      <label className="cursor-pointer m-auto max-w-fit relative flex justify-center items-center p-2 text-xl">
        <input type="checkbox" className="peer appearance-none rounded-md" onChange={handleToggle} />
        <span className="w-11 h-6 flex mr-4 items-center flex-shrink-0 p-1 bg-white/50 rounded-full duration-300 ease-in-out peer-checked:bg-teal/90 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5" />
        <span className="text-white/80 peer-checked:text-teal/90">Logarithmic scale</span>
      </label>

      <Line options={options} data={data} plugins={[plugin]} />
    </div>
  );
};
