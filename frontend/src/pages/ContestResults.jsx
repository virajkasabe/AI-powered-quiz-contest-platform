import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../utils/api';

const ContestResults = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await apiCall(`/leaderboard/contest/${id}`);
        if (response && response.success) {
          setQuizData(response.data);
        } else {
          setError(response?.message || "Could not load result data.");
        }
      } catch (err) {
        console.error("Failed to fetch contest results:", err);
        setError("Could not load result data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500 font-bold mb-4">{error || "Result not found."}</p>
        <button onClick={() => navigate('/contests')} className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold transition-colors">
          Back to Contests
        </button>
      </div>
    );
  }

  const unSortedParticipants = quizData.participants || [];
  const participants = [...unSortedParticipants].sort((a, b) => {
    const scoreA = a.score !== undefined ? a.score : -1;
    const scoreB = b.score !== undefined ? b.score : -1;
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    const timeA = a.timeTaken !== undefined ? a.timeTaken : Infinity;
    const timeB = b.timeTaken !== undefined ? b.timeTaken : Infinity;
    return timeA - timeB;
  });
  const totalParticipants = participants.length;

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <button 
              onClick={() => navigate('/contests')}
              className="mt-1 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-500 transition-all shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">Contest Results</h1>
                <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wide rounded-full">
                  {quizData.domain}
                </span>
              </div>
              <h2 className="text-lg text-slate-600 dark:text-slate-300 font-bold">{quizData.title}</h2>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                 <div className="flex items-center gap-1.5">
                   <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   <span>{quizData.date ? new Date(quizData.date).toLocaleDateString() : 'N/A'}</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                   <span>{totalParticipants} Participant{totalParticipants !== 1 ? 's' : ''}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/50">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Rank</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Student</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">Marks</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">Percentage</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {participants.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                         <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                         </div>
                         <p className="text-slate-500 font-medium text-sm">No students participated in this contest.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  participants.map((intern, index) => {
                    const isTop1 = index === 0;
                    const isTop2 = index === 1;
                    const isTop3 = index === 2;
                    let rowClass = "hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors";
                    if (isTop1) rowClass = "bg-amber-50/30 dark:bg-amber-900/10 hover:bg-amber-50 dark:hover:bg-amber-900/20";
                    else if (isTop2) rowClass = "bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/50";
                    else if (isTop3) rowClass = "bg-orange-50/30 dark:bg-orange-900/10 hover:bg-orange-50 dark:hover:bg-orange-900/20";

                    // Safely handle missing values & calculate percentage
                    const score = intern.score !== undefined ? intern.score : '-';
                    const maxScore = quizData.totalScore || quizData.totalQuestions || 0;
                    let percentage = '-';
                    if (intern.score !== undefined && maxScore > 0) {
                      percentage = Math.round((intern.score / maxScore) * 100) + '%';
                    } else if (intern.percentage) {
                       percentage = intern.percentage + '%';
                    }
                    
                    const status = intern.status || 'Submitted';
                    const submittedAt = intern.submittedAt || intern.timeTaken ? `${intern.timeTaken} sec` : 'N/A';

                    return (
                      <tr key={intern.uniqueId || index} className={rowClass}>
                        <td className="py-4 px-6">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm
                                ${isTop1 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                                  isTop2 ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300' :
                                  isTop3 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                                  'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                }
                            `}>
                                {index + 1}
                            </div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="flex flex-col">
                                <span className={`font-bold ${isTop1 ? 'text-amber-700 dark:text-amber-400' : isTop2 ? 'text-slate-800 dark:text-slate-200' : isTop3 ? 'text-orange-700 dark:text-orange-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {intern.name} {isTop1 && '👑'}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{intern.uniqueId || intern.email || 'N/A'}</span>
                            </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                            <span className="font-bold text-slate-700 dark:text-slate-300">{score}</span>
                            {maxScore > 0 && <span className="text-xs text-slate-400 ml-1">/ {maxScore}</span>}
                        </td>
                        <td className="py-4 px-6 text-center">
                            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
                                {percentage}
                            </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold
                                ${status.toLowerCase() === 'submitted' || status.toLowerCase() === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                                  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${status.toLowerCase() === 'submitted' || status.toLowerCase() === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                {status}
                            </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                            <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{submittedAt}</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
};

export default ContestResults;
