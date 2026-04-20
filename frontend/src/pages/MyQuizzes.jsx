import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiCall } from '../utils/api';

const MyQuizzes = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await apiCall("/quiz/history");
      // Map API data to frontend format
      const formattedHistory = data.history.map(attempt => ({
        id: attempt._id,
        contestTitle: attempt.contestId?.contestTitle || 'Unknown Contest',
        domain: attempt.domain,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        percentage: Math.round((attempt.score / attempt.totalQuestions) * 100),
        timeTaken: attempt.timeTaken || 'N/A',
        date: new Date(attempt.endTime).toISOString().split('T')[0],
        description: attempt.contestId?.description || 'No description available.',
      }));
      setHistory(formattedHistory);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 p-8 md:p-10 transition-colors duration-300"
      >
        {/* Header & Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-2 tracking-tight">
              My Quizzes
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              Review your performance across domain specializations
            </p>
          </div>
          
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="flex-1 lg:w-36 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 text-center">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Quizzes Given</p>
              <p className="text-2xl font-black text-sky-500">{stats.total}</p>
            </div>
            <div className="flex-1 lg:w-36 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 text-center">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Avg. Accuracy</p>
              <p className="text-2xl font-black text-emerald-500">{stats.avgScore}%</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full mb-8">
          <input
            type="text"
            placeholder="Search by quiz title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl focus:border-sky-400 focus:ring-4 focus:ring-sky-100/50 dark:focus:ring-sky-900/20 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium"
          />
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* History Cards */}
        <div className="flex flex-col gap-5 pb-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedQuiz(item)}
                className="group w-full bg-slate-50/50 dark:bg-slate-900/40 rounded-[2rem] p-6 border border-slate-200/60 dark:border-slate-700/50 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 cursor-pointer"
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
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spent</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.timeTaken} s</p>
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
                      className="w-full xl:w-[150px] px-6 py-3 bg-emerald-50 hover:bg-emerald-500 text-emerald-700 hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-500 font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm border border-emerald-100 dark:border-emerald-800/50"
                    >
                      View Result
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 bg-slate-50/50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
               <p className="text-xl font-bold text-slate-400">{loading ? 'Loading results...' : 'No quizzes found.'}</p>
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
              className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Top Banner */}
              <div className="h-32 bg-gradient-to-r from-sky-500 to-indigo-600 relative p-8">
                 <button 
                   onClick={() => setSelectedQuiz(null)}
                   className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
                 <div className="absolute -bottom-10 left-8 px-6 py-4 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-4 border-white dark:border-slate-900 flex items-center gap-3">
                    <span className={`text-4xl font-black ${selectedQuiz.percentage >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {selectedQuiz.percentage}%
                    </span>
                    <div className="h-8 w-px bg-slate-100 dark:bg-slate-700"></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Overall<br/>Accuracy</p>
                 </div>
              </div>

              <div className="p-10 pt-16">
                <div className="flex justify-between items-start mb-8">
                   <div>
                     <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">{selectedQuiz.contestTitle}</h2>
                     <p className="text-sky-500 font-bold uppercase tracking-widest text-[10px] leading-tight">
                       {selectedQuiz.domain} SPECIALIZATION
                     </p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Attempted On</p>
                     <p className="text-sm font-black text-slate-700 dark:text-slate-300">{selectedQuiz.date}</p>
                   </div>
                </div>

                <div className="mb-10 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <div className="w-1.5 h-4 bg-sky-500 rounded-full"></div>
                     Quiz Description
                   </h3>
                   <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                     {selectedQuiz.description}
                   </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800/50 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Score</p>
                      <p className="text-xl font-black text-slate-800 dark:text-white">{selectedQuiz.score}/{selectedQuiz.totalQuestions}</p>
                   </div>
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800/50 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Accuracy</p>
                      <p className="text-xl font-black text-emerald-500">{selectedQuiz.percentage}%</p>
                   </div>
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800/50 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Time spent</p>
                      <p className="text-xl font-black text-sky-500">{selectedQuiz.timeTaken}s</p>
                   </div>
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800/50 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status</p>
                      <p className="text-xl font-black text-emerald-500">Passed</p>
                   </div>
                </div>

                <button 
                  onClick={() => setSelectedQuiz(null)}
                  className="w-full mt-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-slate-200 dark:shadow-none text-sm uppercase tracking-widest"
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
