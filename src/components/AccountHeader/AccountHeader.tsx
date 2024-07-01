import { useEffect, useRef, useState } from 'react';
import StickyEventListener from 'sticky-event-listener';

import { type Account, AccountSubtype } from '../../types';
import { AccountHeaderDefault, AccountHeaderMortgage, AccountHeaderRealEstate } from '.';

export const AccountHeader = (props: Account) => {
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
  }, []);

  const subtypeComponentMap = {
    [AccountSubtype.emergencyFund]: AccountHeaderDefault,
    [AccountSubtype.basic]: AccountHeaderDefault,
    [AccountSubtype.mortgage]: AccountHeaderMortgage,
    [AccountSubtype.realEstate]: AccountHeaderRealEstate,
  };

  const HeaderComponent = subtypeComponentMap[props.subtype];

  return (
    <div
      className={`sticker text-center font-gemunu-libre sticky top-0 z-20 backdrop-blur-lg ${
        isStuck ? 'bg-slate-900/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
      ref={ref}
    >
      <HeaderComponent {...props} />
    </div>
  );
};
