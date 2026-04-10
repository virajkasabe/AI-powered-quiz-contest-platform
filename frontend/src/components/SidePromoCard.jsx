import React from 'react';
import { useNavigate } from 'react-router-dom';

const SidePromoCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl border border-sky-100/50 shadow-lg p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50/70 rounded-full translate-x-10 -translate-y-10 blur-xl"></div>
      
      <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl mb-6 flex items-center justify-center relative z-10 shadow-sm border border-sky-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </div>
      
      <h3 className="text-lg font-bold text-sky-900 mb-2 relative z-10">Climb the Ranks!</h3>
      <p className="text-slate-500 text-sm mb-6 relative z-10 leading-relaxed">
        Complete your daily quizzes and maintain your streak to secure your spot in the top 3.
      </p>
      
      <div className="space-y-3 relative z-10">
        <button onClick={() => navigate('/quiz')} className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-[12px] text-sm font-bold transition-all shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50">
          Start Quiz Now
        </button>
        <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-[12px] text-sm font-bold transition-all border border-slate-200 shadow-sm flex items-center justify-center gap-2">
           View Guidelines
        </button>
      </div>
    </div>
  );
};

export default SidePromoCard;
