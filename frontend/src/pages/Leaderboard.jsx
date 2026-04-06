import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SidePromoCard from '../components/SidePromoCard';
import LeaderboardTable from '../components/LeaderboardTable';

const Leaderboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-sky-50/50 dark:from-sky-950/20 to-transparent dark:to-slate-950 pointer-events-none transition-colors"></div>

        <Header />

        <main className="flex-1 overflow-auto p-8 z-10 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
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
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
