import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2L4 6.5v5c0 4.6 3.1 8.9 7 10 3.9-1.1 7-5.4 7-10v-5L11 2z" fill="white" />
    <path d="M8 11l2.2 2.2L14 8.5" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Toast = ({ message, type }) => {
  if (!message) return null;
  const styles = type === "err"
    ? "bg-red-50 text-red-700 border border-red-200"
    : "bg-green-50 text-green-700 border border-green-200";
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold mb-3 ${styles} transition-all duration-300`}>
      {type === "err" ? "⚠" : "✓"} {message}
    </div>
  );
};

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ msg: "", type: "" });
  const [loading, setLoading] = useState(false);

  const isFormValid = formData.name.trim() && 
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && 
                      formData.password.length >= 6 && 
                      formData.secretKey.trim();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return setToast({ msg: "Name is required.", type: "err" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setToast({ msg: "Valid email is required.", type: "err" });
    if (formData.password.length < 6) return setToast({ msg: "Password must be at least 6 characters.", type: "err" });
    if (!formData.secretKey.trim()) return setToast({ msg: "Secret Key is required.", type: "err" });

    setLoading(true);
    setToast({ msg: "Registering account...", type: "ok" });

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ msg: data.message || "Registration failed. Please try again.", type: "err" });
      } else {
        setToast({ msg: "Registration successful! Redirecting...", type: "ok" });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setToast({ msg: "Server not reachable. Please check your connection.", type: "err" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-sky-200">
        
        {/* LEFT PANEL */}
        <div
          className="flex flex-col justify-between p-5 sm:p-6 md:p-8 relative overflow-hidden md:w-5/12"
          style={{ background: "linear-gradient(145deg,#0EA5E9 0%,#38BDF8 50%,#7DD3FC 100%)" }}
        >
          <div className="absolute w-72 h-72 rounded-full top-[-80px] right-[-80px] bg-white/10 pointer-events-none" />
          <div className="absolute w-48 h-48 rounded-full bottom-10 left-[-60px] bg-white/[0.08] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "22px 22px" }} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/25 border border-white/40 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <ShieldIcon />
              </div>
              <span className="font-bold text-xl md:text-2xl text-white tracking-tight" style={{ fontFamily: "'Outfit',sans-serif" }}>
                Athen<span className="text-sky-100">ura</span>
              </span>
            </div>
            <p className="text-[10px] text-white/70 tracking-[0.13em] font-semibold pl-[48px]">CODE · CREATE · INNOVATE</p>
          </div>

          <div className="relative z-10 hidden md:block mt-8 flex-1">
            <h2 className="text-[24px] font-bold text-white leading-snug mb-3" style={{ fontFamily: "'Outfit',sans-serif" }}>
              Join the future of<br /><span className="text-sky-100">skill assessment.</span>
            </h2>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Create an account to manage your quizzes, access detailed reports, and monitor progress effectively.
            </p>
            <ul className="text-xs text-white/90 space-y-3">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-200" /> Secure platform access</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-200" /> Real-time analytics</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-200" /> Comprehensive domain testing</li>
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white flex flex-col justify-center px-5 sm:px-7 md:px-10 py-7 md:py-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-sky-900 tracking-tight mb-1.5" style={{ fontFamily: "'Outfit',sans-serif" }}>
              Create an Account
            </h2>
            <p className="text-[13px] text-slate-500">Fill in the details to register your profile.</p>
          </div>

          <Toast message={toast.msg} type={toast.type} />

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full h-[45px] pl-10 pr-3 text-sm bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all placeholder:text-slate-300 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full h-[45px] pl-10 pr-3 text-sm bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all placeholder:text-slate-300 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full h-[45px] pl-10 pr-10 text-sm bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all placeholder:text-slate-300 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100 focus:bg-white"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-sky-600 transition-colors">
                    {showPassword ? 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> : 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    }
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">Secret Key</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                  </span>
                  <input
                    type="password" name="secretKey" value={formData.secretKey} onChange={handleChange}
                    placeholder="Admin Key"
                    className="w-full h-[45px] pl-10 pr-3 text-sm bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all placeholder:text-slate-300 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full h-[48px] mt-4 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 disabled:cursor-not-allowed active:scale-[0.985] text-white font-bold text-sm rounded-[11px] transition-all shadow-[0_4px_14px_rgba(14,165,233,0.35)] disabled:shadow-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Register Account</>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[12.5px] text-slate-500">
            Already have an account?{" "}
            <Link to="/" className="text-sky-600 font-bold hover:text-sky-700 hover:underline transition-all">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
