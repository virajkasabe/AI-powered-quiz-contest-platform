import React from 'react';

const SidePromoCard = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 relative overflow-hidden transition-colors">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 dark:bg-sky-900/10 rounded-full translate-x-10 -translate-y-10 blur-2xl"></div>
      
      <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-xl mb-6 flex items-center justify-center relative z-10 shadow-sm border border-sky-200 dark:border-sky-800">
        <svg className="w-6 h-6 outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 relative z-10">Climb the Ranks!</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 relative z-10 leading-relaxed">
        Complete your daily quizzes and maintain your streak to secure your spot in the top 3.
      </p>
      
      <div className="space-y-3 relative z-10">
        <button className="w-full bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 text-white py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-sky-500/20">
          Start Quiz Now
        </button>
        <button className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center gap-2">
           View Guidelines
        </button>
      </div>
    </div>
  );
};

export default SidePromoCard;
