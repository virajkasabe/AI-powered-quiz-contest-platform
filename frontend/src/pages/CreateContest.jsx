import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateContest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: '',
    type: 'MCQ',
    description: '',
    date: '',
    startTime: '',
    duration: '',
    domain: '',
    totalQuestions: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.editContest) {
      setFormData(prev => ({ ...prev, ...location.state.editContest }));
      // Clear route state to prevent refilling on reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.type.trim()) newErrors.type = 'Type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';
    if (!formData.startTime.trim()) newErrors.startTime = 'Start Time is required';
    if (!formData.duration || Number(formData.duration) <= 0) newErrors.duration = 'Duration must be a positive value';
    if (!formData.domain.trim()) newErrors.domain = 'Domain is required';
    if (!formData.totalQuestions || isNaN(formData.totalQuestions) || Number(formData.totalQuestions) <= 0) {
      newErrors.totalQuestions = 'Question Count must be a positive number';
    }

    if (formData.date && formData.startTime) {
      const selectedDateTime = new Date(`${formData.date}T${formData.startTime}`);
      if (selectedDateTime < new Date()) {
        newErrors.date = 'Date and Time cannot be in the past';
        newErrors.startTime = 'Date and Time cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Mock API call - replace with real endpoint
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Navigate to review-question page and pass the created contest data
      navigate('/review-question', { state: { newContest: formData } });
    } catch (error) {
      setErrors({ submit: 'Failed to create contest. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Discard changes?')) {
      navigate('/contests');
    }
  };

  const types = ['MCQ', 'Coding', 'Mixed'];
  const domains = ['Frontend', 'Backend', 'Data Science', 'UI/UX Design', 'DevOps', 'Other'];

  const inputClass = "w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all text-slate-700 dark:text-slate-200 shadow-sm placeholder-slate-400 dark:placeholder-slate-500";
  const errorInputClass = "w-full px-4 py-3 bg-red-50 dark:bg-red-900/10 border border-red-300 dark:border-red-500/50 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-slate-700 dark:text-slate-200 shadow-sm";

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 lg:p-10 transition-colors duration-300"
      >
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent mb-2">
            {location.state?.editContest ? 'Edit Contest' : 'Create Contest'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Configure your contest details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <h2 className="md:col-span-2 text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-2">
              <span className="w-8 h-8 font-semibold text-sm bg-sky-100 dark:bg-sky-900/50 rounded-lg flex items-center justify-center text-sky-600">
                1
              </span>
              Basic Information
            </h2>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Contest Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? errorInputClass : inputClass}
                placeholder="e.g. Monthly Frontend Challenge"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Contest Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} className={errors.type ? errorInputClass : inputClass}>
                <option value="" disabled>Select Type</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description *</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className={`${errors.description ? errorInputClass : inputClass} resize-y`}
                placeholder="Briefly describe your contest..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>

          {/* Section 2: Schedule */}
          <div className="grid md:grid-cols-3 gap-6 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <h2 className="md:col-span-3 text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-2">
              <span className="w-8 h-8 font-semibold text-sm bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center text-emerald-600">
                2
              </span>
              Schedule
            </h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date *</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                className={errors.date ? errorInputClass : inputClass} 
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Start Time *</label>
              <input 
                type="time" 
                name="startTime" 
                value={formData.startTime} 
                onChange={handleChange} 
                className={errors.startTime ? errorInputClass : inputClass} 
              />
              {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Duration (mins) *</label>
              <input 
                type="number" 
                name="duration" 
                value={formData.duration} 
                onChange={handleChange} 
                className={errors.duration ? errorInputClass : inputClass} 
                placeholder="60" 
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>
          </div>

          {/* Section 3: Contest Setup */}
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <h2 className="md:col-span-2 text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-2">
              <span className="w-8 h-8 font-semibold text-sm bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center text-purple-600">
                3
              </span>
              Contest Setup
            </h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Domain *</label>
              <select name="domain" value={formData.domain} onChange={handleChange} className={errors.domain ? errorInputClass : inputClass}>
                <option value="" disabled>Select Domain</option>
                {domains.map(dom => <option key={dom} value={dom}>{dom}</option>)}
              </select>
              {errors.domain && <p className="mt-1 text-sm text-red-600">{errors.domain}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Question Count *</label>
              <input 
                type="number" 
                name="totalQuestions" 
                value={formData.totalQuestions} 
                onChange={handleChange} 
                min="1" 
                className={errors.totalQuestions ? errorInputClass : inputClass} 
                placeholder="50" 
              />
              {errors.totalQuestions && <p className="mt-1 text-sm text-red-600">{errors.totalQuestions}</p>}
            </div>
          </div>

          {/* Actions */}
          {errors.submit && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">{errors.submit}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-end border-t border-slate-200 dark:border-slate-700/50 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all shadow-sm order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 order-1 sm:order-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Contest'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateContest;
