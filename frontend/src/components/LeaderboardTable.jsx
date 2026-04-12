import React, { useState, useMemo } from 'react';

export const MOCK_INTERNS = [
  { id: 1, name: 'Alice Cooper', email: 'alice@example.com', domain: 'Frontend', domainColor: 'text-sky-500 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400', status: 'Active', initial: 'A', initialColor: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400', totalScore: 1450, quizzesAttempted: 15, avgScore: 96, badges: 3 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', domain: 'Backend', domainColor: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400', status: 'Active', initial: 'B', initialColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', totalScore: 1320, quizzesAttempted: 14, avgScore: 94, badges: 2 },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', domain: 'Data Science', domainColor: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400', status: 'Needs Review', initial: 'C', initialColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400', totalScore: 540, quizzesAttempted: 8, avgScore: 67, badges: 0 },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', domain: 'UI/UX', domainColor: 'text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-400', status: 'Active', initial: 'D', initialColor: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400', totalScore: 1210, quizzesAttempted: 13, avgScore: 93, badges: 2 },
  { id: 5, name: 'Evan Wright', email: 'evan@example.com', domain: 'Frontend', domainColor: 'text-sky-500 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400', status: 'Active', initial: 'E', initialColor: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400', totalScore: 980, quizzesAttempted: 11, avgScore: 89, badges: 1 },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', domain: 'Backend', domainColor: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400', status: 'Inactive', initial: 'F', initialColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', totalScore: 1100, quizzesAttempted: 12, avgScore: 91, badges: 1 },
  { id: 7, name: 'George Halpert', email: 'george@example.com', domain: 'Data Science', domainColor: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400', status: 'Needs Review', initial: 'G', initialColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400', totalScore: 890, quizzesAttempted: 11, avgScore: 80, badges: 1 },
];

export const DOMAINS = ['All Domains', 'Frontend', 'Backend', 'Data Science', 'UI/UX'];
export const STATUSES = ['All Statuses', 'Active', 'Inactive', 'Needs Review'];

const LeaderboardTable = () => {
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInterns = useMemo(() => {
    let pool = MOCK_INTERNS;
    
    if (selectedDomain !== 'All Domains') {
      pool = pool.filter(intern => intern.domain === selectedDomain);
    }
    
    if (selectedStatus !== 'All Statuses') {
      pool = pool.filter(intern => intern.status === selectedStatus);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(intern => intern.name.toLowerCase().includes(q) || intern.email.toLowerCase().includes(q));
    }

    const sortedPool = [...pool].sort((a, b) => b.totalScore - a.totalScore);
    const rankedPool = sortedPool.map((intern, index) => ({
      ...intern,
      rank: index + 1
    }));
    
    return rankedPool;
  }, [selectedDomain, selectedStatus, searchQuery]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-sky-100/50 dark:border-slate-700 shadow-lg overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 gap-4">
        <div className="relative w-full md:w-64">
           <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </span>
           <input 
             type="text" 
             placeholder="Search by name or email" 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-9 pr-4 py-2 border-[1.5px] border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100/50 outline-none shadow-sm transition-all" 
           />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border-[1.5px] border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100/50 outline-none cursor-pointer shadow-sm">
            {DOMAINS.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border-[1.5px] border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100/50 outline-none cursor-pointer shadow-sm">
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-16 text-center">Rank</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Intern</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Metrics</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredInterns.map((intern) => (
              <tr key={intern.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-5 py-4 text-center align-middle">
                  <div className="flex justify-center">
                    {intern.rank === 1 ? (
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 flex items-center justify-center font-black border border-yellow-200 dark:border-yellow-700 shadow-sm">1</div>
                    ) : intern.rank === 2 ? (
                      <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-black border border-slate-300 dark:border-slate-600 shadow-sm">2</div>
                    ) : intern.rank === 3 ? (
                      <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-500 flex items-center justify-center font-black border border-orange-200 dark:border-orange-700 shadow-sm">3</div>
                    ) : (
                      <span className="font-semibold text-slate-500 dark:text-slate-400 text-sm">{intern.rank}</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{intern.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{intern.email}</p>
                    <span className={`w-fit mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${intern.domainColor}`}>
                      {intern.domain}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 align-middle">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                     <p className="text-slate-500 dark:text-slate-400">Total Score: <span className="font-bold text-slate-800 dark:text-slate-200">{intern.totalScore}</span></p>
                     <p className="text-slate-500 dark:text-slate-400">Avg Score: <span className="font-bold text-slate-800 dark:text-slate-200">{intern.avgScore}%</span></p>
                     <p className="text-slate-500 dark:text-slate-400">Quizzes: <span className="font-bold text-slate-800 dark:text-slate-200">{intern.quizzesAttempted}</span></p>
                     <p className="text-slate-500 dark:text-slate-400">Badges: <span className="font-bold text-amber-500 dark:text-amber-400">{intern.badges} 🏆</span></p>
                  </div>
                </td>
                <td className="px-5 py-4 align-middle">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                    intern.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' :
                    intern.status === 'Needs Review' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' :
                    'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700'
                  }`}>
                    {intern.status}
                  </span>
                </td>
                <td className="px-5 py-4 align-middle text-right">
                   <div className="flex justify-end gap-2">
                     <button className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg transition-all" title="View Profile">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                     </button>
                     <button className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg transition-all" title="View Quiz History">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     </button>
                     <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 text-[11px] font-bold rounded-lg shadow-sm transition-all" title="Review Performance">
                       Review
                     </button>
                   </div>
                </td>
              </tr>
            ))}
            
            {filteredInterns.length === 0 && (
                <tr><td colSpan="5" className="text-center py-10 text-slate-500 dark:text-slate-400">No interns match the current filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
