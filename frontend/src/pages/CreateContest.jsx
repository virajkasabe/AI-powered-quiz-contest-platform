import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateContest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'public',
    schedule: '',
    duration: '',
    level: 'beginner',
    totalQuestions: '',
    marks: '',
    passingMarks: '',
    category: '',
    rewards: '',
    status: 'draft',
    visibility: 'public',
    instructions: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (location.state?.editContest) {
      setFormData(prev => ({ ...prev, ...location.state.editContest }));
      // Clear route state to prevent refilling on reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ ...errors, image: 'File size must be less than 5MB' });
        return;
      }
      setFormData({ ...formData, image: file });
      setImagePreview(file ? URL.createObjectURL(file) : null);
      setErrors({ ...errors, image: '' });
    } else {
      setFormData({ ...formData, [name]: value });
      if (errors[name]) setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.totalQuestions || formData.totalQuestions <= 0) newErrors.totalQuestions = 'Total questions must be positive';
    if (!formData.marks || formData.marks <= 0) newErrors.marks = 'Marks must be positive';
    if (formData.passingMarks && (parseFloat(formData.passingMarks) > parseFloat(formData.marks))) {
      newErrors.passingMarks = 'Passing marks cannot exceed total marks';
    }
    if (formData.duration && !/^\d{1,3}(:\d{2})?$/.test(formData.duration)) {
      newErrors.duration = 'Duration format: 30 or 1:30 (minutes)';
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
      
      // Navigate to review-quiz page and pass the created contest data
      navigate('/review-quiz', { state: { newContest: formData } });
    } catch (error) {
      setErrors({ submit: 'Failed to create contest. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Discard changes?')) {
      navigate('/contests');
    }
  };

  const handleReset = () => {
    setFormData({
      title: '', description: '', type: 'public', schedule: '', duration: '',
      level: 'beginner', totalQuestions: '', marks: '', passingMarks: '',
      category: '', rewards: '', status: 'draft', visibility: 'public',
      instructions: '', image: null
    });
    setImagePreview(null);
    setErrors({});
  };

  const levels = ['beginner', 'intermediate', 'advanced'];
  const types = ['public', 'private', 'internal'];
  const statuses = ['draft', 'active', 'completed', 'cancelled'];
  const visibilities = ['public', 'private', 'team'];

  const inputClass = "w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all text-slate-700 dark:text-slate-200 shadow-sm placeholder-slate-400 dark:placeholder-slate-500";
  const errorInputClass = "w-full px-4 py-3 bg-red-50 dark:bg-red-900/10 border border-red-300 dark:border-red-500/50 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-slate-700 dark:text-slate-200 shadow-sm";

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 lg:p-10 transition-colors duration-300"
      >
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent mb-2">
            {location.state?.editContest ? 'Replace Contest' : 'Create Contest'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            {location.state?.editContest ? 'Update the details for your chosen contest' : 'Set up your contest details and engage your participants'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
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
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Contest Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className={inputClass}>
                {types.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description *</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`${errors.description ? errorInputClass : inputClass} resize-y`}
                placeholder="Briefly describe your contest..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>

          {/* Schedule & Settings */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <h2 className="md:col-span-2 lg:col-span-3 text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-2">
              <span className="w-8 h-8 font-semibold text-sm bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center text-emerald-600">
                2
              </span>
              Schedule & Settings
            </h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Start Date & Time</label>
              <input type="datetime-local" name="schedule" value={formData.schedule} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Duration (mins)</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className={errors.duration ? errorInputClass : inputClass} placeholder="60" />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Difficulty</label>
              <select name="level" value={formData.level} onChange={handleChange} className={inputClass}>
                {levels.map(level => <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Total Questions *</label>
              <input type="number" name="totalQuestions" value={formData.totalQuestions} onChange={handleChange} min="1" className={errors.totalQuestions ? errorInputClass : inputClass} placeholder="50" />
              {errors.totalQuestions && <p className="mt-1 text-sm text-red-600">{errors.totalQuestions}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Total Marks *</label>
              <input type="number" name="marks" value={formData.marks} onChange={handleChange} min="1" className={errors.marks ? errorInputClass : inputClass} placeholder="100" />
              {errors.marks && <p className="mt-1 text-sm text-red-600">{errors.marks}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Passing Marks</label>
              <input type="number" name="passingMarks" value={formData.passingMarks} onChange={handleChange} min="0" className={errors.passingMarks ? errorInputClass : inputClass} placeholder="60" />
              {errors.passingMarks && <p className="mt-1 text-sm text-red-600">{errors.passingMarks}</p>}
            </div>
          </div>

          {/* Category & Advanced */}
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <h2 className="md:col-span-2 text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-2">
              <span className="w-8 h-8 font-semibold text-sm bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center text-purple-600">
                3
              </span>
              Category & Visibility
            </h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Category *</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className={errors.category ? errorInputClass : inputClass} placeholder="e.g. Frontend" />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                {statuses.map(st => <option key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Visibility</label>
              <select name="visibility" value={formData.visibility} onChange={handleChange} className={inputClass}>
                {visibilities.map(vis => <option key={vis} value={vis}>{vis.charAt(0).toUpperCase() + vis.slice(1)}</option>)}
              </select>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-4">
              <span className="w-8 h-8 font-semibold text-sm bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center text-orange-600">
                4
              </span>
              Instructions
            </h2>
            <textarea
              name="instructions"
              rows="6"
              value={formData.instructions}
              onChange={handleChange}
              className={`${inputClass} flex-1 resize-y`}
              placeholder="Special guidelines, rules or instructions..."
            />
          </div>

          {/* Actions */}
          {errors.submit && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">{errors.submit}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all shadow-sm"
            >
              Reset Form
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 bg-slate-500 hover:bg-slate-600 text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(100,116,139,0.3)] hover:shadow-[0_6px_16px_rgba(100,116,139,0.4)] active:scale-[0.98] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_16px_rgba(14,165,233,0.4)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
