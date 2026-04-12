import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const UploadInterns = () => {
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);
  const [parsedData, setParsedData] = useState([]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => { setIsDragOver(false); };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    const validTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.xlsx')) {
      alert("Invalid file type. Please upload a CSV or Excel file.");
      return;
    }

    setFile(selectedFile);
    setUploadStatus(null);
    setTimeout(() => {
      setParsedData([
        { name: 'John Doe', email: 'john@example.com', domain: 'Frontend' },
        { name: 'Jane Smith', email: 'jane@example.com', domain: 'Backend' },
        { name: 'Michael Ray', email: 'michael@example.com', domain: 'Data Science' },
      ]);
    }, 600);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file || parsedData.length === 0) return;
    setIsUploading(true);
    setUploadStatus(null);
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus('success');
      setFile(null);
      setParsedData([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 2000);
  };

  const handleCancel = () => {
    setFile(null);
    setParsedData([]);
    setUploadStatus(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 p-6 md:p-8 lg:p-10 transition-colors duration-300"
      >
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent mb-2">
            Upload Interns
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Bulk import interns via CSV or Excel file
          </p>
        </div>

        {uploadStatus === 'success' && (
          <div className="mb-8 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <p className="text-emerald-800 dark:text-emerald-400 font-medium">Successfully imported interns!</p>
            </div>
            <button onClick={() => setUploadStatus(null)} className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-bold text-sm transition-colors">
              Dismiss
            </button>
          </div>
        )}

        <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8">
          <div 
            className={`
              w-full min-h-[300px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all cursor-pointer bg-white dark:bg-slate-800/50
              ${isDragOver 
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20 shadow-inner' 
                : 'border-slate-300 dark:border-slate-600 hover:border-sky-400 dark:hover:border-sky-500'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
            />
            
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm mb-6 text-sky-500 dark:text-sky-400 transition-transform hover:scale-105">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {file ? file.name : 'Click or Drag & Drop'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm text-center max-w-sm">
              {file 
                ? `${(file.size / 1024).toFixed(2)} KB selected.` 
                : 'Upload a CSV or Excel file containing intern details (Name, Email, Domain).'}
            </p>
          </div>

          {/* Preview Section */}
          {parsedData.length > 0 && !isUploading && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8"
            >
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 px-2">Data Preview</h4>
              <div className="bg-white dark:bg-slate-800/80 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                    <tr>
                      <th className="py-4 px-6 font-bold uppercase text-xs">Name</th>
                      <th className="py-4 px-6 font-bold uppercase text-xs">Email</th>
                      <th className="py-4 px-6 font-bold uppercase text-xs">Domain</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {parsedData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                        <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200">{row.name}</td>
                        <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{row.email}</td>
                        <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{row.domain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-slate-200/50 dark:border-slate-700/50 pt-6">
            <button 
              onClick={handleCancel}
              disabled={isUploading}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all shadow-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleImport}
              disabled={!file || parsedData.length === 0 || isUploading}
              className="w-full sm:w-auto px-8 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Importing...
                </>
              ) : (
                'Import Data'
              )}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default UploadInterns;
