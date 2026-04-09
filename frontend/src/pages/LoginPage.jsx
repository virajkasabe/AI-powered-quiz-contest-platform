import { useState } from "react";
import { useNavigate } from "react-router-dom";


// ─── Inline SVG: Shield / Logo IconS ───────────────────────────────────────────
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M11 2L4 6.5v5c0 4.6 3.1 8.9 7 10 3.9-1.1 7-5.4 7-10v-5L11 2z"
      fill="white"
    />
    <path
      d="M8 11l2.2 2.2L14 8.5"
      stroke="#0EA5E9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Inline SVG: Quiz Illustration ────────────────────────────────────────────
const QuizIllustration = () => (
  <svg
    viewBox="0 0 260 250"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-[255px] drop-shadow-[0_10px_28px_rgba(14,165,233,0.35)]"
  >
    <ellipse cx="130" cy="160" rx="90" ry="18" fill="rgba(255,255,255,0.15)" />
    {/* Monitor */}
    <rect x="28" y="18" width="204" height="132" rx="12" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
    <rect x="40" y="30" width="180" height="100" rx="7" fill="rgba(12,74,110,0.55)" />
    <rect x="40" y="30" width="180" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
    <circle cx="52" cy="32" r="2.5" fill="rgba(255,255,255,0.5)" />
    <circle cx="61" cy="32" r="2.5" fill="rgba(255,255,255,0.35)" />
    <circle cx="70" cy="32" r="2.5" fill="rgba(255,255,255,0.25)" />
    {/* Quiz Card */}
    <rect x="56" y="44" width="148" height="74" rx="7" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
    <rect x="64" y="52" width="18" height="9" rx="4" fill="#38BDF8" />
    <text x="68" y="60" fontSize="6.5" fill="white" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">Q3</text>
    <rect x="88" y="54" width="80" height="4" rx="2" fill="rgba(255,255,255,0.6)" />
    <rect x="88" y="61" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
    {/* Options */}
    <rect x="64" y="71" width="60" height="14" rx="5" fill="#0EA5E9" opacity="0.9" />
    <circle cx="71" cy="78" r="3" fill="white" opacity="0.9" />
    <rect x="77" y="76" width="38" height="3.5" rx="1.75" fill="rgba(255,255,255,0.7)" />
    <rect x="130" y="71" width="60" height="14" rx="5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
    <rect x="136" y="76" width="40" height="3.5" rx="1.75" fill="rgba(255,255,255,0.25)" />
    <rect x="64" y="91" width="60" height="14" rx="5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
    <rect x="70" y="96" width="40" height="3.5" rx="1.75" fill="rgba(255,255,255,0.25)" />
    <rect x="130" y="91" width="60" height="14" rx="5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
    <rect x="136" y="96" width="40" height="3.5" rx="1.75" fill="rgba(255,255,255,0.25)" />
    {/* Timer */}
    <rect x="56" y="122" width="148" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
    <rect x="56" y="122" width="100" height="6" rx="3" fill="#38BDF8" opacity="0.85" />
    <text x="196" y="128" fontSize="6" fill="rgba(255,255,255,0.6)" fontFamily="Plus Jakarta Sans,sans-serif">2:14</text>
    {/* Stand */}
    <rect x="116" y="150" width="28" height="18" rx="3" fill="rgba(255,255,255,0.18)" />
    <rect x="96" y="166" width="68" height="7" rx="3.5" fill="rgba(255,255,255,0.22)" />
    {/* Leaderboard Card */}
    <rect x="6" y="172" width="82" height="62" rx="9" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
    <text x="14" y="186" fontSize="8" fontWeight="700" fill="white" fontFamily="Plus Jakarta Sans,sans-serif">Leaderboard</text>
    <text x="14" y="199" fontSize="7" fill="rgba(255,255,255,0.55)" fontFamily="Plus Jakarta Sans,sans-serif">1st</text>
    <rect x="28" y="195" width="50" height="3.5" rx="1.75" fill="rgba(255,255,255,0.55)" />
    <text x="14" y="210" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="Plus Jakarta Sans,sans-serif">2nd</text>
    <rect x="28" y="206" width="38" height="3.5" rx="1.75" fill="rgba(255,255,255,0.3)" />
    <text x="14" y="221" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="Plus Jakarta Sans,sans-serif">3rd</text>
    <rect x="28" y="217" width="28" height="3.5" rx="1.75" fill="rgba(255,255,255,0.2)" />
    <circle cx="74" cy="186" r="10" fill="rgba(255,255,255,0.2)" />
    <text x="69" y="190" fontSize="12" fontFamily="sans-serif">🏆</text>
    {/* Badge Card */}
    <rect x="172" y="172" width="82" height="62" rx="9" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
    <text x="180" y="186" fontSize="8" fontWeight="700" fill="white" fontFamily="Plus Jakarta Sans,sans-serif">Badges</text>
    <circle cx="192" cy="207" r="11" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
    <text x="187" y="211.5" fontSize="12" fontFamily="sans-serif">⭐</text>
    <circle cx="216" cy="207" r="11" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
    <text x="211" y="211.5" fontSize="12" fontFamily="sans-serif">⭐</text>
    <circle cx="240" cy="207" r="11" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
    <text x="235" y="211.5" fontSize="12" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">☆</text>
    <rect x="180" y="225" width="66" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
  </svg>
);

