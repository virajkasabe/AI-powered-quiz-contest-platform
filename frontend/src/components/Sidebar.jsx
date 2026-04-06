import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-sky-500 dark:bg-slate-900 border-r border-transparent dark:border-slate-800 text-white flex flex-col justify-between hidden md:flex shrink-0 relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-400/20 dark:from-sky-900/10 to-purple-600/30 dark:to-slate-950/50 pointer-events-none transition-colors"></div>
        <div>
          <div className="p-6 font-bold text-xl tracking-widest uppercase flex items-center gap-2 relative z-10 text-white dark:text-sky-400">
            <span>ATHENURA</span>
          </div>
          <nav className="mt-6 flex flex-col relative z-10">
            <a href="#" className="flex items-center gap-3 px-6 py-4 bg-white/20 dark:bg-sky-900/30 border-l-4 border-white dark:border-sky-400 backdrop-blur-sm transition-all shadow-sm">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
              <span className="font-medium text-white dark:text-sky-100">Leaderboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-6 py-4 text-sky-100 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-slate-800/50 hover:text-white dark:hover:text-slate-200 transition-colors">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              <span className="font-medium">Contests</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-6 py-4 text-sky-100 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-slate-800/50 hover:text-white dark:hover:text-slate-200 transition-colors">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              <span className="font-medium">Question Bank</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-6 py-4 text-sky-100 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-slate-800/50 hover:text-white dark:hover:text-slate-200 transition-colors">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
              <span className="font-medium">Rewards</span>
            </a>
          </nav>
        </div>
        <div className="p-6 relative z-10 w-full box-border">
          <div className="bg-white/15 dark:bg-slate-800 backdrop-blur-md rounded-xl p-4 border border-white/20 dark:border-slate-700 shadow-lg relative overflow-hidden transition-transform hover:-translate-y-1">
            <h4 className="font-semibold text-sm mb-1 px-1 dark:text-white">Upgrade to Pro</h4>
            <p className="text-sky-100 dark:text-slate-400 text-xs mb-3 px-1 leading-relaxed">Get advanced analytics</p>
            <button className="w-full bg-white dark:bg-sky-500 text-sky-600 dark:text-white py-2 rounded-lg font-bold text-xs uppercase cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-400 transition-colors shadow-md">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
