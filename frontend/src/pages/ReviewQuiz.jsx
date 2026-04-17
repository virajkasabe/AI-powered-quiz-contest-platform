import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const ReviewQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');

  // Submissions State
  const [submissions, setSubmissions] = useState([
    { id: 1, quizTitle: 'Frontend Basics', internName: 'Alice Johnson', domain: 'Frontend', score: 85, date: '2023-11-01', status: 'Pending Review' },
    { id: 2, quizTitle: 'Data Structures', internName: 'Bob Smith', domain: 'Backend', score: 60, date: '2023-11-02', status: 'Reviewed' },
    { id: 3, quizTitle: 'UI Principles', internName: 'Charlie Davis', domain: 'UI/UX', score: 92, date: '2023-11-03', status: 'Pending Review' },
    { id: 4, quizTitle: 'React Hooks', internName: 'Diana Prince', domain: 'Frontend', score: 78, date: '2023-11-04', status: 'Pending Review' },
    { id: 5, quizTitle: 'Machine Learning Basics', internName: 'Ethan Hunt', domain: 'Data Science', score: 95, date: '2023-11-05', status: 'Reviewed' },
  ]);

  // Details View State
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [replacingQuestionId, setReplacingQuestionId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (location.state?.newContest) {
      const contest = location.state.newContest;
      const newSubmission = {
        id: Date.now(),
        quizTitle: contest.title || 'Untitled Contest',
        internName: 'Admin Created',
        domain: contest.category || 'General',
        score: contest.marks || 100,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending Review',
      };
      
      setSubmissions(prev => [newSubmission, ...prev]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.internName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sub.quizTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = filterDomain === 'All' || sub.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  const domains = ['All', 'Frontend', 'Backend', 'UI/UX', 'Data Science'];

  const handleReview = async (quiz) => {
    setSelectedQuiz(quiz);
    setLoadingDetails(true);
    try {
      // Mock API call to get quiz questions
      await new Promise(resolve => setTimeout(resolve, 800));
      setQuestions([
        { id: 101, text: "What is React?", type: "MCQ", options: ["A Library", "A Framework", "A Language", "An OS"], correct: "A Library", selected: "A Library" },
        { id: 102, text: "How do you manage local state in functional components?", type: "MCQ", options: ["useState", "useEffect", "useContext", "Redux"], correct: "useState", selected: "useEffect" },
        { id: 103, text: "Is JavaScript a single-threaded language?", type: "True/False", options: ["True", "False"], correct: "True", selected: "True" },
      ]);
    } catch (error) {
      alert("Failed to load quiz details.");
      setSelectedQuiz(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleReplaceQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to replace this question?")) return;
    
    setReplacingQuestionId(questionId);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Optimistic update
      setQuestions(prev => prev.map(q => 
        q.id === questionId 
        ? { ...q, text: "Newly assigned dummy question from question bank?", options: ["Option A", "Option B", "Option C", "Option D"], correct: "Option A", selected: null } 
        : q
      ));
      
      setToastMessage("Question replaced successfully!");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error) {
      alert("Failed to replace question.");
    } finally {
      setReplacingQuestionId(null);
    }
  };

  const renderDetailsView = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setSelectedQuiz(null)}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white">Review: {selectedQuiz.quizTitle}</h1>
          <p className="text-slate-500 dark:text-slate-400">Intern: <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedQuiz.internName}</span> • Domain: {selectedQuiz.domain}</p>
        </div>
      </div>

      {toastMessage && (
        <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <p className="text-emerald-800 dark:text-emerald-400 font-medium">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-bold text-sm transition-colors">Dismiss</button>
        </div>
      )}

      {loadingDetails ? (
        <div className="flex flex-col items-center justify-center py-20">
           <svg className="w-12 h-12 text-sky-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           <p className="mt-4 text-slate-500 font-medium">Loading Quiz Details...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/50">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 text-xs font-bold rounded-full mb-2">Q{index + 1} • {q.type}</span>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{q.text}</h3>
                </div>
                <button 
                  onClick={() => handleReplaceQuestion(q.id)}
                  disabled={replacingQuestionId === q.id}
                  className="shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 hover:dark:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl transition-all disabled:opacity-50"
                >
                  {replacingQuestionId === q.id ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Replacing...</>
                  ) : 'Replace Question'}
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                 {q.options.map((opt, i) => (
                    <div key={i} className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-mono text-slate-400 dark:text-slate-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </div>
                 ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 text-sm">
                 <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Correct Answer:</span>
                    <span className="px-2.5 py-1 bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg font-medium">{q.correct}</span>
                 </div>
                 {q.selected && (
                   <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-500 dark:text-slate-400">Selected Answer:</span>
                      <span className={`px-2.5 py-1 rounded-lg font-medium ${q.selected === q.correct ? 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100/50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{q.selected}</span>
                   </div>
                 )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
      <AnimatePresence mode="wait">
        {selectedQuiz ? renderDetailsView() : (
           <motion.div
             key="list"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 p-6 md:p-8 lg:p-10 transition-colors duration-300"
           >
             {/* Header */}
             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
               <div>
                 <h1 className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent mb-2">
                   Review Quizzes
                 </h1>
                 <p className="text-slate-500 dark:text-slate-400 text-lg">
                   {filteredSubmissions.length} of {submissions.length} submissions
                 </p>
               </div>
               
               {/* Search */}
               <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:flex-1">
                 <div className="relative flex-1">
                   <input
                     type="text"
                     placeholder="Search intern or quiz..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-[1.5px] border-slate-200 dark:border-slate-700 rounded-[14px] focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100/50 transition-all text-lg placeholder-slate-400 dark:placeholder-slate-500 dark:text-slate-100 text-slate-800"
                   />
                   <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                 </div>
               </div>
             </div>
     
             {/* Filters */}
             <div className="flex flex-wrap gap-4 mb-8 p-4 bg-sky-50/50 dark:bg-slate-800/50 rounded-2xl border border-sky-200/50 dark:border-slate-700/50 shadow-sm transition-colors duration-300">
               <div className="flex items-center gap-2">
                 <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Domain:</span>
                 {domains.map(domain => (
                   <button
                     key={domain}
                     onClick={() => setFilterDomain(domain)}
                     className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                       filterDomain === domain
                         ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                         : 'bg-white/70 hover:bg-sky-50 text-slate-700 hover:shadow-sm hover:border-sky-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                     }`}
                   >
                     {domain}
                   </button>
                 ))}
               </div>
             </div>
     
             {/* Table Card */}
             {filteredSubmissions.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-24 text-center">
                 <div className="w-24 h-24 bg-sky-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-md border border-sky-200/50 dark:border-slate-700">
                   <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                   </svg>
                 </div>
                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No Submissions Found</h2>
                 <p className="text-slate-500 dark:text-slate-400 max-w-md">
                   Try adjusting your search terms or filters.
                 </p>
               </div>
             ) : (
               <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                 <table className="w-full whitespace-nowrap">
                   <thead className="bg-sky-50/50 dark:bg-slate-800/80 transition-colors duration-300">
                     <tr>
                       <th className="px-6 py-5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Quiz Title / Intern</th>
                       <th className="px-4 py-5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Domain</th>
                       <th className="px-4 py-5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Date</th>
                       <th className="px-4 py-5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Status</th>
                       <th className="px-6 py-5 text-right text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                     {filteredSubmissions.map((sub, index) => (
                       <motion.tr
                         key={sub.id}
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: index * 0.05 }}
                         className="hover:bg-sky-50/50 dark:hover:bg-slate-800/50 transition-colors"
                       >
                         <td className="px-6 py-6 max-w-md">
                           <div className="font-medium text-slate-900 dark:text-white line-clamp-2">{sub.quizTitle}</div>
                           <div className="flex items-center gap-2 mt-2">
                             <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-700 dark:text-sky-300 font-bold text-[10px]">
                               {sub.internName.charAt(0)}
                             </div>
                             <span className="text-xs text-slate-500 dark:text-slate-400">{sub.internName}</span>
                           </div>
                         </td>
                         <td className="px-4 py-6">
                           <span className="px-3 py-1 bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 rounded-full text-sm font-bold border border-sky-200/50 dark:border-sky-800/50">
                             {sub.domain}
                           </span>
                         </td>
                         <td className="px-4 py-6 text-sm text-slate-600 dark:text-slate-400">
                           {sub.date}
                         </td>
                         <td className="px-4 py-6">
                           <span className={`px-3 py-1 rounded-full text-xs font-bold
                             ${sub.status === 'Reviewed' 
                               ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                               : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                             }`}>
                             {sub.status.toUpperCase()}
                           </span>
                         </td>
                         <td className="px-6 py-6 text-right space-x-2">
                           <button 
                             onClick={() => handleReview(sub)}
                             className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] active:scale-[0.98] transition-all"
                           >
                             Review
                           </button>
                         </td>
                       </motion.tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             )}
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewQuiz;
