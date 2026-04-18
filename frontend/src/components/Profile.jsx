import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apiFailed, setApiFailed] = useState(false);

    const fallbackProfile = {
        fullName: "Athenura/23/2323",
        userName: "Athenura/23/2323",
        uniqueId: "ATHENURA/23/2323",
        domain: "Frontend",
        email: "intern@athenura.com",
        userEmail: "intern@athenura.com",
        joiningDate: "2023-08-12",
        role: "Intern",
        status: "Active",
        phone: "+91 9876543210"
    };

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        let storedUser = null;
        
        try {
            if (userStr) storedUser = JSON.parse(userStr);
        } catch (e) {
            console.error("Failed to parse user data", e);
        }

        // Mock API Fetch Logic safely
        const fetchRemoteData = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);

            try {
                // Dummy endpoint that will likely fail if no backend
                const res = await fetch("http://localhost:5000/api/overall", { signal: controller.signal });
                clearTimeout(timeoutId);
                if (!res.ok) throw new Error("API Failure");
                
                // Keep local storage priority for existing auth sessions
                setUser({ ...fallbackProfile, ...storedUser });
            } catch (err) {
                console.error("API Error - Silently falling back to static profile", err);
                setApiFailed(true);
                setUser({ ...fallbackProfile, ...storedUser });
            } finally {
                setLoading(false);
            }
        };

        fetchRemoteData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] w-full font-sans">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-sky-500 rounded-full animate-spin"></div>
                    <p className="text-slate-500 text-sm font-semibold animate-pulse">Loading Profile...</p>
                </div>
            </div>
        );
    }

    if (!user) return null; // Safe guard

    const avatarInitial = (user.fullName || user.userName || "U").charAt(0).toUpperCase();

    return (
        <div className="w-full p-4 sm:p-6 lg:p-8 font-sans max-w-6xl mx-auto">
            {apiFailed && (
                <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-lg text-xs font-semibold mb-6 border border-amber-200 dark:border-amber-800/50 flex flex-wrap -mt-4 transition-all w-fit">
                   ⚠ Using demo profile data (Offline Mode)
                </div>
            )}

            {/* Title Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight mb-2">My Profile</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">Manage your account details and personal information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* ── Section 1: Profile Summary Card ── */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center text-center">
                        <div className="w-28 h-28 mb-5 rounded-full bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium text-4xl shadow-sm ring-4 ring-transparent dark:ring-slate-800">
                           {avatarInitial}
                        </div>
                        
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                            {user.fullName || user.userName}
                        </h2>
                        <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-4">
                            {user.uniqueId || "N/A ID"}
                        </p>

                        <div className="flex flex-wrap gap-2 justify-center mb-2">
                            <span className="bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-sky-100 dark:border-sky-800/30">
                                {user.domain}
                            </span>
                            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-100 dark:border-emerald-800/30">
                                {user.role}
                            </span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/70 w-full">
                            <div className="flex justify-between items-center text-sm font-semibold">
                                <span className="text-slate-500">Status</span>
                                <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-lg">
                                    {user.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Info & Actions */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* ── Section 2: Personal Information Card ── */}
                    <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11V5a2 2 0 012-2M3 16a2 2 0 114 0m0 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m0 0V16a2 2 0 012 2h-2a2 2 0 11-4 0v-1" /></svg>
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide">Full Name</span>
                                <p className="text-[15px] font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">{user.fullName || user.userName}</p>
                            </div>
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide">Unique ID</span>
                                <p className="text-[15px] font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">{user.uniqueId}</p>
                            </div>
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide">Email Address</span>
                                <p className="text-[15px] font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 break-all">{user.email || user.userEmail}</p>
                            </div>
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide">Domain</span>
                                <p className="text-[15px] font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">{user.domain}</p>
                            </div>
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide">Joining Date</span>
                                <p className="text-[15px] font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">{user.joiningDate}</p>
                            </div>
                            <div>
                                <span className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide">Phone Number</span>
                                <p className="text-[15px] font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">{user.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Section 3: Account Actions ── */}
                    <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Account Actions
                        </h3>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm border border-slate-200 dark:border-slate-700">
                                Edit Profile
                            </button>
                            <button className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm border border-slate-200 dark:border-slate-700">
                                Change Password
                            </button>
                            <button 
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    localStorage.removeItem('token');
                                    navigate('/');
                                }}
                                className="flex-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm border border-red-100 dark:border-red-800/30"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;