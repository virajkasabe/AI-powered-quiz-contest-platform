import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  { q: "What does HTML stand for?", opts: ["HyperText Markup Language", "HighText Machine Language", "Hyper Transfer Markup Language", "HyperText Machine Link"], ans: 0 },
  { q: "Which CSS property is used to change the text color of an element?", opts: ["font-color", "text-color", "color", "foreground-color"], ans: 2 },
  { q: "Which HTML tag is used to define an internal style sheet?", opts: ["<css>", "<script>", "<style>", "<link>"], ans: 2 },
  { q: "What does CSS stand for?", opts: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], ans: 1 },
  { q: "Which HTML attribute is used to define inline styles?", opts: ["class", "font", "styles", "style"], ans: 3 },
  { q: "Which property is used to set the background color in CSS?", opts: ["bgcolor", "color", "background-color", "background"], ans: 2 },
  { q: "Which tag is used to create a hyperlink in HTML?", opts: ["<link>", "<a>", "<href>", "<url>"], ans: 1 },
  { q: "In JavaScript, which operator compares both value and type?", opts: ["==", "!=", "===", "="], ans: 2 },
  { q: "Which CSS property controls the size of text?", opts: ["text-size", "font-size", "text-style", "font-style"], ans: 1 },
  { q: "What is the correct syntax to refer to an external script called 'app.js'?", opts: ["<script href='app.js'>", "<script name='app.js'>", "<script src='app.js'>", "<script file='app.js'>"], ans: 2 },
  { q: "Which HTML element is used to display a scalar measurement within a known range?", opts: ["<gauge>", "<meter>", "<progress>", "<range>"], ans: 1 },
  { q: "Which CSS unit is relative to the font-size of the root element?", opts: ["em", "rem", "px", "%"], ans: 1 },
  { q: "What does the 'z-index' CSS property control?", opts: ["Zoom level", "Horizontal position", "Vertical position", "Stack order"], ans: 3 },
  { q: "Which method is used to add an element at the end of an array in JavaScript?", opts: ["push()", "pop()", "shift()", "append()"], ans: 0 },
  { q: "What is the default display value of a <div> element?", opts: ["inline", "block", "inline-block", "flex"], ans: 1 },
  { q: "Which CSS property is used to make a flex container?", opts: ["display:flex", "flex:1", "position:flex", "layout:flex"], ans: 0 },
  { q: "What does the 'alt' attribute in an <img> tag provide?", opts: ["Image title", "Alternative text", "Image size", "Image link"], ans: 1 },
  { q: "Which JavaScript method selects an element by its ID?", opts: ["querySelector()", "getElement()", "getElementById()", "findById()"], ans: 2 },
  { q: "What is the correct way to write a comment in CSS?", opts: ["// comment", "/* comment */", "<!-- comment -->", "# comment"], ans: 1 },
  { q: "Which HTML tag defines the largest heading?", opts: ["<h6>", "<heading>", "<h1>", "<head>"], ans: 2 },
];

const TOTAL = QUESTIONS.length;
const TOTAL_SECONDS = 20 * 60;
const LABELS = ["A", "B", "C", "D"];

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getResultMsg(pct) {
  if (pct >= 90) return { msg: "Outstanding! You're a star! 🌟", color: "text-sky-600" };
  if (pct >= 75) return { msg: "Excellent work! Keep it up! 🎉", color: "text-green-600" };
  if (pct >= 55) return { msg: "Good job! A little more practice! 👍", color: "text-amber-600" };
  return { msg: "Keep practicing, you can do it! 💪", color: "text-red-500" };
}

