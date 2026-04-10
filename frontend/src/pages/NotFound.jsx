import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-24 h-24 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <span className="text-4xl">🛸</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-2">404</h1>
      <h2 className="text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400 mb-4">Page Not Found</h2>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
        Oops! The page you are looking for seems to have drifted into deep space. 
        It might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button 
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
