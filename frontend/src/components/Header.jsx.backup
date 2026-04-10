import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0 transition-colors">
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
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search interns, contests..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/20 transition-all font-medium placeholder-slate-400 dark:text-slate-200"/>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="text-slate-400 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all w-10 h-10 rounded-full flex items-center justify-center hover:bg-sky-50/50 dark:hover:bg-slate-800 shadow-sm"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>

        <button className="hidden sm:flex text-slate-400 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all w-10 h-10 rounded-full items-center justify-center hover:bg-sky-50/50 dark:hover:bg-slate-800 shadow-sm">
           <svg className="w-6 h-6 outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold border-2 border-sky-200 dark:border-sky-800 group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="hidden min-[450px]:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Admin User</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">Superadmin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
