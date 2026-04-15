import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UpcomingQuiz = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [now, setNow] = useState(new Date());
  const [selectedQuizForStart, setSelectedQuizForStart] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate dynamic dates relative to today for demo purposes
  const getDynamicDateStr = (addMinutes) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + addMinutes);
    return {
      dateObj: d,
      date: d.toISOString().split('T')[0],
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const futureQuiz = getDynamicDateStr(125); // ~2 hours in future
  const activeQuiz = getDynamicDateStr(-10); // 10 minutes in the past (active)

  // Mock data for upcoming quizzes
  const upcomingQuizzes = [
    {
      id: 1,
      title: 'Monthly Frontend Challenge',
      domain: 'Frontend',
      date: activeQuiz.date,
      time: activeQuiz.time,
      duration: '60 mins',
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'React Performance Deep Dive',
      domain: 'Frontend',
      date: futureQuiz.date,
      time: futureQuiz.time,
      duration: '45 mins',
      status: 'Upcoming'
    }
  ];

  // Logic Helpers
  const getTargetDate = (dateStr, timeStr) => {
    return new Date(`${dateStr} ${timeStr}`);
  };

  const getCountdown = (targetDate) => {
    const diff = targetDate - now;
    if (diff <= 0) return null; // Time reached

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 p-8 md:p-10 transition-colors duration-300"
      >
        <div className="mb-10">
          <h1 className="text-4xl font-black bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-2 tracking-tight">
            Upcoming Quiz
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            Prepare for your scheduled domain tests
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {upcomingQuizzes.length > 0 ? (
            upcomingQuizzes.map((quiz, index) => {
              const targetDate = getTargetDate(quiz.date, quiz.time);
              const countdown = getCountdown(targetDate);
              const isTimeReached = countdown === null;

              return (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={quiz.id}
                  className={`flex flex-col xl:flex-row items-center justify-between rounded-3xl p-6 border transition-all duration-300 gap-6 group 
                    ${isTimeReached ? 'bg-white dark:bg-slate-800/80 border-sky-200 dark:border-sky-800/60 hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)]' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/50 hover:shadow-lg'}`}
                >
                  <div className="flex-1 w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                    
                    {/* Title & Domain */}
                    <div className="w-full md:min-w-[220px]">
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">
                        {quiz.domain}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-sky-500 transition-colors truncate">
                        {quiz.title}
                      </h3>
                    </div>

                    {/* Meta Information Container (Flex-wrap for responsiveness) */}
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-6 xl:gap-8 w-full border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700/50 pt-4 md:pt-0 md:pl-6 xl:pl-8">
                       
                       {/* Date & Time */}
                       <div className="flex flex-col gap-1 w-[45%] md:w-auto">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{quiz.date}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{quiz.time}</p>
                      </div>

                      {/* Duration */}
                      <div className="flex flex-col gap-1 w-[45%] md:w-auto md:border-l border-slate-200 dark:border-slate-700/50 md:pl-6 xl:pl-8">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{quiz.duration}</p>
                      </div>

                       {/* Status */}
                      <div className="flex flex-col gap-1 w-[45%] md:w-auto md:border-l border-slate-200 dark:border-slate-700/50 md:pl-6 xl:pl-8">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                        <div className="flex items-center gap-2">
                           <span className={`w-2 h-2 rounded-full ${isTimeReached ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                           <span className={`text-sm font-bold ${isTimeReached ? 'text-emerald-600 dark:text-emerald-500' : 'text-amber-600 dark:text-amber-500'}`}>
                             {isTimeReached ? 'Active Now' : 'Upcoming'}
                           </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="w-full xl:w-auto shrink-0 border-t xl:border-none border-slate-200 dark:border-slate-700/50 pt-5 xl:pt-0 flex flex-col items-center justify-center">
                    {isTimeReached ? (
                      <button
                        onClick={() => setSelectedQuizForStart(quiz)}
                        className="w-full xl:w-[160px] px-6 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        Start Quiz
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    ) : (
                      <div className="flex flex-col items-center gap-2 w-full">
                        <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-50 dark:bg-sky-900/30 px-3 py-1.5 rounded-lg border border-sky-100 dark:border-sky-800/50">
                          Starts in: <span className="font-mono tracking-wider ml-1">{countdown}</span>
                        </p>
                        <button
                          disabled
                          className="w-full xl:w-[160px] px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold rounded-xl cursor-not-allowed border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-sm"
                        >
                          Start Quiz
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl">
              <p className="text-lg font-bold text-slate-400">No upcoming quizzes scheduled.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* INSTRUCTIONS MODAL/POPUP */}
      <AnimatePresence>
        {selectedQuizForStart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuizForStart(null)}
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-sky-50/50 dark:bg-slate-800/30">
                <button 
                   onClick={() => setSelectedQuizForStart(null)}
                   className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 rounded-xl transition-colors"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">
                  {selectedQuizForStart.domain}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white leading-tight">
                  {selectedQuizForStart.title}
                </h2>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>{selectedQuizForStart.date}</span>
                  <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>{selectedQuizForStart.time}</span>
                  <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>{selectedQuizForStart.duration}</span>
                </div>
              </div>

              {/* Instructions Body */}
              <div className="p-8 flex-1">
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-2 h-6 bg-amber-400 rounded-full inline-block"></span>
                  Important Instructions
                </h3>
                
                <ul className="space-y-4">
                  {[
                    "Read all questions carefully before answering. Each question carries equal weight unless specified.",
                    "Do not refresh the page during the quiz. Refreshing may cause you to lose your overall progress.",
                    "The timer will run continuously once the quiz starts. It does not pause if you switch tabs.",
                    "Ensure you submit your answers before the time ends. Unsubmitted answers may not be scored.",
                    "Follow all quiz and domain rules properly. Suspicious behavior will be flagged."
                  ].map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-slate-600 dark:text-slate-300">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <p className="text-sm leading-relaxed">{rule}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/10 flex flex-col sm:flex-row justify-end gap-4 mt-auto rounded-b-[2rem]">
                <button 
                  onClick={() => setSelectedQuizForStart(null)}
                  className="px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setSelectedQuizForStart(null);
                    navigate('/quiz');
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] active:scale-[0.98] transition-all"
                >
                  I Understand, Start Exam
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpcomingQuiz;
