import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../utils/api';

const QuizLeaderboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('rankings');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const response = await apiCall(`/leaderboard/contest/${id}`);
        if (response && response.success) {
          setQuizData(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch contest leaderboard:", err);
        setError("Could not load leaderboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <p className="text-red-500 font-bold mb-4">{error || "Leaderboard not found."}</p>
        <button onClick={() => navigate('/history')} className="px-6 py-2 bg-sky-500 text-white rounded-xl font-bold">Back to History</button>
      </div>
    );
  }

  const participants = quizData.participants || [];
  const topThree = participants.slice(0, 3);
  const others = participants.slice(3);

  // Podium order: [Silver (2), Gold (1), Bronze (3)]
  // Map indices to handle empty podium slots
  const podiumLayout = [
    { rank: 2, data: topThree[1] },
    { rank: 1, data: topThree[0] },
    { rank: 3, data: topThree[2] }
  ].filter(p => p.data); // Only show if participant exists

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-10 font-sans bg-slate-50/30 dark:bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-500 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            </button>
            <div>
              <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-1 inline-block">
                {quizData.domain} Result
              </span>
              <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{quizData.title}</h1>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex">
            <button 
              onClick={() => setViewType('rankings')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewType === 'rankings' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
            >
              Top Rankings
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center pt-20 pb-10">
          <div className="flex items-end justify-center gap-2 sm:gap-6 w-full max-w-4xl px-4">
             {podiumLayout.map((p, i) => {
               const intern = p.data;
               return (
                <motion.div
                  key={intern.rank || p.rank}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.2, type: 'spring', stiffness: 100 }}
                  className={`flex flex-col items-center relative ${p.rank === 1 ? 'z-10 -top-8 scale-110' : 'z-0'}`}
                >
                  <div className={`absolute -top-12 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg mb-2 whitespace-nowrap
                    ${p.rank === 1 ? 'bg-amber-400 text-amber-900' : 
                      p.rank === 2 ? 'bg-slate-300 text-slate-800' : 
                      'bg-orange-400 text-orange-950'}`}
                  >
                    {p.rank === 1 ? "Gold Badge" : p.rank === 2 ? "Silver Badge" : "Bronze Badge"}
                  </div>

                  <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 flex items-center justify-center relative shadow-2xl mb-4
                    ${p.rank === 1 ? 'border-amber-400 bg-amber-50 shadow-amber-500/20' : 
                      p.rank === 2 ? 'border-slate-300 bg-slate-50 shadow-slate-500/20' : 
                      'border-orange-400 bg-orange-50 shadow-orange-500/20'}`}
                  >
                    <span className={`text-4xl sm:text-5xl font-black 
                      ${p.rank === 1 ? 'text-amber-500' : 
                        p.rank === 2 ? 'text-slate-500' : 
                        'text-orange-500'}`}
                    >
                      {intern.name.charAt(0)}
                    </span>
                    {p.rank === 1 && (
                      <div className="absolute -top-6 -right-2 transform rotate-12">
                        <span className="text-4xl">👑</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center mb-4 min-h-[50px]">
                    <p className="font-black text-slate-800 dark:text-white text-lg leading-tight truncate px-2">{intern.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{intern.uniqueId}</p>
                  </div>

                  <div className={`w-28 sm:w-40 rounded-t-3xl flex flex-col items-center justify-start pt-6 shadow-inner px-2 text-center
                    ${p.rank === 1 ? 'h-48 sm:h-64 bg-gradient-to-b from-amber-400 to-amber-600' : 
                      p.rank === 2 ? 'h-36 sm:h-48 bg-gradient-to-b from-slate-300 to-slate-500' : 
                      'h-28 sm:h-36 bg-gradient-to-b from-orange-400 to-orange-600'}`}
                  >
                    <span className="text-white text-4xl sm:text-6xl font-black opacity-30 select-none">{p.rank}</span>
                    <div className="mt-auto pb-6 text-white text-center">
                        <p className="text-xs font-bold uppercase opacity-80 mb-0.5">Score</p>
                        <p className="text-xl sm:text-2xl font-black leading-none">{intern.score}</p>
                    </div>
                  </div>
                </motion.div>
               );
             })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
           {others.map((intern, idx) => (
             <motion.div
               key={intern.rank}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 + (idx * 0.1) }}
               className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all"
             >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors">
                  #{intern.rank}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-sky-500 transition-colors">{intern.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">{intern.uniqueId}</p>
                </div>
                <div className="text-right flex items-center gap-10">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Time</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300 text-sm whitespace-nowrap">{intern.timeTaken} <span className="text-[10px] opacity-60">sec</span></p>
                   </div>
                   <div className="min-w-[80px]">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Final Score</p>
                      <p className="text-xl font-black text-slate-800 dark:text-white leading-none">{intern.score}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="text-center py-10 opacity-50">
           <p className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-[.25em] uppercase italic">Generated by Athenura Ranking Engine 3.0</p>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizLeaderboard;
