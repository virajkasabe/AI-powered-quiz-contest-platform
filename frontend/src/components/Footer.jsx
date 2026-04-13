import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sky-900 to-[#061f35] text-sky-200 pt-12 pb-6 px-6 md:px-[6%]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Brand */}
        <div>
          <div className="font-syne font-extrabold text-xl text-white mb-3">Athenura</div>
          <p className="text-sm leading-7 text-sky-300">
            Code. Create. Innovate.
            <br />
            The AI-powered quiz contest platform for intern programs —
            automated, fair, and built for scale.
          </p>
        </div>

        {/* Platform links */}
        <div>
          <h4 className="font-syne font-bold text-sm text-white mb-3 tracking-wide">
            Platform
          </h4>
          {[
            { to: "/",        label: "Home"    },
            { to: "/about",   label: "About"   },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block text-sm text-sky-300 hover:text-white mb-2 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Features */}
        <div>
          <h4 className="font-syne font-bold text-sm text-white mb-3 tracking-wide">
            Features
          </h4>
          {["Domain Quizzes", "AI Generation", "Leaderboard", "Badges"].map((f) => (
            <span key={f} className="block text-sm text-sky-300 mb-2">
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-sky-200/10 pt-5 text-center text-sm text-sky-400">
        © 2026 Athenura. All rights reserved. | www.athenura.in
      </div>
    </footer>
  );
}