// ── Submit Confirmation Modal ──────────────────────────────────────────────────
function SubmitModal({ answers, marked, onConfirm, onCancel }) {
  const attempted = answers.filter((a) => a !== null).length;
  const notAttempted = TOTAL - attempted;
  const markedCount = marked.filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl border border-sky-100 shadow-2xl w-full max-w-sm p-6">
        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4L4 9v7c0 6.4 4.3 12.4 10 14 5.7-1.6 10-7.6 10-14V9L14 4z" stroke="#0EA5E9" strokeWidth="1.8"/>
              <path d="M9.5 14l3 3L18.5 11" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-sky-900" style={{ fontFamily: "'Outfit',sans-serif" }}>
            Submit Quiz?
          </h3>
          <p className="text-xs text-slate-500 mt-1">Please review before final submission</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{attempted}</div>
            <div className="text-[10px] text-green-700 font-semibold mt-0.5">Attempted</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-red-500">{notAttempted}</div>
            <div className="text-[10px] text-red-600 font-semibold mt-0.5">Not Attempted</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">{markedCount}</div>
            <div className="text-[10px] text-purple-700 font-semibold mt-0.5">Marked</div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-slate-50 rounded-xl p-3 mb-5 space-y-1.5">
          <p className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Question Status</p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-5 h-5 rounded-md bg-green-500 flex-shrink-0 block"></span>
            Answered — {attempted} questions
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-5 h-5 rounded-md bg-red-400 flex-shrink-0 block"></span>
            Not Answered — {notAttempted} questions
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-5 h-5 rounded-md bg-purple-400 flex-shrink-0 block"></span>
            Marked for Review — {markedCount} questions
          </div>
        </div>

        {notAttempted > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-4 text-xs text-amber-700 font-medium">
            ⚠ You have {notAttempted} unanswered question{notAttempted > 1 ? "s" : ""}. They will be marked wrong.
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-10 rounded-xl bg-sky-500 text-white text-sm font-bold hover:bg-sky-600 transition-all"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main QuizPage ──────────────────────────────────────────────────────────────
export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(new Array(TOTAL).fill(null));
  const [marked, setMarked] = useState(new Array(TOTAL).fill(false)); // marked for review
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const startTimeRef = useRef(Date.now());

  const internName = "Ayush Kumar";
  const internDomain = "Frontend";
  const internId = "ATHENURA/25/10115";

  // ── Timer ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(interval); confirmSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  // ── Select answer ────────────────────────────────────────────────────────────
  const selectAnswer = (optIndex) => {
    if (submitted) return;
    const updated = [...answers];
    updated[current] = optIndex;
    setAnswers(updated);
  };

  // ── Toggle mark for review ───────────────────────────────────────────────────
  const toggleMark = () => {
    if (submitted) return;
    const updated = [...marked];
    updated[current] = !updated[current];
    setMarked(updated);
  };

  // ── Navigate ─────────────────────────────────────────────────────────────────
  const goTo = (index) => {
    if (index < 0 || index >= TOTAL) return;
    setCurrent(index);
  };

  // ── Confirm submit ───────────────────────────────────────────────────────────
  const confirmSubmit = () => {
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    setTimeTaken(elapsed);
    setSubmitted(true);
    setShowModal(false);
    // TODO: POST to /api/quiz/submit → { internId, answers, timeTaken: elapsed }
  };

  // ── Stats ────────────────────────────────────────────────────────────────────
  const answeredCount = answers.filter((a) => a !== null).length;
  const notAnsweredCount = TOTAL - answeredCount;
  const markedCount = marked.filter(Boolean).length;
  const progressPct = Math.round(((current + 1) / TOTAL) * 100);
  const isLastQuestionAnswered = answers[TOTAL - 1] !== null;

  // ── Result ───────────────────────────────────────────────────────────────────
  const correctCount = answers.filter((a, i) => a === QUESTIONS[i].ans).length;
  const wrongCount = answers.filter((a, i) => a !== null && a !== QUESTIONS[i].ans).length;
  const scorePct = Math.round((correctCount / TOTAL) * 100);
  const resultMsg = getResultMsg(scorePct);

  // ── Timer color ──────────────────────────────────────────────────────────────
  const timerClass =
    timeLeft <= 60 ? "bg-red-100 text-red-700 animate-pulse"
    : timeLeft <= 180 ? "bg-amber-100 text-amber-700"
    : "bg-white text-sky-700";

  // ── Dot color logic ──────────────────────────────────────────────────────────
  const getDotClass = (i) => {
    if (i === current) return "bg-sky-500 border-sky-500 text-white";
    if (marked[i]) return "bg-purple-400 border-purple-400 text-white";
    if (answers[i] !== null) return "bg-green-500 border-green-500 text-white";  // answered = GREEN
    if (i < current) return "bg-red-400 border-red-400 text-white";               // visited but not answered = RED
    return "bg-white border-sky-200 text-slate-500";                               // not yet visited
  };

  return (
    <div className="min-h-screen bg-sky-50">

      {/* Submit Modal */}
      {showModal && (
        <SubmitModal
          answers={answers}
          marked={marked}
          onConfirm={confirmSubmit}
          onCancel={() => setShowModal(false)}
        />
      )}

      {/* ── HEADER ── */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3"
        style={{ background: "linear-gradient(135deg, #0EA5E9, #38BDF8)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/25 border border-white/40 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L4 6.5v5c0 4.6 3.1 8.9 7 10 3.9-1.1 7-5.4 7-10v-5L11 2z" fill="white" />
              <path d="M8 11l2.2 2.2L14 8.5" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-sm text-white" style={{ fontFamily: "'Outfit',sans-serif" }}>
              Athen<span className="text-sky-100">ura</span> Quiz
            </span>
            <p className="text-[10px] text-white/70 hidden sm:block">{internName} · {internId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block bg-white/20 border border-white/35 rounded-full px-3 py-0.5 text-xs font-semibold text-white">
            {internDomain}
          </span>
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${timerClass}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 4.5V7l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="h-1.5 bg-sky-200">
        <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
      </div>

      {/* ── BODY ── */}
      <div className="max-w-3xl mx-auto px-3 sm:px-5 py-4">

        {!submitted ? (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: "Total", val: TOTAL, color: "text-sky-900" },
                { label: "Answered", val: answeredCount, color: "text-green-600" },
                { label: "Not Answered", val: notAnsweredCount, color: "text-red-500" },
                { label: "Marked", val: markedCount, color: "text-purple-600" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-sky-100 p-2 text-center">
                  <div className={`text-lg sm:text-xl font-bold ${s.color}`}>{s.val}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                { color: "bg-sky-500", label: "Current" },
                { color: "bg-green-500", label: "Answered" },
                { color: "bg-red-400", label: "Not Answered" },
                { color: "bg-purple-400", label: "Marked" },
                { color: "bg-white border border-sky-200", label: "Not Visited" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium">
                  <span className={`w-3.5 h-3.5 rounded-sm ${l.color} flex-shrink-0`}></span>
                  {l.label}
                </div>
              ))}
            </div>

            {/* Question dots */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {QUESTIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-7 h-7 rounded-md border-[1.5px] text-[10px] font-bold transition-all ${getDotClass(i)}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Question card */}
            <div className="bg-white rounded-2xl border border-sky-100 p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                  Q {current + 1} / {TOTAL}
                </span>
                <div className="flex items-center gap-2">
                  {/* Mark for Review button */}
                  <button
                    onClick={toggleMark}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all
                      ${marked[current]
                        ? "bg-purple-100 border-purple-300 text-purple-700"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:border-purple-300 hover:text-purple-600"
                      }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1l1.5 3H11L8.5 6l1 3L6 7.5 2.5 9l1-3L1 4h3.5L6 1z"
                        stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
                        fill={marked[current] ? "currentColor" : "none"} />
                    </svg>
                    {marked[current] ? "Marked" : "Mark for Review"}
                  </button>
                  <span className="bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full border border-sky-200">
                    {internDomain}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base font-semibold text-sky-900 leading-relaxed mb-5">
                {QUESTIONS[current].q}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {QUESTIONS[current].opts.map((opt, i) => {
                  const isSelected = answers[current] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border-[1.5px] text-left text-sm font-medium transition-all
                        ${isSelected
                          ? "border-sky-400 bg-sky-50 text-sky-800"
                          : "border-slate-200 bg-slate-50 text-sky-900 hover:border-sky-400 hover:bg-sky-50"
                        }`}
                    >
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold flex-shrink-0
                        ${isSelected ? "border-sky-500 bg-sky-500 text-white" : "border-slate-300 text-slate-400"}`}>
                        {LABELS[i]}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation + Submit */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-100 text-sky-700 text-sm font-bold disabled:opacity-40 hover:bg-sky-200 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Prev
              </button>

              {/* Always visible Submit button */}
              <button
  onClick={() => setShowModal(true)}
  disabled={!isLastQuestionAnswered}
  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all
    ${isLastQuestionAnswered
      ? "bg-sky-900 text-white hover:bg-sky-800"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  Submit Quiz
</button>

              {current < TOTAL - 1 ? (
                <button
                  onClick={() => goTo(current + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-bold hover:bg-sky-600 transition-all"
                >
                  Next
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              ) : (
                <div className="w-20" />
              )}
            </div>
          </>
        ) : (
          /* ── RESULT SCREEN ── */
          <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 text-center">
            <div className="text-5xl mb-3">
              {scorePct >= 75 ? "🏆" : scorePct >= 55 ? "👍" : "💪"}
            </div>
            <div className="text-6xl font-bold text-sky-500 leading-none mb-1" style={{ fontFamily: "'Outfit',sans-serif" }}>
              {correctCount}
            </div>
            <div className="text-base text-slate-500 mb-3">out of {TOTAL}</div>
            <div className={`text-base font-bold mb-1 ${resultMsg.color}`}>{resultMsg.msg}</div>
            <div className="text-xs text-slate-400 mb-6">Score: {scorePct}% · Results saved to leaderboard</div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { label: "Correct", val: correctCount, color: "text-green-600", bg: "bg-green-50 border-green-100" },
                { label: "Wrong", val: wrongCount, color: "text-red-500", bg: "bg-red-50 border-red-100" },
                { label: "Skipped", val: TOTAL - answeredCount, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
                { label: "Time", val: `${timeTaken}s`, color: "text-sky-600", bg: "bg-sky-50 border-sky-100" },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl p-3 border ${s.bg}`}>
                  <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Answer Review */}
            <div className="text-left">
              <h3 className="text-sm font-bold text-sky-900 mb-3">Answer Review</h3>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {QUESTIONS.map((q, i) => {
                  const userAns = answers[i];
                  const isCorrect = userAns === q.ans;
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border p-3 text-xs ${
                        isCorrect ? "bg-green-50 border-green-200"
                        : userAns === null ? "bg-slate-50 border-slate-200"
                        : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="font-semibold text-slate-700 mb-1">Q{i + 1}. {q.q}</div>
                      <div className="flex flex-wrap gap-3">
                        <span className={isCorrect ? "text-green-700 font-medium" : "text-red-600 font-medium"}>
                          Your answer: {userAns !== null ? q.opts[userAns] : "Skipped"}
                        </span>
                        {!isCorrect && (
                          <span className="text-green-700 font-medium">
                            Correct: {q.opts[q.ans]}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl transition-all"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}