import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InternLeaderboard = () => {
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    if (selectedIntern) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // Revert to original
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedIntern]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Mock list of interns
  const interns = [
    {
      id: 'INT-001',
      name: 'Kelly Kapoor',
      domain: 'FRONTEND',
      rank: 1,
      score: 1850,
      percentage: 94,
      totalQuizzes: 20,
      recentPerformance: 'MERN Stack Fundamentals (98%)'
    },
    {
      id: 'INT-002',
      name: 'Jim Halpert',
      domain: 'BACKEND',
      rank: 2,
      score: 1720,
      percentage: 89,
      totalQuizzes: 19,
      recentPerformance: 'Node Streams Mastery (92%)'
    },
    {
      id: 'INT-003',
      name: 'Pam Beesly',
      domain: 'UI/UX',
      rank: 3,
      score: 1680,
      percentage: 87,
      totalQuizzes: 18,
      recentPerformance: 'Color Theory Dynamics (90%)'
    },
    {
      id: 'INT-004',
      name: 'Dwight Schrute',
      domain: 'BACKEND',
      rank: 4,
      score: 1540,
      percentage: 81,
      totalQuizzes: 16,
      recentPerformance: 'SQL Aggregations (85%)'
    },
    {
      id: 'INT-005',
      name: 'Michael Scott',
      domain: 'BUSINESS DEVT',
      rank: 5,
      score: 1200,
      percentage: 72,
      totalQuizzes: 15,
      recentPerformance: 'Pitch Formulation (75%)'
    }
  ];

  const filteredInterns = interns.filter(inc => {
    const matchesSearch = inc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inc.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = filterType === 'ALL' || (user && inc.domain.toUpperCase() === (user.domain || '').toUpperCase());
    return matchesSearch && matchesDomain;
  });

  const isEmpty = filteredInterns.length === 0;

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 p-8 md:p-10 transition-colors duration-300">
           <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-2 tracking-tight">
                Global Leaderboard
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                Track platform-wide intern standing and performance metrics
              </p>
           </div>
           <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
             <div className="flex w-full sm:w-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-[14px]">
               <button
                 onClick={() => setFilterType('ALL')}
                 className={`w-1/2 sm:w-auto px-4 py-2 rounded-[10px] text-sm font-bold transition-all ${filterType === 'ALL' ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
               >
                 All Interns
               </button>
               <button
                 onClick={() => setFilterType('DOMAIN')}
                 className={`w-1/2 sm:w-auto px-4 py-2 rounded-[10px] text-sm font-bold transition-all ${filterType === 'DOMAIN' ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
               >
                 My Domain
               </button>
             </div>
             <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search intern name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-100 dark:border-slate-700/50 rounded-[12px] focus:border-sky-400 focus:ring-4 focus:ring-sky-100/50 dark:focus:ring-sky-900/20 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm font-medium"
                />
                <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>
           </div>
        </div>

        {/* Intern List Wrapper */}
        <div className="flex flex-col gap-4">
          {filteredInterns.length > 0 ? (
             filteredInterns.map((intern, i) => (
                <motion.div
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.05 }}
                   key={intern.id}
                   onClick={() => setSelectedIntern(intern)}
                   className="group relative flex flex-col sm:flex-row items-center justify-between gap-6 p-6 md:px-8 md:py-6 bg-white dark:bg-slate-900/40 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 cursor-pointer overflow-hidden transition-all duration-300"
                >
                   {/* Rank Accent Block (Hidden implicitly unless hover, or strictly mapped) */}
                   <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-sky-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                   <div className="flex flex-col sm:flex-row w-full items-center gap-4 sm:gap-6">
                      {/* Rank Ring */}
                      <div className={`shrink-0 w-16 h-16 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full sm:rounded-2xl flex items-center justify-center font-black text-2xl sm:text-xl shadow-md border 
                        ${intern.rank === 1 ? 'bg-amber-100 text-amber-500 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20' : 
                          intern.rank === 2 ? 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-500/10 dark:border-slate-500/20' : 
                          intern.rank === 3 ? 'bg-orange-100 text-orange-500 border-orange-200 dark:bg-orange-500/10 dark:border-orange-500/20' : 
                          'bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-900/20 dark:border-sky-800/30'}`}
                      >
                         #{intern.rank}
                      </div>
                      
                      {/* Personal Block */}
                      <div className="w-full text-center sm:text-left sm:flex-1">
                         <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-0.5">{intern.id}</p>
                         <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-sky-500 transition-colors truncate">{intern.name}</h3>
                      </div>
                   </div>

                   {/* Stats Block */}
                   <div className="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-start sm:items-end border-t sm:border-none border-slate-100 dark:border-slate-800 pt-4 sm:pt-0">
                      <div>
                        <span className="text-[13px] sm:text-xs font-black uppercase tracking-widest text-slate-400 block sm:inline mb-1 sm:mb-0">Domain</span>
                        <span className="text-base sm:text-sm font-bold text-slate-700 dark:text-slate-300 block">{intern.domain}</span>
                      </div>

                      <div>
                        <span className="text-[13px] sm:text-xs font-black uppercase tracking-widest text-slate-400 block sm:inline mb-1 sm:mb-0">Total Score</span>
                        <span className="text-xl font-black text-emerald-500 block">{intern.score}</span>
                      </div>

                      <div>
                        <span className="text-[13px] sm:text-xs font-black uppercase tracking-widest text-slate-400 block sm:inline mb-1 sm:mb-0">Average</span>
                        <span className="text-xl font-black text-sky-500 block">{intern.percentage}%</span>
                      </div>
                   </div>
                </motion.div>
             ))
          ) : (
             <div className="w-full py-20 text-center bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2.5rem]">
               <h3 className="text-lg font-bold text-slate-400 mb-1">No interns found</h3>
               <p className="text-slate-500 text-sm">Adjust your search parameters.</p>
             </div>
          )}
        </div>
      </motion.div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedIntern && (
          <div className="fixed top-[80px] md:left-[256px] inset-x-0 bottom-0 z-[30] flex items-center justify-center p-4 sm:p-6 pb-[10vh] overflow-y-auto">
             {/* Backdrop */}
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIntern(null)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
            />
            
            {/* Context Module */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm sm:max-w-md md:max-w-lg xl:max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[85vh] overflow-y-auto"
            >
               <div className="h-20 sm:h-24 bg-gradient-to-r from-sky-500 to-indigo-600 relative shrink-0">
                  <button 
                   onClick={() => setSelectedIntern(null)}
                   className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                 >
                   <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
               </div>

               <div className="px-6 py-6 sm:px-8 sm:pb-8 overflow-y-auto w-full">
                  {/* Floating Avatar Hook */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end relative -top-10 mb-[-1rem] sm:mb-[-20px] gap-2 sm:gap-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-slate-800 rounded-[1rem] sm:rounded-[1.2rem] border-[3px] sm:border-[4px] border-white dark:border-slate-900 flex items-center justify-center shadow-lg font-black text-xl sm:text-2xl text-slate-600 dark:text-slate-300">
                         {selectedIntern.name.charAt(0)}
                      </div>
                      <div className="pl-1 sm:pb-10 sm:pl-4 w-full text-left">
                         <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                           {selectedIntern.domain}
                         </span>
                      </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white leading-tight">{selectedIntern.name}</h2>
                  <p className="text-slate-400 font-bold mb-6 text-xs sm:text-sm">{selectedIntern.id}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-sky-200 transition-colors flex justify-between sm:flex-col items-center sm:items-start text-left">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0 sm:mb-1">Global Rank</p>
                        <p className="text-xl sm:text-2xl font-black text-sky-500">#{selectedIntern.rank}</p>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-sky-200 transition-colors flex justify-between sm:flex-col items-center sm:items-start text-left">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0 sm:mb-1">Avg Accuracy</p>
                        <p className="text-xl sm:text-2xl font-black text-indigo-500">{selectedIntern.percentage}%</p>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-sky-200 transition-colors flex justify-between sm:flex-col items-center sm:items-start text-left">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0 sm:mb-1">Total Score</p>
                        <p className="text-xl sm:text-2xl font-black text-emerald-500">{selectedIntern.score}</p>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-sky-200 transition-colors flex justify-between sm:flex-col items-center sm:items-start text-left">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0 sm:mb-1">Attempts</p>
                        <p className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-200">{selectedIntern.totalQuizzes}</p>
                     </div>
                  </div>

                  <div className="bg-sky-50 dark:bg-sky-900/10 p-5 rounded-2xl border border-sky-100 dark:border-sky-800/30">
                     <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" fillRule="evenodd"/></svg> Recent Peak</p>
                     <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug">{selectedIntern.recentPerformance}</p>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InternLeaderboard;
