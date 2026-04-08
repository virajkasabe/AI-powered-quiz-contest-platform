import React, { useState } from 'react';
import SidePromoCard from '../components/SidePromoCard';
import LeaderboardTable from '../components/LeaderboardTable';

// Simulated current user session data
const CURRENT_INTERN = {
  name: 'Evan Wright',
  domain: 'Frontend',
  overallRank: 16,
  totalInterns: 245,
  domainRank: 4,
  domainInterns: 58,
  score: 1120
};

const InternDashboard = () => {
  const [activeTableConfig, setActiveTableConfig] = useState(null);

  const handleShowOverall = () => {
    setActiveTableConfig(prev => prev?.tab === 'overall' ? null : { tab: 'overall', domain: CURRENT_INTERN.domain });
  };

  const handleShowDomain = () => {
    setActiveTableConfig(prev => prev?.tab === 'domain' ? null : { tab: 'domain', domain: CURRENT_INTERN.domain });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">My Performance ✨</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Track your progress and rankings internally.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dashboard Main Metrics Area */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          
          {/* Ranking Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Ranking Card */}
            <div 
              onClick={handleShowOverall}
              className={`bg-white dark:bg-slate-900 rounded-2xl border ${activeTableConfig?.tab === 'overall' ? 'border-sky-500 shadow-md ring-2 ring-sky-500/20' : 'border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 dark:hover:border-slate-700'} p-8 relative overflow-hidden transition-all cursor-pointer group`}>
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-50 dark:bg-sky-900/10 rounded-full group-hover:scale-110 transition-transform blur-2xl"></div>
              <div className="flex justify-between items-start mb-6 align-top">
                <div className="w-14 h-14 xl:w-14 xl:h-14 lg:w-10 lg:h-10 rounded-2xl bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 flex justify-center items-center">
                  <svg className="w-7 h-7 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-sky-100 dark:border-sky-800/30">Across Platform</span>
              </div>
              <div>
                <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Overall Rank</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl lg:text-3xl font-black text-slate-800 dark:text-white">#{CURRENT_INTERN.overallRank}</span>
                  <span className="text-slate-400 font-medium">/ {CURRENT_INTERN.totalInterns}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
                 <span className="text-green-500 flex items-center font-bold text-xs lg:text-[10px] xl:text-xs">
                   <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                   Up 5
                 </span>
                 <span className="text-sky-500 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                   View Top 10 <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                 </span>
              </div>
            </div>

            {/* Domain Ranking Card */}
            <div 
              onClick={handleShowDomain}
              className={`bg-white dark:bg-slate-900 rounded-2xl border ${activeTableConfig?.tab === 'domain' ? 'border-sky-500 shadow-md ring-2 ring-sky-500/20' : 'border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 dark:hover:border-slate-700'} p-8 relative overflow-hidden transition-all cursor-pointer group`}>
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-50 dark:bg-sky-900/10 rounded-full group-hover:scale-110 transition-transform blur-2xl"></div>
               <div className="flex justify-between items-start mb-6 align-top">
                <div className="w-14 h-14 xl:w-14 xl:h-14 lg:w-10 lg:h-10 rounded-2xl bg-sky-50 dark:bg-sky-900/20 text-sky-500 dark:text-sky-400 border border-sky-100 dark:border-sky-800/30 flex justify-center items-center">
                  <svg className="w-7 h-7 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700">Domain View</span>
              </div>
              <div>
                <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{CURRENT_INTERN.domain} Rank</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl lg:text-3xl font-black text-sky-500 dark:text-sky-400">#{CURRENT_INTERN.domainRank}</span>
                  <span className="text-slate-400 font-medium">/ {CURRENT_INTERN.domainInterns}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
                 <span className="text-yellow-500 flex items-center font-bold text-xs lg:text-[10px] xl:text-xs">
                   <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                   Holding steady
                 </span>
                 <span className="text-sky-500 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                   View Top 10 <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                 </span>
              </div>
            </div>
          </div>

          {/* Conditional Rendering of the Leaderboard Table */}
          {activeTableConfig ? (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
               <LeaderboardTable key={activeTableConfig.tab} initialTab={activeTableConfig.tab} initialDomain={activeTableConfig.domain} hideControls={true} />
            </div>
          ) : (
            <>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 flex items-center justify-between">
                   <div>
                      <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Your Score</p>
                      <p className="text-3xl font-black text-slate-700 dark:text-slate-100">{CURRENT_INTERN.score} <span className="text-lg font-medium text-slate-400">pts</span></p>
                   </div>
                   <div className="h-16 w-px bg-slate-100 dark:bg-slate-800"></div>
                   <div>
                      <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Recent Quiz</p>
                      <p className="text-xl font-bold text-slate-700 dark:text-slate-100">85% <span className="text-sm font-medium text-green-500 ml-2">Pass</span></p>
                   </div>
                   <div className="h-16 w-px bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
                   <div className="hidden md:block">
                      <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Target Rank</p>
                      <p className="text-xl font-bold text-sky-500 dark:text-sky-400">Top 3 Finish</p>
                   </div>
              </div>
              
              <div className="bg-sky-50/50 dark:bg-sky-900/10 rounded-2xl border border-sky-100 dark:border-sky-800/30 p-8 text-center flex flex-col items-center justify-center flex-1">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4">
                      <span className="text-2xl">👇</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Want to see the competition?</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">Click on either of your Rank cards above to expand the live top 10 standings and see who you're chasing.</p>
              </div>
            </>
          )}

        </div>

        {/* Side Card: Quiz Info / Promo */}
        <div className="flex flex-col gap-6">
          <SidePromoCard />
        </div>
      </div>
    </div>
  );
};

export default InternDashboard;
