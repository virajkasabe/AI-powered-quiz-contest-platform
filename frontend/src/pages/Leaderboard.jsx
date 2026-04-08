import React from 'react';
import SidePromoCard from '../components/SidePromoCard';
import LeaderboardTable from '../components/LeaderboardTable';

const Leaderboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Leaderboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">See who is topping the charts today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard Table Area */}
        <div className="lg:col-span-2 flex flex-col h-fit">
          <LeaderboardTable />
        </div>

        <SidePromoCard />
      </div>
    </div>
  );
};

export default Leaderboard;
