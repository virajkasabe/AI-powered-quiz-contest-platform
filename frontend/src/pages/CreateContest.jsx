import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CreateContest = () => {
  const navigate = useNavigate();
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      // TODO: FormData for image upload to /api/admin/contests
      alert('Contest created successfully!');
      navigate('/contests'); // or /admin/contests list
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
    setImagePreview(null);
    setErrors({});
  };

  const levels = ['beginner', 'intermediate', 'advanced'];
  const types = ['public', 'private', 'internal'];
  const statuses = ['draft', 'active', 'completed', 'cancelled'];
  const visibilities = ['public', 'private', 'team'];

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 font-sans">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-sky-200/50"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Create New Contest
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Set up your contest details and engage your participants
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50">
            <h2 className="md:col-span-2 text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <span className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-2xl flex items-center justify-center text-sky-600">
                1
              </span>
              Basic Information
            </h2>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Contest Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
            className={`w-full px-4 py-4 bg-slate-50 border-[1.5px] border-slate-200 rounded-[14px] focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100/50 transition-all text-lg ${errors.title ? 'border-red-300 focus:ring-red-400/30' : 'border-slate-200'}`}
                placeholder="e.g. Monthly Frontend Challenge"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Contest Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-vertical ${errors.description ? 'border-red-300 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-700'}`}
                placeholder="Briefly describe your contest..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>

          {/* Schedule & Settings */}
          <div className="grid md:grid-cols-2 gap-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50">
            <h2 className="md:col-span-2 text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center text-emerald-600">
                2
              </span>
              Schedule & Settings
            </h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg ${errors.duration ? 'border-red-300 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-700'}`}
                placeholder="30 or 1:30"
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Difficulty Level
              </label>
              <select name="level" value={formData.level} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg">
                {levels.map(level => <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Total Questions *
              </label>
              <input
                type="number"
                name="totalQuestions"
                value={formData.totalQuestions}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg ${errors.totalQuestions ? 'border-red-300 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-700'}`}
                placeholder="50"
              />
              {errors.totalQuestions && <p className="mt-1 text-sm text-red-600">{errors.totalQuestions}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Total Marks *
              </label>
              <input
                type="number"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg ${errors.marks ? 'border-red-300 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-700'}`}
                placeholder="100"
              />
              {errors.marks && <p className="mt-1 text-sm text-red-600">{errors.marks}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Passing Marks
              </label>
              <input
                type="number"
                name="passingMarks"
                value={formData.passingMarks}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg ${errors.passingMarks ? 'border-red-300 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-700'}`}
                placeholder="60"
              />
              {errors.passingMarks && <p className="mt-1 text-sm text-red-600">{errors.passingMarks}</p>}
            </div>
          </div>

          {/* Category & Advanced */}
          <div className="grid md:grid-cols-2 gap-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50">
            <h2 className="md:col-span-2 text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center text-purple-600">
                3
              </span>
              Category & Advanced
            </h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg ${errors.category ? 'border-red-300 focus:ring-red-400/30' : 'border-slate-200 dark:border-slate-700'}`}
                placeholder="e.g. Frontend, Data Science"
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Rewards
              </label>
              <input
                type="text"
                name="rewards"
                value={formData.rewards}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg"
                placeholder="e.g. Top 3 get certificates"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Status
              </label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg">
                {statuses.map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Visibility
              </label>
              <select name="visibility" value={formData.visibility} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg">
                {visibilities.map(vis => <option key={vis} value={vis}>{vis.charAt(0).toUpperCase() + vis.slice(1)}</option>)}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="p-6 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800/30 dark:to-slate-900/30 rounded-3xl border-2 border-sky-200/50 dark:border-sky-800/50">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg">
                📸
              </span>
              Contest Banner Image
            </h2>
            <div 
              className="relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl p-12 text-center hover:border-sky-400 transition-all group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  const event = { target: { files: [file] } };
                  handleChange(event);
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <div className="space-y-4">
                  <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-cover rounded-2xl shadow-2xl mx-auto" />
                  <button 
                    type="button" 
                    onClick={() => {setImagePreview(null); setFormData({...formData, image: null});}}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-2xl mx-auto mb-4 flex items-center justify-center text-sky-600 dark:text-sky-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Click or drag image here</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">PNG, JPG up to 5MB. Recommended 1200x400</p>
                </>
              )}
            </div>
            {errors.image && <p className="mt-2 text-sm text-red-600 text-center">{errors.image}</p>}
          </div>

          {/* Instructions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-2xl flex items-center justify-center text-orange-600">
                4
              </span>
              Contest Instructions
            </h2>
            <textarea
              name="instructions"
              rows="6"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-vertical text-lg"
              placeholder="Provide any special instructions for participants..."
            />
          </div>

          {/* Actions */}
          {errors.submit && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
              <p className="text-sm text-red-800 dark:text-red-200">{errors.submit}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200 dark:border-slate-700 justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold transition-all shadow-sm"
            >
              Reset Form
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-2xl font-bold transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-12 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

