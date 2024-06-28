import { useEffect, useRef, useState } from 'react';
import StickyEventListener from 'sticky-event-listener';

import { Account, AccountSubtype } from '../types';

interface Props extends Account {
  debug: boolean;
}

export const AccountHeader = (props: Props) => {
  const ref = useRef(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    // This is kind of a hacky solution - may want to refactor
    document.querySelectorAll('.sticker').forEach((sticker) => {
      new StickyEventListener(sticker);
      // This library does not have typescript support
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sticker.addEventListener('sticky', (event: any) => {
        setIsStuck(event.detail.stuck);
      });
    });
  }, [ref]);

  return (
    <div
      className={`sticker text-center font-gemunu-libre sticky top-0 z-20 backdrop-blur-lg ${
        isStuck ? 'bg-slate-900/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
      ref={ref}
    >
      <div className="p-2 text-2xl">{props.name}</div>
      <div className="p-2 text-sm">{(props.interestRate * 100).toFixed(2)}%</div>
      <div className="flex p-2">
        {props.debug && <div className="flex-auto p-2">Mode</div>}
        <div className="flex-auto p-2">Interest</div>
        {props.subtype === AccountSubtype.mortgage ? (
          <>
            <div className="flex-auto p-2">Principal</div>
            <div className="flex-auto p-2">Escrow</div>
          </>
        ) : (
          <div className="flex-auto p-2">Payment</div>
        )}
        <div className="flex-auto p-2">Balance</div>
      </div>
    </div>
  );
};
