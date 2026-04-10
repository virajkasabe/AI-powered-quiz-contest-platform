import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Rewards = () => {
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API call or localStorage
    const mockData = {
      totalPoints: 2840,
      level: 'Silver',
      nextLevelPoints: 3500,
      badges: [
        { id: 1, name: 'First Quiz', icon: '🥇', date: '2 days ago', description: 'Complete your first quiz' },
        { id: 2, name: 'Streak Master', icon: '🔥', date: '1 week ago', description: '5 day streak achieved' },
        { id: 3, name: 'Domain Expert', icon: '🎯', date: '3 weeks ago', description: 'Top 10% in domain' },
      ],
      achievements: [
        { name: '10 Quizzes', progress: 10, target: 10, completed: true },
        { name: '50 Points', progress: 28, target: 50, completed: false },
        { name: '5 Badges', progress: 3, target: 5, completed: false },
      ]
    };

    // Simulate API delay
    const timer = setTimeout(() => {
      setRewards(mockData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] w-full">
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/95 backdrop-blur-sm shadow-2xl border border-sky-100/50">
          <div className="w-12 h-12 border-4 border-amber-100 dark:border-slate-700 border-t-amber-500 dark:border-t-amber-400 rounded-full animate-spin"></div>
          <p className="text-slate-800 dark:text-slate-200 font-semibold">Loading Rewards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] p-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 max-w-sm text-center border">
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Rewards Unavailable</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 px-6 rounded-xl font-bold">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 font-sans">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl bg-white rounded-3xl shadow-xl p-8 border border-sky-200/50"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-lg mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
              🏆
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Your Rewards</h1>
              <p className="text-amber-100">Keep earning to unlock more achievements</p>
            </div>
          </div>
          
          {/* Points & Level */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-3xl text-white shadow-2xl">
              <p className="text-purple-100 text-sm uppercase font-bold tracking-wide mb-2">Total Points</p>
              <div className="text-4xl font-black mb-2">{rewards.totalPoints.toLocaleString()}</div>
              <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[75%] rounded-full shadow-inner" style={{width: '75%'}}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl text-white shadow-2xl">
              <p className="text-emerald-100 text-sm uppercase font-bold tracking-wide mb-2">Member Level</p>
              <div className="text-3xl font-black">{rewards.level}</div>
              <p className="text-sm opacity-90">
                {rewards.nextLevelPoints - rewards.totalPoints} points to Gold
              </p>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center text-amber-500">
              🏅
            </span>
            Earned Badges ({rewards.badges.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-white/80 p-8 rounded-3xl border border-sky-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all shadow-lg cursor-pointer hover:border-sky-200 hover:shadow-sky-200/20 backdrop-blur-sm"
              >
                <div className="text-4xl mb-4 flex justify-center">{badge.icon}</div>
                <h3 className="font-black text-xl text-slate-800 dark:text-white mb-2 text-center">{badge.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 text-center">{badge.description}</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wide text-center">
                  Earned {badge.date}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-500">
              📊
            </span>
            Progress ({rewards.achievements.length})
          </h2>
          <div className="space-y-4">
            {rewards.achievements.map((achievement, index) => (
              <div key={index} className="group flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0 ${
                  achievement.completed 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}>
                  {achievement.completed ? '✓' : `${achievement.progress}/${achievement.target}`}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 dark:text-white text-lg">{achievement.name}</h4>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mt-2 overflow-hidden group-hover:bg-slate-300 dark:group-hover:bg-slate-600">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        achievement.completed ? 'bg-emerald-500 shadow-md' : 'bg-sky-500'
                      }`}
                      style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Rewards;
