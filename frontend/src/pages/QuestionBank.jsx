import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock questions data
  const mockQuestions = [
    { id: 1, text: "What is the primary purpose of React?", category: 'JavaScript', difficulty: 'easy', tags: ['react', 'fundamentals'] },
    { id: 2, text: "Explain the Virtual DOM and its benefits.", category: 'JavaScript', difficulty: 'medium', tags: ['react', 'performance'] },
    { id: 3, text: "What are React Hooks and name three built-in hooks.", category: 'JavaScript', difficulty: 'easy', tags: ['hooks', 'state'] },
    { id: 4, text: "How does useEffect work with cleanup functions?", category: 'JavaScript', difficulty: 'medium', tags: ['hooks', 'side-effects'] },
    { id: 5, text: "What is the difference between useCallback and useMemo?", category: 'JavaScript', difficulty: 'hard', tags: ['performance', 'hooks'] },
    { id: 6, text: "Implement a custom hook for local storage.", category: 'JavaScript', difficulty: 'hard', tags: ['custom-hooks', 'persistence'] },
    { id: 7, text: "What is React Context and when to use it?", category: 'JavaScript', difficulty: 'medium', tags: ['state', 'context'] },
    { id: 8, text: "Explain React's reconciliation process.", category: 'JavaScript', difficulty: 'hard', tags: ['rendering', 'diffing'] },
    { id: 9, text: "How to optimize React app performance?", category: 'JavaScript', difficulty: 'hard', tags: ['performance', 'optimization'] },
    { id: 10, text: "What is React Server Components?", category: 'JavaScript', difficulty: 'hard', tags: ['ssr', 'nextjs'] },
    { id: 11, text: "CSS-in-JS solutions in React ecosystem.", category: 'CSS', difficulty: 'medium', tags: ['styling', 'cssinjs'] },
    { id: 12, text: "Tailwind CSS utility-first approach benefits.", category: 'CSS', difficulty: 'easy', tags: ['tailwind', 'css'] },
  ];

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setQuestions(mockQuestions);
      setFilteredQuestions(mockQuestions);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...questions];

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
      );
    }

    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === filterDifficulty);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(q => q.category === filterCategory);
    }

    setFilteredQuestions(filtered);
  }, [searchTerm, filterDifficulty, filterCategory, questions]);

  const difficulties = ['all', 'easy', 'medium', 'hard'];
  const categories = ['all', 'JavaScript', 'CSS'];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-100 text-emerald-700';
      case 'medium': return 'bg-amber-100 text-amber-700'; 
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] w-full">
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/90 backdrop-blur-sm shadow-2xl border border-sky-200/50">
          <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
          <p className="text-sky-900 font-semibold">Loading Question Bank...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 font-sans">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-sky-200/50 dark:border-slate-700/50 transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent mb-2">
              Question Bank
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {filteredQuestions.length} of {questions.length} questions
            </p>
          </div>
          
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:flex-1">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search questions or tags..."
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
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Difficulty:</span>
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterDifficulty === diff
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'bg-white/70 hover:bg-sky-50 text-slate-700 hover:shadow-sm hover:border-sky-200'
                }`}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterCategory === cat
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                    : 'bg-white/70 hover:bg-emerald-50 text-slate-700 hover:shadow-sm hover:border-emerald-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Table */}
        {filteredQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-sky-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-md border border-sky-200/50 dark:border-slate-700">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No Questions Found</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              Try adjusting your search terms or filters. There are {questions.length} questions available.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full">
              <thead className="bg-sky-50/50 dark:bg-slate-800/80 transition-colors duration-300">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Question</th>
                  <th className="px-4 py-5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Difficulty</th>
                  <th className="px-4 py-5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-5 text-right text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredQuestions.map((question, index) => (
                  <motion.tr
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-sky-50/50 transition-colors"
                  >
                    <td className="px-6 py-6 max-w-md">
                      <div className="font-medium text-slate-900 dark:text-white line-clamp-2">{question.text}</div>
                    </td>
                    <td className="px-4 py-6">
                      <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-bold border border-sky-200/50">
                        {question.category}
                      </span>
                    </td>
                    <td className="px-4 py-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex flex-wrap gap-1">
                        {question.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-50 text-xs text-slate-600 rounded-lg border border-slate-200/50">
                            #{tag}
                          </span>
                        ))}
                        {question.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs text-slate-400">+{question.tags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right space-x-2">
                      <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold rounded-[10px] shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] active:scale-[0.98] transition-all">
                        View
                      </button>
                      <button className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white text-sm font-bold rounded-[10px] shadow-sm hover:shadow-md active:scale-[0.98] transition-all">
                        Edit
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 pt-8 border-t border-sky-200 flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-green-100 dark:bg-green-900/50 rounded"></span>
            <span>Easy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-yellow-100 dark:bg-yellow-900/50 rounded"></span>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-100 dark:bg-red-900/50 rounded"></span>
            <span>Hard</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-auto">
            Use filters above to narrow down questions
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionBank;
