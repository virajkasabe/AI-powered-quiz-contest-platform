import React from 'react';
import SidePromoCard from '../components/SidePromoCard';
import LeaderboardTable from '../components/LeaderboardTable';

const AdminLeaderboard = () => {
  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 p-6 md:p-8 lg:p-10 transition-colors duration-300 animate-in fade-in space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent mb-2">
            Leaderboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Monitor intern rankings, quiz performance, and domain-wise standings.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Interns Ranked', value: '142', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-100 dark:bg-sky-500/10', border: 'border-sky-200/50 dark:border-sky-500/20', icon: 'M17 20h5V4H2v16h5m10 0v-6H7v6m10 0H7' },
            { label: 'Top Performer', value: 'Kelly Kapoor', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-500/10', border: 'border-amber-200/50 dark:border-amber-500/20', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
            { label: 'Average Score', value: '1,280', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/10', border: 'border-emerald-200/50 dark:border-emerald-500/20', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
            { label: 'Active Domains', value: '4', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-500/10', border: 'border-purple-200/50 dark:border-purple-500/20', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
          ].map((card, i) => (
            <div key={i} className={`bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border ${card.border} shadow-sm flex items-center gap-4 transition-colors`}>
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${card.bg}`}>
                  <svg className={`w-6 h-6 ${card.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon} />
                  </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{card.label}</p>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{card.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard Table Area */}
          <div className="lg:col-span-2 flex flex-col h-fit">
            <LeaderboardTable />
          </div>

          <div>
            <SidePromoCard />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLeaderboard;
