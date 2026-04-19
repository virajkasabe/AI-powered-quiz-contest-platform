import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiCall } from '../utils/api';

// Removed MOCK_BADGE_LEADERBOARD constant

const InternLeaderboard = () => {
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [user, setUser] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let endpoint = "/leaderboard/overall";
      if (filterType === 'DOMAIN' && user?.domain) {
        endpoint = `/leaderboard/domain/${user.domain}`;
      }
      
      const response = await apiCall(endpoint);
      if (response && response.success) {
        setLeaderboardData(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
      setError("Failed to load rankings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [filterType, user?.domain]);

  const filteredInterns = leaderboardData.filter(inc => {
    const matchesSearch = (inc.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (inc.uniqueId || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const starPerformer = leaderboardData.find(i => i.isInternOfTheMonth);

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-10"
      >
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 p-8 md:p-10 transition-colors duration-300">
           <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-2 tracking-tight">
                Hall of Fame
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                Recognizing our top badge earners and champions
              </p>
           </div>
           <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
             <div className="flex w-full sm:w-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-[14px]">
               <button
                 onClick={() => setFilterType('ALL')}
                 className={`w-1/2 sm:w-auto px-4 py-2 rounded-[10px] text-sm font-bold transition-all ${filterType === 'ALL' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
               >
                 Global
               </button>
               <button
                 onClick={() => setFilterType('DOMAIN')}
                 className={`w-1/2 sm:w-auto px-4 py-2 rounded-[10px] text-sm font-bold transition-all ${filterType === 'DOMAIN' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
               >
                 My Domain
               </button>
             </div>
             <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search champions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-100 dark:border-slate-700/50 rounded-[12px] focus:border-amber-400 focus:ring-4 focus:ring-amber-100/50 dark:focus:ring-amber-900/20 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm font-medium"
                />
                <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>
           </div>
        </div>

        {/* Intern of the Month Hero Section */}
        {starPerformer && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3rem] p-8 sm:p-12 overflow-hidden shadow-2xl shadow-indigo-500/10 border border-white/5"
          >
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-amber-500/20 transition-all duration-500"></div>
             <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] -ml-40 -mb-40 group-hover:bg-indigo-500/20 transition-all duration-500"></div>

             <div className="relative flex flex-col md:flex-row items-center gap-10">
                <div className="shrink-0 relative">
                   <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-[2rem] bg-slate-800 border-[3px] border-amber-400/50 flex items-center justify-center text-6xl shadow-2xl transform group-hover:rotate-3 transition-transform duration-500">
                      ✨
                   </div>
                   <div className="absolute -bottom-4 -right-4 bg-amber-400 text-amber-950 px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-tighter shadow-xl">
                      Star Performer
                   </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                   <h4 className="text-amber-400 font-black text-sm uppercase tracking-widest mb-3 flex items-center justify-center md:justify-start gap-2">
                      <span className="w-8 h-px bg-amber-400/30"></span>
                      Intern of the Month
                   </h4>
                   <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight leading-none group-hover:text-amber-50 transition-colors">
                      {starPerformer.name}
                   </h2>
                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
                      <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Badges Earned</p>
                         <p className="text-xl font-black text-white">{starPerformer.badgesEarned}</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Points</p>
                         <p className="text-xl font-black text-amber-400">{starPerformer.totalScore.toLocaleString()}</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => setSelectedIntern(starPerformer)}
                    className="px-8 py-4 bg-amber-400 hover:bg-white text-amber-950 font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-amber-400/20 text-sm"
                   >
                      View Achievement History
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {/* Global Rankings Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-6 mb-2">
             <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[.2em]">Platform Rankings</h3>
             <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase italic">Updated in Real-time</p>
          </div>

          <div className="flex flex-col gap-4">
            {isLoading ? (
              // Enhanced Skeleton Loading State
              [...Array(5)].map((_, i) => (
                <div key={`skeleton-${i}`} className="h-28 bg-slate-100 dark:bg-slate-800/20 rounded-[2.5rem] animate-pulse border border-slate-200/50 dark:border-slate-800" />
              ))
            ) : error ? (
              <div className="text-center py-12 bg-red-50 dark:bg-red-900/10 rounded-[2.5rem] border border-red-100 dark:border-red-900/30">
                <p className="text-red-500 font-bold">{error}</p>
                <button onClick={fetchLeaderboard} className="mt-4 text-xs font-black uppercase text-red-600 hover:underline">Retry Connection</button>
              </div>
            ) : filteredInterns.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/20 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">No Rankings Found</h3>
                <p className="text-slate-500 dark:text-slate-400">Be the first to earn a badge and claim your spot!</p>
              </div>
            ) : (
              filteredInterns.map((intern, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={intern.id || intern.uniqueId || i}
                  onClick={() => setSelectedIntern(intern)}
                  className="group relative flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:px-8 bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row w-full items-center gap-6">
                    {/* Rank Indicator */}
                    <div className="shrink-0 w-16 h-16 rounded-[1.5rem] bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center font-black text-xl text-indigo-500 border border-indigo-100 dark:border-indigo-900 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                       #{i + 1}
                    </div>
                    
                    {/* Name & ID */}
                    <div className="flex-1 text-center md:text-left">
                       <h3 className="text-2xl font-black text-slate-800 dark:text-white group-hover:text-indigo-500 transition-colors tracking-tight">{intern.name}</h3>
                       <div className="flex items-center justify-center md:justify-start gap-4 mt-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{intern.uniqueId}</span>
                          <span className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></span>
                          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-md">
                             {intern.domain}
                          </span>
                       </div>
                    </div>

                    {/* Badge Breakdown */}
                    <div className="flex gap-4 items-center px-8 border-x border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col items-center">
                           <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-xs shadow-lg">🏆</div>
                           <span className="text-xs font-black text-amber-600 dark:text-amber-400 mt-1">Badges</span>
                        </div>
                    </div>

                    {/* Final Stats */}
                    <div className="shrink-0 text-center md:text-right min-w-[120px]">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Badges</p>
                        <p className="text-3xl font-black text-slate-800 dark:text-white leading-none">{intern.badgesEarned}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedIntern && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIntern(null)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden"
            >
               <div className="h-32 bg-gradient-to-r from-amber-400 to-orange-500 p-8 flex justify-between items-start">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center text-3xl shadow-xl">🏆</div>
                  <button onClick={() => setSelectedIntern(null)} className="p-2 bg-white/20 rounded-xl text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
               </div>
               <div className="p-10 -mt-8 bg-white dark:bg-slate-900 rounded-t-[3rem] relative">
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 font-black text-[10px] uppercase tracking-widest rounded-full">{selectedIntern.domain} CHAMPION</span>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white mt-2 mb-6">{selectedIntern.name}</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Badges</p>
                        <p className="text-3xl font-black text-slate-800 dark:text-white">{selectedIntern.badgesEarned}</p>
                     </div>
                     <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 text-center flex items-center justify-center flex-col">
                        <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-xs shadow-lg mb-1">🏆</div>
                        <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Champion</p>
                     </div>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-800/50">
                     <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                        Recent Milestone
                     </p>
                     <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{selectedIntern.recentWin}</p>
                  </div>

                  <button 
                    onClick={() => setSelectedIntern(null)}
                    className="w-full mt-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl"
                  >
                    Close Profile
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InternLeaderboard;
