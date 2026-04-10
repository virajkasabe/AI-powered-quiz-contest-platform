import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
<header className="h-20 shadow-sm border-b border-sky-200/50 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="relative w-full max-w-xs md:w-96">
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search interns, contests..." className="w-full pl-10 pr-4 py-2.5 bg-sky-50 dark:bg-slate-800/50 border border-sky-200/50 dark:border-slate-700/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all font-medium placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-slate-100"/>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        
        {/* Dark Mode Toggle */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          className="w-11 h-11 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-sky-200/50 dark:border-slate-700/50 shadow-lg shadow-sky-100/50 dark:shadow-slate-900/20 flex items-center justify-center transition-all duration-300 hover:bg-sky-50/80 dark:hover:bg-slate-800/80 hover:shadow-xl hover:shadow-sky-200/60 hover:border-sky-300/70 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-1 ring-1 ring-transparent group"
          title="Toggle dark mode"
        >
          <svg className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-colors group-hover:text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {theme === 'dark' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            )}
          </svg>
        </motion.button>

        {/* Notification Button */}
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(prev => !prev)}
            className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all focus:outline-none hover:text-sky-500"
            title="Notifications"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
          </button>

          {notificationsOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-2xl shadow-2xl ring-1 ring-slate-200/50 dark:ring-slate-700/50 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Notifications</h4>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white text-sm mb-1">Quiz Completed Successfully!</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">Great job on JavaScript Fundamentals - 95% score. Badge unlocked!</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">2 minutes ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white text-sm mb-1">"Streak Master" Badge Unlocked</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">5 consecutive days completed. Keep the streak going!</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">1 hour ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white text-sm mb-1">Rank Improved!</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">Frontend domain rank moved from #12 to #8. Excellent performance!</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 p-3">
                <button className="w-full text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 py-2 transition-colors text-center">
                  Mark all as read
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center gap-3 p-1 -m-1 rounded-full cursor-pointer group hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all"
            onClick={() => setProfileOpen(prev => !prev)}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-white flex items-center justify-center font-bold shadow-lg ring-2 ring-white/50">
              A
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">Admin User</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">Super Admin</p>
            </div>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400 transition-colors ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {profileOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-1 z-50"
            >
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-white flex items-center justify-center font-bold shadow-lg">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">Admin User</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin</p>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm font-medium"
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/profile');
                }}
              >
                <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm font-medium">
                <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>

              <div className="border-t border-slate-200 dark:border-slate-700">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-950 transition-colors text-sm font-semibold text-red-600 dark:text-red-400"
                  onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/');
                    setProfileOpen(false);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
