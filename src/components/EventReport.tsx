import { events } from '../profile';
import { EventLine } from './EventLine';

export const EventReport = () => (
  <div className="inline-block align-top mr-4">
    {events.map((x) => (
      <EventLine key={x.name} {...x} />
    ))}
  </div>
);