// ─── Toast Component ───────────────────────────────────────────────────────────
const Toast = ({ message, type }) => {
  if (!message) return null;
  const styles =
    type === "err"
      ? "bg-red-50 text-red-700 border border-red-200"
      : "bg-green-50 text-green-700 border border-green-200";
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold mb-3 ${styles}`}>
      {type === "err" ? "⚠" : "✓"} {message}
    </div>
  );
};

// ─── Main LoginPage Component ──────────────────────────────────────────────────
export default function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("intern");

  // Intern state
  const [internId, setInternId] = useState("");
  const [internDate, setInternDate] = useState("");
  const [internToast, setInternToast] = useState({ msg: "", type: "" });

  // Admin state
  const [adminId, setAdminId] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const [adminToast, setAdminToast] = useState({ msg: "", type: "" });

  const switchTab = (tab) => {
    setActiveTab(tab);
    setInternToast({ msg: "", type: "" });
    setAdminToast({ msg: "", type: "" });
  };

  const handleInternLogin = () => {
    if (!internId.trim()) {
      setInternToast({ msg: "Please enter your Unique ID.", type: "err" });
      return;
    }
    if (!/^ATHENURA\/\d{2}\/\d+$/i.test(internId.trim())) {
      setInternToast({ msg: "Format must be ATHENURA/YY/XXXXX", type: "err" });
      return;
    }
    if (!internDate) {
      setInternToast({ msg: "Please select your joining date.", type: "err" });
      return;
    }
    setInternToast({ msg: "Verified — loading your domain quiz...", type: "ok" });
    setTimeout(() => {
  navigate("/quiz");
}, 1000);
    // TODO: call your API here → navigate to /quiz
  };

  const handleAdminLogin = () => {
    if (!adminId.trim()) {
      setAdminToast({ msg: "Please enter your Admin ID.", type: "err" });
      return;
    }
    if (!adminPw || adminPw.length < 6) {
      setAdminToast({ msg: "Password must be at least 6 characters.", type: "err" });
      return;
    }
    setAdminToast({ msg: "Authenticated — redirecting to dashboard...", type: "ok" });
    // TODO: call your API here → navigate to /dashboard
  };

  return (
    // Outer wrapper — full screen centering
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-sky-200">

        {/* ── LEFT PANEL ── */}
        <div
          className="hidden md:flex w-5/12 flex-col justify-between p-8 relative overflow-hidden"
          style={{ background: "linear-gradient(145deg, #0EA5E9 0%, #38BDF8 50%, #7DD3FC 100%)" }}
        >
          {/* Decorative blobs */}
          <div className="absolute w-72 h-72 rounded-full top-[-80px] right-[-80px] bg-white/10 pointer-events-none" />
          <div className="absolute w-48 h-48 rounded-full bottom-10 left-[-60px] bg-white/8 pointer-events-none" />
          <div className="absolute w-24 h-24 rounded-full top-[45%] right-4 bg-white/10 pointer-events-none" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Wave bottom */}
          <svg
            className="absolute bottom-0 left-0 w-full opacity-15 pointer-events-none"
            viewBox="0 0 400 80"
          >
            <path d="M0,40 C80,70 160,10 240,40 C320,70 360,20 400,40 L400,80 L0,80Z" fill="white" />
          </svg>

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-white/25 border border-white/40 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <ShieldIcon />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Athen<span className="text-sky-100">ura</span>
              </span>
            </div>
            <p className="text-[10px] text-white/70 tracking-[0.13em] font-semibold pl-[52px]">
              CODE · CREATE · INNOVATE
            </p>
          </div>

          {/* Illustration */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-2">
            <QuizIllustration />
          </div>

          {/* Bottom text */}
          <div className="relative z-10">
            <h2
              className="text-[21px] font-bold text-white leading-snug mb-1.5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Quiz smarter.<br />
              <span className="text-sky-100">Rise higher.</span>
            </h2>
            <p className="text-xs text-white/80 leading-relaxed">
              AI-powered domain quizzes, live leaderboards, badges and monthly intern recognition.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["12 Domains", "AI Questions", "Live Rankings"].map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold text-white bg-white/18 border border-white/30"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — pure white ── */}
        <div className="flex-1 bg-white flex flex-col justify-center px-8 py-10">

          {/* Header */}
          <div className="mb-6">
            <h2
              className="text-[23px] font-bold text-sky-900 tracking-tight mb-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Welcome back 👋
            </h2>
            <p className="text-[12.5px] text-slate-500">Sign in to access your quiz dashboard</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-sky-50 rounded-xl p-1 gap-1 mb-6">
            <button
              onClick={() => switchTab("intern")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[9px] text-[12.5px] font-bold transition-all duration-200 ${
                activeTab === "intern"
                  ? "bg-sky-500 text-white shadow-[0_2px_10px_rgba(14,165,233,0.4)]"
                  : "text-sky-700 hover:bg-sky-100"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M2 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Intern login
            </button>
            <button
              onClick={() => switchTab("admin")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[9px] text-[12.5px] font-bold transition-all duration-200 ${
                activeTab === "admin"
                  ? "bg-sky-500 text-white shadow-[0_2px_10px_rgba(14,165,233,0.4)]"
                  : "text-sky-700 hover:bg-sky-100"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="2.5" y="6" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M4.5 6V4.5a2 2 0 0 1 4 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Admin login
            </button>
          </div>

          {/* ── INTERN FORM ── */}
          {activeTab === "intern" && (
            <div>
              <Toast message={internToast.msg} type={internToast.type} />

              <div className="mb-4">
                <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">
                  Unique ID
                </label>
                <input
                  type="text"
                  value={internId}
                  onChange={(e) => setInternId(e.target.value)}
                  placeholder="ATHENURA/25/10115"
                  autoComplete="off"
                  className="w-full h-[43px] px-3 text-[13.5px] bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all placeholder:text-slate-300 focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100 focus:bg-white"
                />
                <p className="text-[10.5px] text-slate-400 mt-1">Format: ATHENURA/YY/XXXXX</p>
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">
                  Joining Date
                </label>
                <input
                  type="date"
                  value={internDate}
                  onChange={(e) => setInternDate(e.target.value)}
                  className="w-full h-[43px] px-3 text-[13.5px] bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100 focus:bg-white"
                />
                <p className="text-[10.5px] text-slate-400 mt-1">Must match your registered joining date</p>
              </div>

              <button
                onClick={handleInternLogin}
                className="w-full h-[45px] flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-[0.985] text-white font-bold text-sm rounded-[11px] transition-all shadow-[0_4px_14px_rgba(14,165,233,0.35)] hover:shadow-[0_4px_18px_rgba(14,165,233,0.5)]"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 2C4.46 2 2 4.46 2 7.5S4.46 13 7.5 13 13 10.54 13 7.5 10.54 2 7.5 2z" stroke="white" strokeWidth="1.3" />
                  <path d="M5.5 7.5L7 9l3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Start my quiz
              </button>
            </div>
          )}

          {/* ── ADMIN FORM ── */}
          {activeTab === "admin" && (
            <div>
              <Toast message={adminToast.msg} type={adminToast.type} />

              <div className="mb-4">
                <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">
                  Admin ID
                </label>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="Enter admin identifier"
                  autoComplete="off"
                  className="w-full h-[43px] px-3 text-[13.5px] bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all placeholder:text-slate-300 focus:border-sky-800 focus:ring-[3px] focus:ring-sky-100 focus:bg-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-bold text-sky-700 tracking-[0.07em] uppercase mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={adminPw}
                  onChange={(e) => setAdminPw(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full h-[43px] px-3 text-[13.5px] bg-slate-50 border-[1.5px] border-slate-200 rounded-[10px] text-sky-900 outline-none transition-all placeholder:text-slate-300 focus:border-sky-800 focus:ring-[3px] focus:ring-sky-100 focus:bg-white"
                />
                <p className="text-[10.5px] text-slate-400 mt-1">Contact system owner if locked out</p>
              </div>

              <button
                onClick={handleAdminLogin}
                className="w-full h-[45px] flex items-center justify-center gap-2 bg-sky-900 hover:bg-sky-800 active:scale-[0.985] text-white font-bold text-sm rounded-[11px] transition-all shadow-[0_4px_14px_rgba(12,74,110,0.3)] hover:shadow-[0_4px_18px_rgba(12,74,110,0.45)]"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="3" y="6.5" width="9" height="7" rx="1.5" stroke="white" strokeWidth="1.3" />
                  <path d="M5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Access dashboard
              </button>
            </div>
          )}

          {/* Footer */}
          <p className="mt-5 text-center text-[11px] text-slate-300 border-t border-slate-100 pt-3">
            Secured by <span className="text-sky-500 font-semibold">Athenura</span> · Domain-based AI quiz platform · v2.0
          </p>
        </div>

      </div>
    </div>
  );
}