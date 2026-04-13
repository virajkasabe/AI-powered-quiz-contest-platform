import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/",        label: "Home"    },
    { to: "/about",   label: "About"   },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 md:px-[6%] h-[68px] bg-white/95 backdrop-blur-xl
        border-b border-sky-100 transition-all duration-300
        ${scrolled ? "shadow-[0_4px_24px_rgba(2,132,199,0.1)]" : ""}`}
    >
      {/* ── Logo ── */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-700 to-sky-400
          flex items-center justify-center shadow-[0_4px_12px_rgba(2,132,199,0.35)]
          hover:scale-105 transition-transform flex-shrink-0">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="font-syne font-extrabold text-[19px] text-sky-800 tracking-tight">
          Athenura
        </span>
      </Link>

      {/* ── Desktop Links ── */}
      <ul className="hidden md:flex gap-8 list-none">
        {links.map(({ to, label }) => {
          const active = location.pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={`relative text-sm font-medium pb-1 transition-colors
                  after:absolute after:bottom-0 after:left-0 after:h-[2px]
                  after:rounded-full after:bg-sky-500 after:transition-all
                  ${active
                    ? "text-sky-600 after:w-full"
                    : "text-gray-600 hover:text-sky-600 after:w-0 hover:after:w-full"
                  }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ── Desktop Buttons ── */}
      <div className="hidden md:flex items-center gap-2.5">
        <button
          onClick={onLogin}
          className="bg-transparent text-sky-700 border border-sky-300 px-5 py-2
            rounded-full text-sm font-medium hover:bg-sky-50 hover:border-sky-500
            transition-all cursor-pointer"
        >
          Login
        </button>
        <Link
          to="/contact"
          className="bg-gradient-to-r from-brand-700 to-sky-500 text-white
            px-5 py-2 rounded-full text-sm font-medium
            shadow-[0_4px_14px_rgba(2,132,199,0.35)]
            hover:-translate-y-px transition-all"
        >
          Get Started
        </Link>
      </div>

      {/* ── Hamburger ── */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer border-none bg-transparent"
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="animate-slide-down absolute top-[68px] left-0 right-0 bg-white
          border-b border-sky-100 shadow-lg px-6 py-4 flex flex-col gap-3 md:hidden">
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium py-2 border-b border-sky-50
                  ${active ? "text-sky-600" : "text-gray-600"}`}
              >
                {label}
              </Link>
            );
          })}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => { setMenuOpen(false); onLogin(); }}
              className="flex-1 border border-sky-300 text-sky-700 py-2.5
                rounded-full text-sm font-medium bg-transparent cursor-pointer"
            >
              Login
            </button>
            <Link
              to="/contact"
              className="flex-1 bg-brand-700 text-white py-2.5
                rounded-full text-sm font-medium text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
