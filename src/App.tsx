import {
  AccountReport,
  AccountsOverview,
  Chart,
  EventReport,
  LifeOverview,
  NetWorthOverview,
  Sidebar,
} from './components';
import { optimize } from './core';

const optimizedAccounts = optimize();

const App = () => (
  <>
    <div className="bg-gradient-to-b from-slate-900 to-oxford-blue -z-10 fixed top-0 bottom-0 left-0 right-0" />
    <div className="text-center cursor-default text-teal selection:bg-stone-300 selection:text-slate-800">
      <div className="px-4 font-gemunu-libre">
        <LifeOverview />
        <AccountsOverview accounts={optimizedAccounts} />
        <div className="flex space-x-16 text-3xl h-screen items-center justify-center">
          <h1>Scroll to see your financial future...</h1>
        </div>
        <NetWorthOverview accounts={optimizedAccounts} />
      </div>
      <div className="flex h-screen items-center p-4">
        <Chart accounts={optimizedAccounts} />
      </div>
      <div className="inline-block space-x-4 p-4 m-auto">
        <EventReport />
        <Sidebar />
        {optimizedAccounts.map((x) => (
          <AccountReport key={x.name} {...x} />
        ))}
      </div>
    </div>
  </>
);

export default App;
