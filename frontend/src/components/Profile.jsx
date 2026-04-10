import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [domainCount, setDomainCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        // ✅ Get logged-in user from localStorage
        const userStr = localStorage.getItem("user");
        let storedUser = null;
        
        try {
            if (userStr) storedUser = JSON.parse(userStr);
        } catch (e) {
            console.error("Failed to parse user data", e);
        }

        if (!storedUser) {
            // Mock fallback data if no user
            const mockUser = {
                userName: 'John Doe',
                id: 'mock-user-123',
                domain: 'Frontend',
                badgesEarned: 2,
                status: 'Active',
                userEmail: 'john.doe@example.com',
                role: 'Intern',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            };
            setUser(mockUser);
            setLoading(false);
            return;
        }

        // Enhance stored user with mock data if missing
        const enhancedUser = {
            ...storedUser,
            userEmail: storedUser.userEmail || 'user@company.com',
            role: storedUser.role || 'Intern',
            avatar: storedUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        };
        setUser(enhancedUser);
        setEditData(enhancedUser);

        // ✅ Fetch leaderboard just for domain count with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        fetch("http://localhost:5000/api/overall", { signal: controller.signal })
            .then((res) => {
                clearTimeout(timeoutId);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    const count = data.data.filter(
                        (item) => item.domain === storedUser.domain
                    ).length;
                    setDomainCount(count);
                }
            })
            .catch(err => {
                console.error("Error fetching leaderboard data:", err);
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Failed to load stats');
                }
            })
            .finally(() => {
                clearTimeout(timeoutId);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] w-full font-sans">
                <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-100/50 dark:border-slate-800/50 shadow-2xl">
                    <div className="w-12 h-12 border-4 border-sky-100 dark:border-slate-700 border-t-sky-500 dark:border-t-sky-400 rounded-full animate-spin"></div>
                    <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold animate-pulse text-center max-w-sm">Loading Profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] font-sans p-6 w-full">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm p-8 max-w-sm w-full text-center">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-700">
                        <svg className="w-8 h-8 text-orange-400 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Loading Error</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                        {error}. Please check your connection and try again.
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-sky-500/20 active:scale-95 text-sm"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] font-sans p-6 w-full">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm p-8 max-w-sm w-full text-center">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-700">
                        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Profile Missing</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                        We couldn't locate your profile details. You may need to sign in again.
                    </p>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-sky-500/20 active:scale-95 text-sm"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-4 sm:p-6 lg:p-8 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-100 dark:border-slate-800"
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className="relative group">
                        <motion.img
                            src={user.avatar}
                            alt={`${user.userName}'s avatar`}
                            className="w-28 h-28 rounded-3xl object-cover shadow-lg shadow-sky-500/30 flex-shrink-0 border-4 border-white/50 dark:border-slate-800/50 ring-4 ring-sky-500/20 group-hover:ring-sky-400/30 transition-all"
                            whileHover={{ scale: 1.05 }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: user.avatar ? 0 : 1, scale: 1 }}
                            className="absolute inset-0 w-28 h-28 rounded-3xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-sky-500/30 flex-shrink-0"
                        >
                            {user.userName?.charAt(0)?.toUpperCase()}
                        </motion.div>
                    </div>

                    {/* Info */}
                    <div className="text-center md:text-left flex-1">
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-1.5 tracking-tight">{user.userName}</h2>
                        <p className="text-slate-600 dark:text-slate-300 font-semibold mb-1 text-sm">{user.userEmail}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-4">{user.role}</p>

                        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start mb-6">
                            <span className="bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-sky-100 dark:border-sky-800/30">
                                {user.domain || 'Domain unspecified'}
                            </span>
                            <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-purple-100 dark:border-purple-800/30">
                                Peers: {domainCount || 42}
                            </span>
                            <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-100 dark:border-emerald-800/30">
                                {user.role || 'Intern'}
                            </span>
                        </div>

                        {/* Edit Toggle */}
                        <button
                            onClick={() => setEditing(!editing)}
                            className="self-center md:self-start bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all active:scale-95 ml-auto md:ml-0"
                        >
                            {editing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {/* Profile Details Table */}
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                        <svg className="w-7 h-7 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11V5a2 2 0 012-2M3 16a2 2 0 114 0m0 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m0 0V16a2 2 0 012 2h-2a2 2 0 11-4 0v-1" />
                        </svg>
                        Profile Details
                    </h3>

                    {editing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={editData.userName || ''}
                                    onChange={(e) => setEditData({...editData, userName: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={editData.userEmail || ''}
                                    onChange={(e) => setEditData({...editData, userEmail: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Domain</label>
                                <input
                                    type="text"
                                    value={editData.domain || ''}
                                    onChange={(e) => setEditData({...editData, domain: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        // Mock save
                                        setUser(editData);
                                        localStorage.setItem('user', JSON.stringify(editData));
                                        console.log('Profile updated:', editData);
                                        setEditing(false);
                                    }}
                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditing(false)}
                                    className="flex-1 bg-slate-500 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/30 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1 tracking-wide">Name</span>
                                <p className="text-xl font-bold text-slate-800 dark:text-white">{user.userName}</p>
                            </div>
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1 tracking-wide">Email</span>
                                <p className="font-medium text-slate-700 dark:text-slate-300 break-all">{user.userEmail}</p>
                            </div>
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1 tracking-wide">Role</span>
                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold">
                                    {user.role}
                                </span>
                            </div>
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1 tracking-wide">Status</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    user.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}>
                                    {user.status || 'Active'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50">
                    {[
                        { label: "Badges Earned", value: user.badgesEarned || 0, icon: "⭐" },
                        { label: "Domain Segment", value: user.domain || 'N/A', icon: "🎯" },
                        { label: "Global Rank", value: "#--", icon: "🏆" },
                        { label: "Current Status", value: user.status || 'Active', icon: "⚡" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col hover:-translate-y-1 transition-transform"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{item.icon}</span>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wide">{item.label}</p>
                            </div>
                            <p className="text-2xl font-black text-slate-800 dark:text-white truncate">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Badges Section */}
                <div className="mt-10">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center text-amber-500">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                         </div>
                         <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Achievement Badges</h3>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {["Novice", "Intermediate", "Professional", "Legendary"].map(
                            (badge, index) => {
                                const unlocked = (user.badgesEarned || 0) > index;
                                return (
                                    <div
                                        key={index}
                                        className={`p-5 rounded-2xl border transition-all ${unlocked ? 'bg-white dark:bg-slate-800 border-sky-200 dark:border-sky-800 shadow-md ring-1 ring-sky-50 dark:ring-slate-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-70 grayscale'} text-center flex flex-col items-center justify-center`}
                                    >
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-sm ${unlocked ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                            {unlocked ? "🏆" : "🔒"}
                                        </div>
                                        <p className={`font-bold ${unlocked ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>{badge}</p>
                                        <p className={`text-xs mt-1 font-semibold ${unlocked ? 'text-sky-500 dark:text-sky-400' : 'text-slate-400'}`}>
                                            {unlocked ? "Unlocked" : "Locked"}
                                        </p>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfilePage;