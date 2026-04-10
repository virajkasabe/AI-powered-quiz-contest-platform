import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2L4 6.5v5c0 4.6 3.1 8.9 7 10 3.9-1.1 7-5.4 7-10v-5L11 2z" fill="white" />
    <path d="M8 11l2.2 2.2L14 8.5" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AdminIllustration = () => (
  <svg viewBox="0 0 260 250" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-[220px] md:max-w-[255px] drop-shadow-[0_10px_28px_rgba(14,165,233,0.35)]">
    <ellipse cx="130" cy="200" rx="90" ry="14" fill="rgba(255,255,255,0.12)" />
    <rect x="20" y="20" width="220" height="150" rx="12" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
    <rect x="32" y="32" width="196" height="110" rx="7" fill="rgba(12,74,110,0.5)" />
    <rect x="32" y="32" width="196" height="18" rx="7" fill="rgba(255,255,255,0.15)" />
    <rect x="40" y="38" width="60" height="6" rx="3" fill="rgba(255,255,255,0.5)" />
    <circle cx="214" cy="41" r="5" fill="rgba(255,255,255,0.3)" />
    <circle cx="200" cy="41" r="5" fill="rgba(255,255,255,0.2)" />
    <rect x="38" y="58" width="52" height="34" rx="6" fill="rgba(14,165,233,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    <text x="46" y="71" fontSize="7" fill="rgba(255,255,255,0.6)" fontFamily="Plus Jakarta Sans,sans-serif">Interns</text>
    <text x="46" y="83" fontSize="11" fill="white" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">48</text>
    <rect x="98" y="58" width="52" height="34" rx="6" fill="rgba(29,158,117,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    <text x="106" y="71" fontSize="7" fill="rgba(255,255,255,0.6)" fontFamily="Plus Jakarta Sans,sans-serif">Contests</text>
    <text x="106" y="83" fontSize="11" fill="white" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">12</text>
    <rect x="158" y="58" width="52" height="34" rx="6" fill="rgba(139,92,246,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    <text x="163" y="71" fontSize="7" fill="rgba(255,255,255,0.6)" fontFamily="Plus Jakarta Sans,sans-serif">Questions</text>
    <text x="166" y="83" fontSize="11" fill="white" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">240</text>
    <rect x="38" y="102" width="172" height="32" rx="6" fill="rgba(255,255,255,0.07)" />
    {[0,1,2,3,4,5,6].map((i) => {
      const heights = [18,12,22,8,16,20,14];
      return <rect key={i} x={44+i*24} y={126-heights[i]} width="14" height={heights[i]} rx="3" fill={`rgba(56,189,248,${0.4+i*0.08})`} />;
    })}
    <rect x="20" y="178" width="100" height="55" rx="9" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
    <text x="30" y="193" fontSize="8" fontWeight="700" fill="white" fontFamily="Plus Jakarta Sans,sans-serif">Domains</text>
    {["Frontend","Backend","UI/UX","Data Sci"].map((d,i)=>(
      <g key={d}>
        <rect x="30" y={197+i*8} width={40+i*8} height="5" rx="2.5" fill="rgba(255,255,255,0.35)" />
        <text x={74+i*8} y={201+i*8} fontSize="5" fill="rgba(255,255,255,0.5)" fontFamily="Plus Jakarta Sans,sans-serif">{d}</text>
      </g>
    ))}
    <rect x="130" y="178" width="110" height="55" rx="9" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
    <text x="140" y="193" fontSize="8" fontWeight="700" fill="white" fontFamily="Plus Jakarta Sans,sans-serif">Top Interns</text>
    <circle cx="145" cy="207" r="7" fill="rgba(255,255,255,0.25)" />
    <text x="142" y="211" fontSize="8" fontFamily="sans-serif">🥇</text>
    <rect x="156" y="203" width="70" height="4" rx="2" fill="rgba(255,255,255,0.5)" />
    <rect x="156" y="210" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
    <circle cx="145" cy="223" r="7" fill="rgba(255,255,255,0.15)" />
    <text x="142" y="227" fontSize="8" fontFamily="sans-serif">🥈</text>
    <rect x="156" y="219" width="60" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
    <rect x="156" y="226" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
  </svg>
);

const Toast = ({ message, type }) => {
  if (!message) return null;
  const s = type==="err" ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200";
  return <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold mb-3 ${s}`}>{type==="err"?"⚠":"✓"} {message}</div>;
};

export default function AdminLoginPage({ onLogin, onBackClick }) {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [toast, setToast]       = useState({ msg: "", type: "" });

  const handleLogin = async () => {
    if (!email.trim()) { setToast({ msg: "Please enter your email address.", type: "err" }); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setToast({ msg: "Please enter a valid email address.", type: "err" }); return; }
    if (!password || password.length < 6) { setToast({ msg: "Password must be at least 6 characters.", type: "err" }); return; }

    setToast({ msg: "Logging in...", type: "ok" });

    // Mock role-based response (replace with real API)
    const mockUser = {
      userName: email,
      role: 'admin'
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-admin-token');

    setTimeout(() => {
      setToast({ msg: "Welcome Admin! Redirecting...", type: "ok" });
      // Role-based redirect
      const role = mockUser.role;
      if (role === 'admin') {
        navigate('/reports');
      } else if (role === 'professor') {
        navigate('/professor/dashboard');
      } else if (role === 'intern' || role === 'student') {
        navigate('/intern');
      } else {
        navigate('/');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-sky-200">

        {/* LEFT */}
        <div className="flex flex-col justify-between p-5 sm:p-6 md:p-8 relative overflow-hidden md:w-5/12"
          style={{ background: "linear-gradient(145deg,#0C4A6E 0%,#0369A1 50%,#0EA5E9 100%)" }}>
          <div className="absolute w-72 h-72 rounded-full top-[-80px] right-[-80px] bg-white/10 pointer-events-none" />
          <div className="absolute w-48 h-48 rounded-full bottom-10 left-[-60px] bg-white/[0.08] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.15) 1px,transparent 1px)", backgroundSize: "22px 22px" }} />
          <svg className="absolute bottom-0 left-0 w-full opacity-15 pointer-events-none" viewBox="0 0 400 80">
            <path d="M0,40 C80,70 160,10 240,40 C320,70 360,20 400,40 L400,80 L0,80Z" fill="white" />
          </svg>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/25 border border-white/40 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <ShieldIcon />
              </div>
              <span className="font-bold text-xl md:text-2xl text-white tracking-tight" style={{ fontFamily:"'Outfit',sans-serif" }}>
                Athen<span className="text-sky-200">ura</span>
              </span>
            </div>
            <p className="text-[10px] text-white/70 tracking-[0.13em] font-semibold pl-[48px]">ADMIN PORTAL</p>
          </div>

          <div className="relative z-10 flex-1 items-center justify-center py-2 hidden md:flex">
            <AdminIllustration />
          </div>

          <div className="relative z-10 hidden md:block">
            <h2 className="text-[21px] font-bold text-white leading-snug mb-1.5" style={{ fontFamily:"'Outfit',sans-serif" }}>
              Manage everything.<br /><span className="text-sky-200">Stay in control.</span>
            </h2>
            <p className="text-xs text-white/80 leading-relaxed">Create contests, manage interns, generate AI questions and track all performance.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Contests","Domains","Leaderboard","Reports"].map((p)=>(
                <span key={p} className="px-3 py-1 rounded-full text-[11px] font-semibold text-white bg-white/20 border border-white/30">{p}</span>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex gap-2 flex-wrap mt-3 md:hidden">
            {["Contests","Domains","Reports"].map((p)=>(
              <span key={p} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white bg-white/20 border border-white/30">{p}</span>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 bg-white flex flex-col justify-center px-5 sm:px-7 md:px-8 py-7 md:py-10">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-sky-900 flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="8" width="12" height="9" rx="2" stroke="white" strokeWidth="1.3" />
                  <path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-sky-900 tracking-tight" style={{ fontFamily:"'Outfit',sans-serif" }}>Admin Portal</h2>
                <p className="text-[10px] text-slate-400">Restricted access — authorized personnel only</p>
              </div>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl px-3 py-2 text-xs text-sky-700 font-medium">
              🔒 This login is for administrators only. Interns should use the intern login.
            </div>
          </div>

          <Toast message={toast.msg} type={toast.type} />

          <div className="mb-4">
            <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">Email Address</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
              placeholder="admin@athenura.com" autoComplete="off"
              className="w-full h-[43px] px-3 text-sm bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all placeholder:text-slate-300 focus:border-sky-800 focus:ring-[3px] focus:ring-sky-100 focus:bg-white" />
          </div>

          <div className="mb-5">
            <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">Password</label>
            <div className="relative">
              <input type={showPw?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full h-[43px] px-3 pr-10 text-sm bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all placeholder:text-slate-300 focus:border-sky-800 focus:ring-[3px] focus:ring-sky-100 focus:bg-white" />
              <button type="button" onClick={()=>setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-700 transition-colors">
                {showPw
                  ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>
                }
              </button>
            </div>
            <p className="text-[10.5px] text-slate-400 mt-1">Contact system owner if locked out</p>
          </div>

          <button onClick={handleLogin}
            className="w-full h-[45px] flex items-center justify-center gap-2 bg-sky-900 hover:bg-sky-800 active:scale-[0.985] text-white font-bold text-sm rounded-[11px] transition-all shadow-[0_4px_14px_rgba(12,74,110,0.3)]">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="3" y="6.5" width="9" height="7" rx="1.5" stroke="white" strokeWidth="1.3" />
              <path d="M5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Access Dashboard
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[11px] text-slate-400 font-medium">or</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <button onClick={()=>onBackClick&&onBackClick()}
            className="w-full h-[42px] flex items-center justify-center gap-2 bg-white border-[1.5px] border-sky-400 text-sky-600 hover:bg-sky-50 active:scale-[0.985] font-bold text-sm rounded-[11px] transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Back to Intern Login
          </button>

          <p className="mt-5 text-center text-[11px] text-slate-300 border-t border-slate-100 pt-3">
            Secured by <span className="text-sky-500 font-semibold">Athenura</span> · Admin access only · v2.0
          </p>
        </div>
      </div>
    </div>
  );
}