import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Contests", path: "/contests" },
    { name: "Question Bank", path: "/questions" },
    { name: "Rewards", path: "/rewards" },
    { name: "Profile", path: "/profile" },
  ];

  const adminItems = [
    { name: "Admin Panel", path: "/admin" },
    { name: "Upload Data", path: "/upload" },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar - responsive transform */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-sky-500 to-purple-600 dark:from-slate-900 dark:to-slate-950 text-white flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* TOP */}
        <div>
          {/* Logo & Close */}
          <div className="p-6 flex items-center justify-between">
            <div className="font-bold text-xl tracking-widest uppercase">
              ATHENURA
            </div>
            <button 
              onClick={onClose} 
              className="md:hidden text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* USER INFO */}
          {user  && (
            <div 
              onClick={() => { navigate('/profile'); onClose(); }} 
              className="px-6 mb-4 cursor-pointer"
            >
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur hover:bg-white/30 transition-all border border-white/5">
                <p className="font-semibold truncate">{user.userName}</p>
                <p className="text-xs text-gray-200 truncate">{user.domain}</p>
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-1 px-2">
            {menuItems.map((item, i) => (
              <button
                key={i}
                onClick={() => { navigate(item.path); onClose(); }}
                className={`text-left px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "bg-white text-sky-600 font-semibold shadow-md"
                    : "hover:bg-white/20"
                }`}
              >
                {item.name}
              </button>
            ))}

            {user?.role === "admin" &&
              adminItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { navigate(item.path); onClose(); }}
                  className="text-left px-4 py-3 rounded-lg hover:bg-white/20 text-yellow-300 transition-colors"
                >
                  {item.name}
                </button>
              ))}
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="p-4 flex flex-col gap-3">
          <button
            className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-colors border border-white/5"
          >
            ⚙️ Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold shadow-md transition-colors"
          >
            Logout
          </button>

          <div className="bg-white/20 rounded-xl p-3 text-center border border-white/10">
            <p className="text-sm">Upgrade to Pro</p>
            <button className="mt-2 bg-white text-sky-600 px-3 py-1 rounded-lg text-xs font-bold hover:scale-105 active:scale-95 transition-all">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;