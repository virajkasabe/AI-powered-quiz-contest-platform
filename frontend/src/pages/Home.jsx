import React from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────
   HERO ILLUSTRATION
───────────────────────────────────────── */
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[520px] h-[440px] mx-auto select-none">
      {/* Glow blobs */}
      <div className="absolute top-10 right-10 w-56 h-56 rounded-full bg-sky-300/25 blur-2xl" />
      <div className="absolute bottom-4 left-6 w-40 h-40 rounded-full bg-brand-400/20 blur-2xl" />

      {/* ── Leaderboard card ── */}
      <div className="absolute top-8 left-2 w-40 bg-white rounded-2xl shadow-xl overflow-hidden z-10 animate-float anim-fill">
        <div className="bg-brand-700 px-3 py-2">
          <span className="text-white text-[11px] font-syne font-bold">Leaderboard</span>
        </div>
        {[
          ["AK", "Frontend",    19],
          ["PS", "Data Sci",    18],
          ["RV", "Backend",     17],
          ["SP", "UI/UX",       17],
          ["AN", "Backend",     16],
        ].map(([ini, dom, sc], i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-sky-50 last:border-0"
          >
            <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] font-bold text-brand-700">{ini}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-medium text-gray-700 truncate">{dom}</div>
            </div>
            <span className="text-[9px] font-bold text-brand-600">{sc}</span>
          </div>
        ))}
      </div>

      {/* ── Trophy badge ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 animate-float2 anim-fill">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500
          shadow-[0_8px_28px_rgba(234,179,8,0.45)] flex flex-col items-center justify-center">
          <span className="text-[10px] text-white font-bold">🏆</span>
          <span className="font-syne font-extrabold text-white text-sm leading-none">81</span>
        </div>
      </div>

      {/* ── Quiz card ── */}
      <div className="absolute top-12 right-0 w-48 bg-white rounded-2xl shadow-xl p-3 z-10 animate-float3 anim-fill">
        <div className="flex gap-1 mb-2">
          {["bg-sky-200", "bg-sky-300", "bg-sky-400"].map((c, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${c}`} />
          ))}
        </div>
        <div className="text-[10px] font-syne font-bold text-sky-900 mb-2">Domain Quiz</div>
        {[
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Computer Style Sheets",
        ].map((opt, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 mb-1
              ${i === 1 ? "bg-brand-700" : "bg-sky-50"}`}
          >
            <div className={`w-2.5 h-2.5 rounded-full border flex-shrink-0
              ${i === 1 ? "bg-white border-white" : "border-sky-300"}`} />
            <span className={`text-[9px] truncate ${i === 1 ? "text-white font-medium" : "text-gray-600"}`}>
              {opt}
            </span>
          </div>
        ))}
      </div>

      {/* ── Code badges ── */}
      <div className="absolute top-1/2 left-[-8px] -translate-y-1/2 w-10 h-10 rounded-xl
        bg-gradient-to-br from-sky-400 to-brand-600 flex items-center justify-center
        shadow-lg z-10 animate-float2 anim-fill">
        <span className="text-white font-syne font-bold text-[9px]">&lt;/&gt;</span>
      </div>
      <div className="absolute top-8 right-[-6px] w-9 h-9 rounded-xl
        bg-gradient-to-br from-sky-300 to-brand-500 flex items-center justify-center
        shadow-lg z-10 animate-float3 anim-fill">
        <span className="text-white font-syne font-bold text-[8px]">&lt;/&gt;</span>
      </div>

      {/* ── Three people ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/3 flex items-end z-20">
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 h-12 rounded-full bg-sky-300/30 blur-xl" />

        {/* Person 1 – blue */}
        <svg viewBox="0 0 70 140" className="w-20 h-36 drop-shadow-md flex-shrink-0">
          <circle cx="35" cy="22" r="14" fill="#f3d5b5" />
          <path d="M12 55 Q35 44 58 55 L60 120 H48 L44 88 L44 120 H26 L26 88 L22 120 H10Z" fill="#1565c0" />
          <path d="M10 60 Q4 70 7 82 L13 80 L16 64Z" fill="#1565c0" />
          <path d="M60 60 Q66 68 62 80 L56 78 L55 64Z" fill="#1565c0" />
          <path d="M21 22 Q23 6 35 5 Q47 6 49 22 Q45 13 35 13 Q25 13 21 22Z" fill="#2c1810" />
        </svg>

        {/* Person 2 – teal (center, laptop) */}
        <svg viewBox="0 0 80 160" className="w-24 h-44 drop-shadow-md -mx-2 z-10 flex-shrink-0">
          <circle cx="40" cy="24" r="16" fill="#d4956a" />
          <path d="M16 62 Q40 50 64 62 L67 140 H53 L49 100 L49 140 H31 L31 100 L27 140 H13Z" fill="#4dd0e1" />
          <path d="M24 62 Q40 52 56 62 Q53 54 40 52 Q27 54 24 62Z" fill="#26c6da" />
          <path d="M64 66 Q74 58 72 45 L66 47 L68 62Z" fill="#4dd0e1" />
          <path d="M72 42 Q74 36 70 34 Q66 38 68 45Z" fill="#d4956a" />
          <rect x="18" y="118" width="44" height="26" rx="4" fill="#90caf9" />
          <circle cx="40" cy="131" r="5" fill="#1565c0" />
          <path d="M37 131 L40 127 L43 131Z" fill="white" />
        </svg>

        {/* Person 3 – grey (thumbs up) */}
        <svg viewBox="0 0 65 130" className="drop-shadow-md flex-shrink-0" style={{ width: 68, height: 128 }}>
          <circle cx="32" cy="18" r="13" fill="#c9956a" />
          <path d="M10 50 Q32 40 54 50 L56 114 H44 L41 82 L41 114 H23 L23 82 L20 114 H8Z" fill="#e0e0e0" />
          <path d="M54 54 Q63 50 64 41 L58 40 L57 52Z" fill="#e0e0e0" />
          <path d="M63 38 Q65 33 61 31 Q57 33 59 41Z" fill="#c9956a" />
          <path d="M19 18 Q21 5 32 4 Q43 5 45 18 Q41 9 32 9 Q23 9 19 18Z" fill="#1a0a00" />
        </svg>
      </div>

      {/* Sparkles */}
      {[[8, 28], [88, 18], [3, 62], [94, 52]].map(([l, t], i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-sky-400/60 animate-pulse"
          style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   STATS BAR
───────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { num: "12+", label: "Domains Supported"    },
    { num: "20",  label: "Questions Per Contest" },
    { num: "AI",  label: "Groq-Powered Questions"},
    { num: "0",   label: "Manual Effort Needed"  },
  ];
  return (
    <div className="bg-white border-b border-sky-100 px-6 md:px-[6%] py-6
      grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(({ num, label }) => (
        <div
          key={label}
          className="text-center py-4 px-3 rounded-2xl bg-sky-50 border border-sky-100
            hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(2,132,199,0.1)] transition-all"
        >
          <div className="font-syne font-extrabold text-3xl text-brand-700 leading-none">{num}</div>
          <div className="text-xs text-gray-500 mt-1.5 font-medium">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   FEATURES
───────────────────────────────────────── */
const FEATURES = [
  {
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    title: "Domain-Based Quizzes",
    desc: "Each intern automatically receives questions from their exact domain — Frontend, Backend, UI/UX, Data Science and 8+ more.",
  },
  {
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    title: "AI Question Generation",
    desc: "Groq API auto-generates 20 MCQs per domain with four options. Existing questions are reused to avoid duplication.",
  },
  {
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    title: "Real-Time Leaderboard",
    desc: "Rankings by score then time. Interns search their position using their unique ID — transparent and merit-first.",
  },
  {
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    title: "Badges & Recognition",
    desc: "Win a contest, earn a badge. 3 badges in a month = Intern of the Month. History tracked forever, monthly counts reset.",
  },
  {
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    title: "Anti-Cheat System",
    desc: "Tab-switch detection, one attempt per intern, question shuffling, and backend timing validation — contests stay fair.",
  },
  {
    icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    title: "Admin Control Centre",
    desc: "Upload intern data, create contests, trigger generation, and monitor all domain results from one centralised dashboard.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-16 px-6 md:px-[6%] bg-gray-50">
      <SectionTag>Platform Features</SectionTag>
      <SectionTitle>Everything your intern program needs</SectionTitle>
      <SectionSub>
        From automated question generation to real-time leaderboards —
        built to scale with zero manual overhead.
      </SectionSub>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {FEATURES.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-white border border-sky-100 rounded-2xl p-6 relative overflow-hidden
              group hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(2,132,199,0.12)]
              hover:border-sky-200 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]
              bg-gradient-to-r from-brand-700 to-sky-400
              scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-700 to-sky-400
              flex items-center justify-center mb-4
              shadow-[0_6px_16px_rgba(2,132,199,0.28)]">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d={icon} />
              </svg>
            </div>
            <h3 className="font-syne font-bold text-[15px] text-sky-900 mb-2">{title}</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
const STEPS = [
  { num: "01", title: "Admin Creates Contest",  desc: "Set a date, select domains. System checks MongoDB for existing questions immediately." },
  { num: "02", title: "AI Generates Questions", desc: "Groq API produces 20 MCQs per domain. Duplicates detected and reused automatically." },
  { num: "03", title: "Interns Take the Quiz",  desc: "Login with unique ID and joining date, get the right domain quiz, answer in time." },
  { num: "04", title: "Results & Recognition",  desc: "Scores, rankings, badges and Intern of the Month published after the contest ends." },
];

function HowSection() {
  return (
    <section className="py-16 px-6 md:px-[6%]
      bg-gradient-to-br from-brand-700 via-brand-800 to-[#0d2d5e]
      relative overflow-hidden">
      <div className="absolute bottom-[-80px] right-[-60px] w-80 h-80 rounded-full bg-sky-400/10" />
      <SectionTag light>How It Works</SectionTag>
      <SectionTitle white>Four steps. Zero complexity.</SectionTitle>
      <SectionSub light>
        From contest setup to intern results — the entire lifecycle runs automatically.
      </SectionSub>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 relative z-10">
        {STEPS.map(({ num, title, desc }) => (
          <div
            key={num}
            className="bg-white/[0.08] border border-white/15 rounded-2xl p-6
              hover:bg-white/[0.14] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="font-syne font-extrabold text-4xl text-sky-300 opacity-30 leading-none mb-3">
              {num}
            </div>
            <h3 className="font-syne font-bold text-sm text-white mb-2">{title}</h3>
            <p className="text-xs text-brand-100 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   LEADERBOARD
───────────────────────────────────────── */
const LB_DATA = [
  { pos: "#1", pc: "text-yellow-400", ini: "AK", bg: "bg-yellow-100", fg: "text-yellow-900", name: "Ayush Kumar",  dom: "Frontend",    sc: 19 },
  { pos: "#2", pc: "text-gray-400",   ini: "PS", bg: "bg-green-100",  fg: "text-green-900",  name: "Priya Sharma", dom: "Data Science", sc: 18 },
  { pos: "#3", pc: "text-orange-400", ini: "RV", bg: "bg-orange-100", fg: "text-orange-900", name: "Rohan Verma",  dom: "Backend",      sc: 17 },
  { pos: "#4", pc: "text-gray-400",   ini: "SP", bg: "bg-pink-100",   fg: "text-pink-900",   name: "Sneha Patel",  dom: "UI/UX",        sc: 17 },
  { pos: "#5", pc: "text-gray-400",   ini: "AN", bg: "bg-sky-100",    fg: "text-sky-900",    name: "Arjun Nair",   dom: "Backend",      sc: 16 },
];

function LeaderboardSection() {
  return (
    <section className="py-16 px-6 md:px-[6%] bg-sky-50">
      <SectionTag>Live Rankings</SectionTag>
      <SectionTitle>See who's leading the pack</SectionTitle>
      <SectionSub>Transparent, merit-based — ranked by score, time as tiebreaker.</SectionSub>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
        {/* Table */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(2,132,199,0.12)]">
          <div className="bg-gradient-to-r from-brand-700 to-sky-600 px-6 py-4
            flex justify-between items-center">
            <span className="font-syne font-bold text-sm text-white">
              April 2026 — Top Performers
            </span>
            <span className="text-xs text-white/65">Score / 20</span>
          </div>
          {LB_DATA.map(({ pos, pc, ini, bg, fg, name, dom, sc }) => (
            <div
              key={pos}
              className="flex items-center gap-3 px-5 py-3 border-b border-sky-50
                last:border-0 hover:bg-sky-50 transition-colors"
            >
              <span className={`font-syne font-extrabold text-sm w-7 flex-shrink-0 ${pc}`}>{pos}</span>
              <div className={`w-8 h-8 rounded-full ${bg} ${fg} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                {ini}
              </div>
              <span className="flex-1 text-sm font-medium text-gray-700 truncate">{name}</span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-brand-50 text-brand-800 font-medium flex-shrink-0">
                {dom}
              </span>
              <span className="font-syne font-extrabold text-sm text-brand-700 ml-1 flex-shrink-0">
                {sc}
              </span>
            </div>
          ))}
          <div className="px-6 py-3 text-center text-xs text-gray-400">
            Search your ranking with your intern ID →
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-syne font-extrabold text-2xl text-sky-900 mb-3 leading-tight">
            Fair. Transparent.
            <br />Merit-first.
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            Rankings by highest score, with time as tiebreaker. No favoritism — only performance counts.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Score-first ranking",        sub: "Most correct answers wins"                    },
              { label: "Time as tiebreaker",          sub: "Faster interns rank higher on equal scores"  },
              { label: "Badge & monthly recognition", sub: "3 wins = Intern of the Month"                },
            ].map(({ label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3.5 bg-brand-50 rounded-2xl border border-sky-200"
              >
                <div className="w-9 h-9 bg-brand-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[13px] text-sky-900">{label}</div>
                  <div className="text-xs text-gray-500">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CTASection() {
  return (
    <section className="bg-gradient-to-r from-sky-600 to-brand-900 py-16 px-6 md:px-[6%]
      text-center relative overflow-hidden">
      <div className="absolute top-[-60px] left-[-60px] w-64 h-64 rounded-full bg-white/[0.06]" />
      <div className="relative z-10">
        <h2 className="font-syne font-extrabold text-[clamp(22px,3.5vw,40px)] text-white mb-3">
          Ready to gamify your intern program?
        </h2>
        <p className="text-sky-200 text-sm mb-7 max-w-md mx-auto leading-7">
          Set up your first contest in minutes. No manual question writing, no spreadsheet scoring.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-brand-700 px-8 py-3.5 rounded-full
            font-semibold text-sm shadow-[0_6px_20px_rgba(0,0,0,0.15)]
            hover:-translate-y-0.5 transition-all"
        >
          Contact Us Today
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────── */
function SectionTag({ children, light }) {
  return (
    <div className={`inline-block text-[11px] font-bold tracking-[0.12em] uppercase
      px-3.5 py-1.5 rounded-full mb-4
      ${light ? "bg-white/15 text-brand-100" : "bg-brand-50 text-sky-600"}`}>
      {children}
    </div>
  );
}
function SectionTitle({ children, white }) {
  return (
    <h2 className={`font-syne font-extrabold text-[clamp(22px,3vw,36px)]
      leading-tight mb-3 ${white ? "text-white" : "text-sky-900"}`}>
      {children}
    </h2>
  );
}
function SectionSub({ children, light }) {
  return (
    <p className={`text-sm leading-7 max-w-lg ${light ? "text-brand-100" : "text-gray-500"}`}>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────
   HOME PAGE (default export)
───────────────────────────────────────── */
export default function Home({ onLogin }) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden
        bg-gradient-to-br from-[#d4ebf9] via-[#bee0f7] to-[#a4d3f5]
        min-h-[calc(100vh-68px)] flex items-center px-6 md:px-[6%] py-14">

        {/* Background blobs */}
        <div className="absolute top-[-130px] right-[-90px] w-[480px] h-[480px]
          rounded-full bg-brand-400/10 animate-float anim-fill" />
        <div className="absolute bottom-[-70px] left-[-70px] w-64 h-64
          rounded-full bg-sky-400/10 animate-float2 anim-fill" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10
          items-center w-full max-w-7xl mx-auto">

          {/* Left */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white border border-sky-200
              rounded-full px-5 py-2.5 mb-6
              shadow-[0_2px_14px_rgba(2,132,199,0.1)]
              animate-fade-up anim-fill delay-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse-dot flex-shrink-0" />
              <span className="text-[13px] font-semibold text-sky-700 tracking-tight">
                AI-Powered Quiz Platform
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-syne font-extrabold leading-[1.05] text-sky-900 mb-5
                animate-fade-up anim-fill delay-2"
              style={{ fontSize: "clamp(46px, 6vw, 72px)" }}
            >
              Code.
              <br />Create.
              <br /><span className="text-brand-500">Compete.</span>
            </h1>

            <p className="text-[15px] text-gray-600 leading-8 max-w-[420px] mb-8
              animate-fade-up anim-fill delay-3">
              A domain-based quiz contest platform for interns —
              where every question matches your skill area,
              and every score tells your story.
            </p>

            <div className="flex gap-3 flex-wrap animate-fade-up anim-fill delay-4">
              <Link
                to="/about"
                className="bg-brand-700 text-white px-7 py-3.5 rounded-full text-sm
                  font-semibold shadow-[0_6px_20px_rgba(2,132,199,0.4)]
                  hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(2,132,199,0.5)]
                  transition-all"
              >
                Explore the Platform
              </Link>
              <button
                onClick={onLogin}
                className="bg-white text-sky-700 border border-sky-300 px-7 py-3.5
                  rounded-full text-sm font-medium
                  hover:bg-sky-50 hover:border-sky-500 transition-all cursor-pointer"
              >
                Login to Quiz
              </button>
            </div>
          </div>

          {/* Right illustration – hidden on small screens */}
          <div className="hidden lg:flex justify-center">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <StatsBar />
      <FeaturesSection />
      <HowSection />
      <LeaderboardSection />
      <CTASection />
    </>
  );
}
