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
    { name: "Reports", path: "/reports" },
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
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-2xl border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* TOP */}
        <div>
          {/* Logo & Close */}
          <div className="p-6 flex items-center justify-between border-b border-slate-100">
            <div className="font-bold text-xl tracking-widest uppercase text-sky-600">
              ATHENURA
            </div>
            <button 
              onClick={onClose} 
              className="md:hidden text-slate-500 hover:bg-slate-100 p-2 rounded-lg transition-colors"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* USER INFO */}
          {user  && (
            <div 
              onClick={() => { navigate('/profile'); onClose(); }} 
              className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-semibold text-lg shadow-md">
                  {user.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{user.userName}</p>
                  <p className="text-xs text-slate-500">{user.domain}</p>
                </div>
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-0.5 px-4 py-4">
            {menuItems.map((item, i) => (
              <button
                key={i}
                onClick={() => { navigate(item.path); onClose(); }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                  location.pathname === item.path
                    ? "bg-sky-500 text-white shadow-lg"
                    : "text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:shadow-md"
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
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-all font-medium text-amber-600 border border-amber-200/50"
                >
                  {item.name}
                </button>
              ))}
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="p-4 border-t border-slate-100 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 px-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;