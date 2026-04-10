import React, { useState, useMemo } from 'react';

export const MOCK_INTERNS = [
  { id: 1, name: 'Alice Cooper', email: 'alice@example.com', domain: 'Frontend', domainColor: 'text-sky-500 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400', status: 'Active', initial: 'A', initialColor: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400', score: 1450 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', domain: 'Backend', domainColor: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400', status: 'Active', initial: 'B', initialColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', score: 1320 },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', domain: 'Data Science', domainColor: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400', status: 'Inactive', initial: 'C', initialColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400', score: 1540 },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', domain: 'UI/UX', domainColor: 'text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-400', status: 'Active', initial: 'D', initialColor: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400', score: 1210 },
  { id: 5, name: 'Evan Wright', email: 'evan@example.com', domain: 'Frontend', domainColor: 'text-sky-500 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400', status: 'Active', initial: 'E', initialColor: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400', score: 980 },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', domain: 'Backend', domainColor: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400', status: 'Active', initial: 'F', initialColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', score: 1100 },
  { id: 7, name: 'George Halpert', email: 'george@example.com', domain: 'Data Science', domainColor: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400', status: 'Active', initial: 'G', initialColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400', score: 890 },
  { id: 8, name: 'Admin User', email: 'admin@example.com', domain: 'Frontend', domainColor: 'text-sky-500 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400', status: 'Active', initial: 'A', initialColor: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400', score: 450 },
  { id: 9, name: 'Isla Fisher', email: 'isla@example.com', domain: 'UI/UX', domainColor: 'text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-400', status: 'Active', initial: 'I', initialColor: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400', score: 1330 },
  { id: 10, name: 'Jack Reacher', email: 'jack@example.com', domain: 'Backend', domainColor: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400', status: 'Active', initial: 'J', initialColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', score: 1400 },
  { id: 11, name: 'Kelly Kapoor', email: 'kelly@example.com', domain: 'Frontend', domainColor: 'text-sky-500 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400', status: 'Active', initial: 'K', initialColor: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400', score: 1600 },
  { id: 12, name: 'Liam Neeson', email: 'liam@example.com', domain: 'Data Science', domainColor: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400', status: 'Active', initial: 'L', initialColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400', score: 920 },
  { id: 13, name: 'Mona Lisa', email: 'mona@example.com', domain: 'UI/UX', domainColor: 'text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-400', status: 'Active', initial: 'M', initialColor: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400', score: 1515 },
  { id: 14, name: 'Nathan Drake', email: 'nathan@example.com', domain: 'Frontend', domainColor: 'text-sky-500 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400', status: 'Active', initial: 'N', initialColor: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400', score: 1750 },
  { id: 15, name: 'Olivia Pope', email: 'olivia@example.com', domain: 'Backend', domainColor: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400', status: 'Active', initial: 'O', initialColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', score: 1250 },
];

export const DOMAINS = ['Frontend', 'Backend', 'Data Science', 'UI/UX'];

const LeaderboardTable = ({ initialTab = 'overall', initialDomain = 'Frontend', hideControls = false }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);

  const { top10List } = useMemo(() => {
    let pool = MOCK_INTERNS;
    if (activeTab === 'domain') {
        pool = MOCK_INTERNS.filter(intern => intern.domain === selectedDomain);
    }
    const sortedPool = [...pool].sort((a, b) => b.score - a.score);
    const rankedPool = sortedPool.map((intern, index) => ({
        ...intern,
        rank: index + 1
    }));
    return { top10List: rankedPool.slice(0, 10) };
  }, [activeTab, selectedDomain]);

  return (
    <div className="bg-white rounded-3xl border border-sky-100/50 shadow-lg overflow-hidden flex flex-col">
      {!hideControls && (
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex bg-white shadow-sm border border-sky-100/50 rounded-2xl p-1">
            <button 
              onClick={() => setActiveTab('overall')}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === 'overall' ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
              Overall
            </button>
            <button 
              onClick={() => setActiveTab('domain')}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === 'domain' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
              Domain Mode
            </button>
          </div>
          
          {activeTab === 'domain' && (
            <select 
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-4 py-2 border-[1.5px] border-slate-200 rounded-2xl text-sm font-medium text-slate-700 bg-slate-50 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100/50 cursor-pointer shadow-sm">
              {DOMAINS.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          )}
        </div>
      )}
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white dark:bg-slate-900">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 w-20 text-center">Rank</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">Intern</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">Domain</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 text-right">badges</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {top10List.map((intern) => (
              <tr key={intern.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    {intern.rank === 1 ? (
                      <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 flex items-center justify-center font-bold border border-yellow-200 dark:border-yellow-700 shadow-sm">1</div>
                    ) : intern.rank === 2 ? (
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold border border-slate-300 dark:border-slate-600 shadow-sm">2</div>
                    ) : intern.rank === 3 ? (
                      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-500 flex items-center justify-center font-bold border border-orange-200 dark:border-orange-700 shadow-sm">3</div>
                    ) : (
                      <span className="font-semibold text-slate-500 dark:text-slate-400 text-lg">#{intern.rank}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${intern.initialColor}`}>
                      {intern.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        {intern.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{intern.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${intern.domainColor}`}>
                    {intern.domain}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-base text-slate-800 dark:text-slate-200 font-bold bg-slate-50 dark:bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700">{intern.score}</span>
                </td>
              </tr>
            ))}
            
            {top10List.length === 0 && (
                <tr><td colSpan="4" className="text-center py-10 text-slate-500 dark:text-slate-400">No interns found in this category.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
