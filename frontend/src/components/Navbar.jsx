import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../assets/Athenura.png";
import logoLight from "../assets/Athenura.png"; // TODO: Add Athenura-light.png to this folder

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

  const whiteHeaderRoutes = ["/", "/about", "/contact", "/login", "/register"];
  const isWhiteHeader = whiteHeaderRoutes.includes(location.pathname);

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between
        px-6 md:px-10 lg:px-14 h-20 transition-all duration-300 border-b
        ${isWhiteHeader 
          ? "bg-white text-gray-800 border-gray-100 shadow-sm" 
          : "bg-slate-900 text-white border-slate-800 shadow-md"}`}
    >
      {/* ── Logo ── */}
      <Link to="/" className="flex items-center">
        <img 
          src={isWhiteHeader ? logoDark : logoLight} 
          alt="Athenura Logo" 
          className="h-12 md:h-14 w-auto object-contain" 
        />
      </Link>

      {/* ── Desktop Links ── */}
      <ul className="hidden md:flex flex-1 justify-center items-center gap-8 list-none">
        {links.map(({ to, label }) => {
          const active = location.pathname === to;
          
          let linkClass = `relative text-sm font-medium pb-1 transition-colors
            after:absolute after:bottom-0 after:left-0 after:h-[2px]
            after:rounded-full after:transition-all `;
            
          if (isWhiteHeader) {
            linkClass += active 
              ? "text-blue-600 after:w-full after:bg-blue-600" 
              : "text-gray-700 hover:text-blue-600 after:w-0 after:bg-blue-600 hover:after:w-full";
          } else {
            linkClass += active 
              ? "text-white after:w-full after:bg-sky-400" 
              : "text-gray-300 hover:text-white after:w-0 after:bg-sky-400 hover:after:w-full";
          }

          return (
            <li key={to}>
              <Link to={to} className={linkClass}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ── Desktop Buttons ── */}
      <div className="hidden md:flex items-center gap-2.5">
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
        <span className={`w-6 h-0.5 rounded transition-all duration-300 ${isWhiteHeader ? "bg-gray-800" : "bg-slate-400"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-6 h-0.5 rounded transition-all duration-300 ${isWhiteHeader ? "bg-gray-800" : "bg-slate-400"} ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-0.5 rounded transition-all duration-300 ${isWhiteHeader ? "bg-gray-800" : "bg-slate-400"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className={`animate-slide-down absolute top-20 left-0 right-0 border-b shadow-lg px-6 py-4 flex flex-col gap-3 md:hidden
          ${isWhiteHeader ? "bg-white border-gray-100" : "bg-slate-900 border-slate-800"}`}
        >
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            
            let mobileLinkClass = `text-sm font-medium py-2 border-b `;
            if (isWhiteHeader) {
              mobileLinkClass += active ? "text-blue-600 border-gray-100" : "text-gray-700 border-gray-100";
            } else {
              mobileLinkClass += active ? "text-white border-slate-800" : "text-gray-300 border-slate-800";
            }

            return (
              <Link
                key={to}
                to={to}
                className={mobileLinkClass}
              >
                {label}
              </Link>
            );
          })}
          <div className="flex gap-2 mt-2">
            <Link
              to="/contact"
              className="w-full bg-gradient-to-r from-brand-700 to-sky-500 text-white py-2.5
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
