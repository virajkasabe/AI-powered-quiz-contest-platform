import React from 'react';
import { useNavigate } from 'react-router-dom';

const SidePromoCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-sky-100 dark:border-slate-700 shadow-lg p-6 relative overflow-hidden h-fit">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50/70 dark:bg-sky-900/20 rounded-full translate-x-10 -translate-y-10 blur-xl"></div>
      
      <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-xl mb-6 flex items-center justify-center relative z-10 shadow-sm border border-sky-200 dark:border-sky-800">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 relative z-10">Leaderboard Insights</h3>
      <div className="space-y-4 mb-6 relative z-10">
        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-600">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Top Domain This Week</p>
          <p className="text-sm font-bold text-sky-600 dark:text-sky-400">Frontend Development</p>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-600">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Interns Needing Review</p>
          <p className="text-sm font-bold text-amber-600 dark:text-amber-400">12 Pending</p>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-600">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Recent Ranking Changes</p>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nathan Drake <span className="text-emerald-500">↑ 3 spots</span></p>
        </div>
      </div>
      
      <div className="space-y-3 relative z-10">
        <button onClick={() => navigate('/reports')} className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-[12px] text-sm font-bold transition-all shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          View Detailed Report
        </button>
        <button className="w-full bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2.5 rounded-[12px] text-sm font-bold transition-all border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center gap-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
           Export Leaderboard
        </button>
      </div>
    </div>
  );
};

export default SidePromoCard;
