import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';

const AllContests = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const response = await apiCall("/admin/all-contests");
      if (response.success) {
        setContests(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch contests:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (startTime, expiryDate) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(expiryDate);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Ongoing";
    return "Completed";
  };

  const filteredContests = contests.filter(contest => 
    contest.contestTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contest.domain?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFinalize = async (contestId) => {
    if (!window.confirm("Are you sure you want to finalize this contest? This will award permanent badges to the winners.")) {
      return;
    }

    try {
      const data = await apiCall("/leaderboard/finalize", {
        method: "POST",
        body: JSON.stringify({ contestId })
      });

      if (data.success) {
        alert("✅ Contest finalized successfully! Badges have been awarded.");
        // In a real app, we'd refresh the list or update local state
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Finalize error:", error);
      alert(`❌ Failed to finalize contest: ${error.message}`);
    }
  };

  const handleDelete = async (contestId) => {
    if (!window.confirm("Are you sure you want to delete this contest?")) {
      return;
    }

    try {
      const response = await apiCall(`/admin/delete-contest/${contestId}`, {
        method: "DELETE",
      });

      if (response.success) {
        alert("✅ Contest deleted successfully!");
        setContests((prev) => prev.filter((c) => c.contestId !== contestId));
      } else {
        alert(`❌ Error: ${response.message || 'Failed to delete'}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(`❌ Failed to delete contest: ${error.message}`);
    }
  };


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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading contests...</p>
          </div>
        ) : filteredContests.length === 0 ? (
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
            {filteredContests.map((contest, index) => {
              const status = getStatus(contest.startTime, contest.expiryDate);
              return (
                <motion.div
                  key={contest._id}
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
                          {contest.contestTitle}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest font-bold">MCQ</p>
                      </div>
  
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-6 xl:gap-8 w-full border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700/50 pt-4 md:pt-0 md:pl-6 xl:pl-8">
                         <div className="flex flex-col gap-1 w-[45%] md:w-auto">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</p>
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{new Date(contest.date).toLocaleDateString()}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {new Date(contest.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
  
                        <div className="flex flex-col gap-1 w-[45%] md:w-auto md:border-l border-slate-200 dark:border-slate-700/50 md:pl-6 xl:pl-8">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {contest.duration} mins</p>
                        </div>
  
                        <div className="flex flex-col gap-1 w-[45%] md:w-auto md:border-l border-slate-200 dark:border-slate-700/50 md:pl-6 xl:pl-8">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase inline-flex items-center gap-1
                              ${status === 'Completed' 
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                : status === 'Ongoing'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                : 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400'
                              }`}>
                              {status === 'Upcoming' && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>}
                              {status === 'Ongoing' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>}
                              {status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div className="w-full xl:w-auto shrink-0 border-t xl:border-none border-slate-200 dark:border-slate-700/50 pt-5 xl:pt-0 flex flex-col items-center">
                      {user?.role !== "admin" ? (
                          <>
                            {status === 'Upcoming' && (
                              <button onClick={() => navigate('/quiz')} className="w-full xl:w-[160px] px-5 py-3.5 bg-sky-100 text-sky-700 hover:bg-sky-500 hover:text-white dark:bg-sky-900/40 dark:text-sky-400 dark:hover:bg-sky-500 font-bold rounded-xl text-sm transition-all border border-transparent hover:shadow-md">
                                View Details
                              </button>
                            )}
                            {status === 'Ongoing' && (
                              <button onClick={() => navigate('/quiz')} className="w-full xl:w-[160px] px-5 py-3.5 bg-amber-100 text-amber-700 hover:bg-amber-500 hover:text-white dark:bg-amber-900/40 dark:text-amber-400 dark:hover:bg-amber-500 font-bold rounded-xl text-sm transition-all border border-transparent hover:shadow-md">
                                Start Quiz
                              </button>
                            )}
                            {status === 'Completed' && (
                              <div className="flex gap-2">
                                 <button 
                                   onClick={() => navigate('/my-quizzes')} 
                                   className="w-full xl:w-[140px] px-4 py-3.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-500 hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-500 font-bold rounded-xl text-xs transition-all border border-transparent hover:shadow-md"
                                 >
                                   My Result
                                 </button>
                                 <button 
                                   onClick={() => navigate(`/quiz-leaderboard/${contest.contestId}`)} 
                                   className="w-full xl:w-[140px] px-4 py-3.5 bg-sky-100 text-sky-700 hover:bg-sky-500 hover:text-white dark:bg-sky-900/40 dark:text-sky-400 dark:hover:bg-sky-500 font-bold rounded-xl text-xs transition-all border border-transparent hover:shadow-md"
                                 >
                                   Leaderboard
                                 </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {status === 'Completed' ? (
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleFinalize(contest.contestId)}
                                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-sm whitespace-nowrap"
                                >
                                  Award Badges
                                </button>
                                <button
                                  onClick={() => navigate(`/admin/contest-results/${contest.contestId}`)}
                                  className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/20 active:scale-95 transition-all text-sm whitespace-nowrap"
                                >
                                  View Result
                                </button>
                                {contest.awardGiven && (
                                  <button 
                                    disabled
                                    title="Cannot delete after award is given"
                                    className="p-3 text-red-500 opacity-50 cursor-not-allowed rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{status}</span>
                                <button className="p-3 text-slate-400 hover:text-sky-500 transition-colors rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-200 hover:bg-sky-50 dark:hover:bg-slate-800">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                                {contest.awardGiven ? (
                                  <button 
                                    className="p-3 text-red-500 opacity-50 cursor-not-allowed rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                                    disabled
                                    title="Cannot delete after award is given"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => handleDelete(contest.contestId)}
                                    className="p-3 text-red-500 hover:text-red-700 transition-colors rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    title="Delete Contest"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                  </button>
                                )}
                              </div>
                            )}
                          </>
                        )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllContests;
