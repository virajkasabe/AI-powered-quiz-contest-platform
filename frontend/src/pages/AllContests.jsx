import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AllContests = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
  
  // Mock Contests Data
  const [contests, setContests] = useState([
    { id: 1, title: 'Monthly Frontend Challenge', type: 'MCQ', domain: 'Frontend', date: '2023-11-20', duration: '60 mins', status: 'Upcoming' },
    { id: 2, title: 'Backend Coding Interview Prep', type: 'Coding', domain: 'Backend', date: '2023-11-15', duration: '120 mins', status: 'Completed' },
    { id: 3, title: 'UI/UX Design Patterns', type: 'Mixed', domain: 'UI/UX Design', date: '2023-10-30', duration: '90 mins', status: 'Completed' },
    { id: 4, title: 'React Hooks Mastery', type: 'MCQ', domain: 'Frontend', date: '2023-12-05', duration: '45 mins', status: 'Draft' },
  ]);

  const filteredContests = contests.filter(contest => 
    contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contest.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 p-6 md:p-8 lg:p-10 transition-colors duration-300"
      >
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent mb-2">
              All Contests
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Manage your coding challenges and quizzes
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search contests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-[1.5px] border-slate-200 dark:border-slate-700 rounded-[12px] focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100/50 transition-all text-sm placeholder-slate-400 dark:placeholder-slate-500 dark:text-slate-100 text-slate-800"
              />
              <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {user?.role === "admin" && (
              <button
                onClick={() => navigate('/create-contest')}
                className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New Contest
              </button>
            )}
          </div>
        </div>

        {/* Table View */}
        {filteredContests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-200/50 dark:border-slate-700">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No contests found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
              We couldn't find any contests matching your search. Create a new one to get started!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {filteredContests.map((contest, index) => (
              <motion.div
                key={contest.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group w-full bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 border border-slate-200/60 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col xl:flex-row items-center justify-between gap-6 w-full">
                  <div className="flex-1 w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                    <div className="w-full md:min-w-[220px]">
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">
                        {contest.domain}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-sky-500 transition-colors truncate">
                        {contest.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest font-bold">{contest.type}</p>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap items-center gap-6 xl:gap-8 w-full border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700/50 pt-4 md:pt-0 md:pl-6 xl:pl-8">
                       <div className="flex flex-col gap-1 w-[45%] md:w-auto">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{contest.date}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">10:00 AM</p>
                      </div>

                      <div className="flex flex-col gap-1 w-[45%] md:w-auto md:border-l border-slate-200 dark:border-slate-700/50 md:pl-6 xl:pl-8">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {contest.duration}</p>
                      </div>

                      <div className="flex flex-col gap-1 w-[45%] md:w-auto md:border-l border-slate-200 dark:border-slate-700/50 md:pl-6 xl:pl-8">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase inline-flex items-center gap-1
                            ${contest.status === 'Completed' 
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                              : contest.status === 'Draft'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400'
                            }`}>
                            {contest.status === 'Upcoming' && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>}
                            {contest.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-auto shrink-0 border-t xl:border-none border-slate-200 dark:border-slate-700/50 pt-5 xl:pt-0 flex flex-col items-center">
                    {user?.role !== "admin" ? (
                        <>
                          {contest.status === 'Upcoming' && (
                            <button onClick={() => navigate('/quiz')} className="w-full xl:w-[160px] px-5 py-3.5 bg-sky-100 text-sky-700 hover:bg-sky-500 hover:text-white dark:bg-sky-900/40 dark:text-sky-400 dark:hover:bg-sky-500 font-bold rounded-xl text-sm transition-all border border-transparent hover:shadow-md">
                              Start
                            </button>
                          )}
                          {contest.status === 'Ongoing' && (
                            <button onClick={() => navigate('/quiz')} className="w-full xl:w-[160px] px-5 py-3.5 bg-amber-100 text-amber-700 hover:bg-amber-500 hover:text-white dark:bg-amber-900/40 dark:text-amber-400 dark:hover:bg-amber-500 font-bold rounded-xl text-sm transition-all border border-transparent hover:shadow-md">
                              Continue
                            </button>
                          )}
                          {contest.status === 'Completed' && (
                            <button onClick={() => navigate('/my-quizzes')} className="w-full xl:w-[160px] px-5 py-3.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-500 hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-500 font-bold rounded-xl text-sm transition-all border border-transparent hover:shadow-md">
                              View Result
                            </button>
                          )}
                        </>
                      ) : (
                        <button className="p-3 text-slate-400 hover:text-sky-500 transition-colors rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-200 hover:bg-sky-50 dark:hover:bg-slate-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllContests;
