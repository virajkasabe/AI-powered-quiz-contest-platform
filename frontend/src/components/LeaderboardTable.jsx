import React, { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';

const LeaderboardTable = ({ initialTab = 'overall', initialDomain = '', hideControls = false }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let endpoint = "/leaderboard/overall";
        if (initialTab === 'domain' && initialDomain) {
          endpoint = `/leaderboard/domain/${initialDomain}`;
        }
        
        const response = await apiCall(endpoint);
        if (response && response.success) {
          // Flatten data if needed. InternLeaderboard expects data in response.data
          setLeaderboardData(response.data.slice(0, 10)); // Top 10 for dashboard
        }
      } catch (err) {
        console.error("Leaderboard fetch failed:", err);
        setError("Could not load rankings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialTab, initialDomain]);

  const filteredInterns = leaderboardData.filter(intern => 
    intern.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    intern.uniqueId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-sky-100/50 dark:border-slate-700 p-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
        <p className="mt-4 text-slate-500 font-medium">Loading standings...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-sky-100/50 dark:border-slate-700 shadow-lg overflow-hidden flex flex-col">
      {!hideControls && (
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 gap-4">
          <div className="relative w-full md:w-64">
             <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </span>
             <input 
               type="text" 
               placeholder="Search by name or ID" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-9 pr-4 py-2 border-[1.5px] border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100/50 outline-none shadow-sm transition-all" 
             />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-16 text-center">Rank</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Intern</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center">Domain</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">Badges</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredInterns.map((intern, index) => (
              <tr key={intern.uniqueId || index} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-5 py-4 text-center align-middle">
                  <div className="flex justify-center">
                    {index === 0 ? (
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 flex items-center justify-center font-black border border-yellow-200 dark:border-yellow-700 shadow-sm">1</div>
                    ) : index === 1 ? (
                      <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-black border border-slate-300 dark:border-slate-600 shadow-sm">2</div>
                    ) : index === 2 ? (
                      <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-500 flex items-center justify-center font-black border border-orange-200 dark:border-orange-700 shadow-sm">3</div>
                    ) : (
                      <span className="font-semibold text-slate-500 dark:text-slate-400 text-sm">{index + 1}</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{intern.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">{intern.uniqueId}</p>
                  </div>
                </td>
                <td className="px-5 py-4 align-middle text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                      {intern.domain}
                    </span>
                </td>
                <td className="px-5 py-4 align-middle text-right">
                    <div className="flex items-center justify-end gap-1.5 font-black text-slate-700 dark:text-slate-200">
                        {intern.badgesEarned}
                        <span className="text-amber-500">🏆</span>
                    </div>
                </td>
              </tr>
            ))}
            
            {(filteredInterns.length === 0 && !error) && (
                <tr><td colSpan="4" className="text-center py-10 text-slate-500 dark:text-slate-400">No interns found.</td></tr>
            )}

            {error && (
                <tr><td colSpan="4" className="text-center py-10 text-red-500 font-bold">{error}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
