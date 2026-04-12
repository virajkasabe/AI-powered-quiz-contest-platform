import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AllInterns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Mock Data
  const [interns, setInterns] = useState([
    { id: 'INT-001', name: 'Alice Johnson', email: 'alice@example.com', domain: 'Frontend', joinDate: '2023-09-15', status: 'Active' },
    { id: 'INT-002', name: 'Bob Smith', email: 'bob@example.com', domain: 'Backend', joinDate: '2023-09-16', status: 'Active' },
    { id: 'INT-003', name: 'Charlie Davis', email: 'charlie@example.com', domain: 'UI/UX', joinDate: '2023-09-18', status: 'Inactive' },
    { id: 'INT-004', name: 'Diana Prince', email: 'diana@example.com', domain: 'Frontend', joinDate: '2023-10-01', status: 'Active' },
    { id: 'INT-005', name: 'Ethan Hunt', email: 'ethan@example.com', domain: 'Data Science', joinDate: '2023-10-10', status: 'Active' },
    { id: 'INT-006', name: 'Fiona Gallagher', email: 'fiona@example.com', domain: 'Backend', joinDate: '2023-10-12', status: 'Inactive' },
  ]);

  const filteredInterns = interns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          intern.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = filterDomain === 'All' || intern.domain === filterDomain;
    const matchesStatus = filterStatus === 'All' || intern.status === filterStatus;
    return matchesSearch && matchesDomain && matchesStatus;
  });

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this intern?')) {
      setInterns(interns.filter(i => i.id !== id));
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all text-slate-700 dark:text-slate-200 shadow-sm placeholder-slate-400 dark:placeholder-slate-500";
  const selectClass = "px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all text-slate-700 dark:text-slate-200 shadow-sm";

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 p-6 md:p-8 lg:p-10 transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent mb-2">
              All Interns
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
              Manage and view all enrolled interns across domains
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
            <div className="relative flex-grow md:flex-grow-0 md:min-w-[250px]">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search interns, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={inputClass}
              />
            </div>
            
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className={selectClass}
            >
              <option value="All">All Domains</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Data Science">Data Science</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={selectClass}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Interns Table */}
        <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
             <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Intern Detail</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Unique ID</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Domain</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Joining Date</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                {filteredInterns.length > 0 ? (
                  filteredInterns.map((intern, index) => (
                    <motion.tr 
                      key={intern.id} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
                            {intern.name.charAt(0)}
                          </div>
                          <div>
                            <p className="scale-100 text-sm font-semibold text-slate-800 dark:text-slate-200">{intern.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{intern.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md">
                          {intern.id}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-700 dark:text-slate-300">{intern.domain}</td>
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{intern.joinDate}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border
                          ${intern.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' 
                            : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700'
                          }`}>
                          {intern.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                           <button 
                             className="p-2 rounded-lg text-slate-400 hover:text-sky-600 border border-transparent hover:border-sky-200 hover:bg-sky-50 dark:hover:border-sky-800 dark:hover:bg-sky-900/30 transition-all"
                             title="View/Edit"
                           >
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                             </svg>
                           </button>
                           <button 
                             className="p-2 rounded-lg text-slate-400 hover:text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 dark:hover:border-red-800 dark:hover:bg-red-900/30 transition-all"
                             title="Delete"
                             onClick={() => handleDelete(intern.id)}
                           >
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                             </svg>
                           </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500 dark:text-slate-400">
                      No interns found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AllInterns;
