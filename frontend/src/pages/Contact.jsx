import React, { useState } from "react";
import { Link } from "react-router-dom";

/* ─── reusable form field ─── */
function Field({ label, type, placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-gray-700 mb-1 tracking-wide">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-sky-100 rounded-xl px-4 py-2.5 text-sm
          bg-sky-50 outline-none
          focus:border-sky-400 focus:bg-white
          focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]
          transition-all"
      />
    </div>
  );
}

/* ─── info row ─── */
function InfoBlock({ label, value, sub, link }) {
  return (
    <div className="border-b border-sky-100 pb-5 last:border-0">
      <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-sky-500 mb-1">
        {label}
      </div>
      <div className={`text-[14px] font-semibold ${link ? "text-sky-600" : "text-gray-700"}`}>
        {value}
      </div>
      <div className="text-[12px] text-gray-500 mt-0.5 leading-5 whitespace-pre-line">{sub}</div>
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fname: "", lname: "", email: "", org: "", interest: "", msg: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.fname.trim() || !form.email.trim()) {
      alert("Please fill in your name and email.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-sky-50 via-[#cce8f9] to-sky-200
        px-6 md:px-[6%] py-14 relative overflow-hidden">
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64
          rounded-full bg-brand-300/15 blur-2xl" />
        <div className="relative z-10 animate-fade-up anim-fill delay-1">
          <div className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase
            bg-brand-50 text-sky-600 px-3.5 py-1.5 rounded-full mb-4">
            Contact Us
          </div>
          <h1 className="font-syne font-extrabold text-[clamp(30px,5vw,52px)]
            text-sky-900 mb-3 leading-tight">
            Let's connect
          </h1>
          <p className="text-[15px] text-gray-600 max-w-[400px] leading-7">
            Have questions about the platform? Want a demo?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="py-14 px-6 md:px-[6%]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">

          {/* ── Form card ── */}
          <div className="bg-white border border-sky-100 rounded-3xl p-8
            shadow-[0_8px_32px_rgba(2,132,199,0.08)] animate-fade-up anim-fill delay-1">
            <h3 className="font-syne font-extrabold text-[17px] text-sky-900 mb-6">
              Send us a message
            </h3>

            {!submitted ? (
              <div className="flex flex-col gap-4">
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field
                    label="First Name" type="text" placeholder="Ayush"
                    value={form.fname} onChange={(v) => set("fname", v)} required
                  />
                  <Field
                    label="Last Name" type="text" placeholder="Kumar"
                    value={form.lname} onChange={(v) => set("lname", v)}
                  />
                </div>

                <Field
                  label="Email Address" type="email" placeholder="ayush@company.com"
                  value={form.email} onChange={(v) => set("email", v)} required
                />
                <Field
                  label="Organisation" type="text" placeholder="Your company or institution"
                  value={form.org} onChange={(v) => set("org", v)}
                />

                {/* Interest select */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1 tracking-wide">
                    I'm interested in
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => set("interest", e.target.value)}
                    className="w-full border border-sky-100 rounded-xl px-4 py-2.5 text-sm
                      bg-sky-50 outline-none focus:border-sky-400 focus:bg-white
                      transition-all appearance-none cursor-pointer text-gray-700"
                  >
                    <option value="">Select an option...</option>
                    <option>Platform Demo</option>
                    <option>Setting up Intern Contests</option>
                    <option>Integration &amp; API Access</option>
                    <option>Pricing Information</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1 tracking-wide">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your intern program and what you're looking for..."
                    rows={4}
                    value={form.msg}
                    onChange={(e) => set("msg", e.target.value)}
                    className="w-full border border-sky-100 rounded-xl px-4 py-2.5 text-sm
                      bg-sky-50 outline-none focus:border-sky-400 focus:bg-white
                      transition-all resize-y min-h-[100px]"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-brand-700 to-sky-500 text-white
                    py-3.5 rounded-full text-sm font-semibold
                    shadow-[0_6px_18px_rgba(2,132,199,0.35)]
                    hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(2,132,199,0.45)]
                    transition-all cursor-pointer border-none mt-1"
                >
                  Send Message
                </button>
              </div>
            ) : (
              /* Success state */
              <div className="text-center py-10 bg-sky-50 rounded-2xl border border-sky-200">
                <div className="w-14 h-14 rounded-full bg-green-100
                  flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-green-600"
                    viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-syne font-bold text-base text-sky-700 mb-2">
                  Message sent!
                </h3>
                <p className="text-sm text-gray-500">
                  Thanks for reaching out. The <img src="/logo-icon.svg" alt="Athenura" className="inline-block h-3 w-auto object-contain -mt-1 mr-1" /> team will get back to you
                  within 1–2 business days.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ fname:"", lname:"", email:"", org:"", interest:"", msg:"" });
                  }}
                  className="mt-5 text-xs text-brand-600 underline cursor-pointer
                    bg-transparent border-none"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* ── Info panel ── */}
          <div className="animate-fade-up anim-fill delay-2">
            <div className="flex flex-col gap-5 mb-6">
              <InfoBlock
                label="Platform"
                value="Quiz Gaming Software"
                sub="Domain-Based Contest Platform for Interns by <img src='/logo-icon.svg' className='inline h-3 w-auto object-contain align-middle' />"
              />
              <InfoBlock
                label="Website"
                value="www.athenura.in"
                sub="Visit for more on our full suite of products"
                link
              />
              <InfoBlock
                label="Response Time"
                value="Within 1–2 business days"
                sub="Our team reviews every message personally"
              />
              <InfoBlock
                label="Platform Type"
                value="AI-Powered Quiz Contest"
                sub={"Roles: Admin + Intern / User\nOutput: Leaderboard, Badges, Intern of Month"}
              />
            </div>

            {/* Highlight card */}
            <div className="bg-gradient-to-br from-brand-700 to-brand-900
              rounded-2xl p-6 text-white">
              <h3 className="font-syne font-bold text-[15px] mb-2.5">New to Athenura?</h3>
              <p className="text-[13px] text-brand-200 leading-relaxed mb-4">
                Our platform runs contests across up to 12 domains simultaneously.
                Every intern gets questions from their own field, scored fairly, instantly.
              </p>
              <Link
                to="/about"
                className="inline-block bg-white/15 text-white border border-white/30
                  px-5 py-2 rounded-full text-xs hover:bg-white/25 transition-all"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="pb-14 px-6 md:px-[6%]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              title: "Email Us",
              sub: "Reach out anytime",
              val: "hello@athenura.in",
            },
            {
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
              title: "Location",
              sub: "Head office",
              val: "India",
            },
            {
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "Working Hours",
              sub: "Support available",
              val: "Mon – Fri, 9am – 6pm IST",
            },
          ].map(({ icon, title, sub, val }) => (
            <div
              key={title}
              className="bg-sky-50 border border-sky-100 rounded-2xl p-5
                flex items-start gap-4
                hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(2,132,199,0.1)]
                transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-700
                flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d={icon} />
                </svg>
              </div>
              <div>
                <div className="font-syne font-bold text-[13px] text-sky-900">{title}</div>
                <div className="text-[11px] text-gray-500 mb-0.5">{sub}</div>
                <div className="text-[13px] font-medium text-gray-700">{val}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
