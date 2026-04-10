import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-sky-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Sidebar - responsive drawer */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto">
           <div className="p-5 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-sm dark:shadow-slate-900/20 border border-sky-100/50 dark:border-slate-700/50 mx-3 sm:mx-6 lg:mx-auto">
             <Outlet />
           </div>
        </main>
      </div>
    </div>
  );

};

export default MainLayout;