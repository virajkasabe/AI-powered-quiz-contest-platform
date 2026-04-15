import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MyQuizzes = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Mock Data for Quiz History
  const history = [
    {
      id: 1,
      contestTitle: 'MERN Stack Fundamentals',
      domain: 'FRONTEND',
      score: 18,
      totalQuestions: 20,
      percentage: 90,
      timeTaken: '12:45',
      date: '2023-11-10',
      description: 'Comprehensive test covering React hooks, Node.js streams, and MongoDB aggregations. This quiz focused on real-world performance optimization and state management patterns.',
    },
    {
      id: 2,
      contestTitle: 'Advanced React Hooks',
      domain: 'FRONTEND',
      score: 15,
      totalQuestions: 20,
      percentage: 75,
      timeTaken: '18:20',
      date: '2023-11-15',
      description: 'In-depth evaluation of custom hooks, performance profiling with useMemo, and complex context architectures.',
    },
    {
      id: 3,
      contestTitle: 'Data Structures & Algorithms',
      domain: 'BACKEND',
      score: 14,
      totalQuestions: 20,
      percentage: 70,
      timeTaken: '25:30',
      date: '2023-11-05',
      description: 'Evaluation of algorithmic thinking, complexity analysis, and implementation of common data structures like trees and graphs.',
    },
  ];

  // Filter by user's domain and search term
  const userDomain = user?.domain?.trim().toUpperCase() || 'FRONTEND';
  const filteredHistory = history.filter(item => {
    const matchesDomain = item.domain === userDomain;
    const matchesSearch = item.contestTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const stats = {
    total: filteredHistory.length,
    avgScore: filteredHistory.length > 0 
      ? Math.round(filteredHistory.reduce((acc, curr) => acc + curr.percentage, 0) / filteredHistory.length)
      : 0
  };

  return (
    <div className="min-h-full p-2 sm:p-4 lg:p-6 transition-colors duration-300 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header & Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-2">My Quiz Results</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">
              Displaying all quizzes for domain: <span className="text-sky-500 font-bold uppercase">{userDomain}</span>
            </p>
          </div>
          
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="flex-1 lg:w-40 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/50 text-center">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Quizzes Given</p>
              <p className="text-2xl font-black text-sky-500">{stats.total}</p>
            </div>
            <div className="flex-1 lg:w-40 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/50 text-center">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Avg. Accuracy</p>
              <p className="text-2xl font-black text-emerald-500">{stats.avgScore}%</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by quiz title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800/80 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl focus:border-sky-400 focus:ring-4 focus:ring-sky-100/50 dark:focus:ring-sky-900/20 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
          <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* History Cards */}
        <div className="flex flex-col gap-5 pb-10">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedQuiz(item)}
                className="group w-full bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 border border-slate-200/60 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col xl:flex-row items-center justify-between gap-6 w-full">
                  <div className="flex-1 w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                    <div className="w-full md:min-w-[220px]">
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">
                        {item.domain}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-sky-500 transition-colors truncate">
                        {item.contestTitle}
                      </h3>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap items-center gap-6 xl:gap-8 w-full border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700/50 pt-4 md:pt-0 md:pl-6 xl:pl-8">
                       <div className="flex flex-col gap-1 w-[45%] md:w-auto">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.date}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">10:00 AM</p>
                      </div>

                      <div className="flex flex-col gap-1 w-[45%] md:w-auto md:border-l border-slate-200 dark:border-slate-700/50 md:pl-6 xl:pl-8">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration / Spent</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.timeTaken}</p>
                      </div>

                      <div className="flex flex-col gap-1 w-[45%] md:w-auto md:border-l border-slate-200 dark:border-slate-700/50 md:pl-6 xl:pl-8">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                           <span className="text-sm font-bold text-emerald-600 dark:text-emerald-500">Completed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-auto shrink-0 border-t xl:border-none border-slate-200 dark:border-slate-700/50 pt-5 xl:pt-0 flex flex-col items-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedQuiz(item); }}
                      className="w-full xl:w-[160px] px-6 py-3.5 bg-emerald-100 hover:bg-emerald-500 text-emerald-700 hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-500 font-bold rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.15)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      View Result
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-slate-50 dark:bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700 text-center animate-pulse">
               <p className="text-xl font-bold text-slate-400">No quizzes found for your domain or search criteria.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuiz(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Top Banner */}
              <div className="h-32 bg-gradient-to-r from-sky-500 to-indigo-600 relative p-8">
                 <button 
                   onClick={() => setSelectedQuiz(null)}
                   className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
                 <div className="absolute -bottom-10 left-8 p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-4 border-white dark:border-slate-900">
                    <span className={`text-3xl font-black ${selectedQuiz.percentage >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {selectedQuiz.percentage}%
                    </span>
                 </div>
              </div>

              <div className="p-10 pt-16">
                <div className="flex justify-between items-start mb-6">
                   <div>
                     <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{selectedQuiz.contestTitle}</h2>
                     <p className="text-sky-500 font-bold uppercase tracking-widest text-xs">{selectedQuiz.domain} SPECIALIZATION</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Attempted On</p>
                     <p className="text-sm font-black text-slate-700 dark:text-slate-300">{selectedQuiz.date}</p>
                   </div>
                </div>

                <div className="mb-10">
                   <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <div className="w-1.5 h-4 bg-sky-500 rounded-full"></div>
                     Quiz Description
                   </h3>
                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                     {selectedQuiz.description}
                   </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Score</p>
                      <p className="text-xl font-black text-slate-800 dark:text-white">{selectedQuiz.score}/{selectedQuiz.totalQuestions}</p>
                   </div>
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Accuracy</p>
                      <p className="text-xl font-black text-emerald-500">{selectedQuiz.percentage}%</p>
                   </div>
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Time spent</p>
                      <p className="text-xl font-black text-sky-500">{selectedQuiz.timeTaken}</p>
                   </div>
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status</p>
                      <p className="text-xl font-black text-indigo-500">Passed</p>
                   </div>
                </div>

                <button 
                  onClick={() => setSelectedQuiz(null)}
                  className="w-full mt-10 py-4 bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                >
                  Close Achievement
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyQuizzes;
