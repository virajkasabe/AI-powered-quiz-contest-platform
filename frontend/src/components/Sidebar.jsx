import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
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

  // 🔥 Admin extra features
  const adminItems = [
    { name: "Admin Panel", path: "/admin" },
    { name: "Upload Data", path: "/upload" },
  ];

  return (
    <div className="w-64 bg-gradient-to-br from-sky-500 to-purple-600 dark:from-slate-900 dark:to-slate-950 text-white flex flex-col justify-between hidden md:flex">

      {/* TOP */}
      <div>
        {/* Logo */}
        <div className="p-6 font-bold text-xl tracking-widest uppercase">
          ATHENURA
        </div>

        {/* USER INFO */}
        {user  && (
          <div onClick={() => navigate('/profile')} className="px-6 mb-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur">
              <p className="font-semibold">{user.userName}</p>
              <p className="text-xs text-gray-200">{user.domain}</p>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-1 px-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`text-left px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-white text-sky-600 font-semibold"
                  : "hover:bg-white/20"
              }`}
            >
              {item.name}
            </button>
          ))}

          {/* 🔥 Admin Only */}
          {user?.role === "admin" &&
            adminItems.map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className="text-left px-4 py-3 rounded-lg hover:bg-white/20 text-yellow-300"
              >
                {item.name}
              </button>
            ))}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="p-4 flex flex-col gap-3">

        {/* SETTINGS */}
        <button
          className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg"
        >
          ⚙️ Settings
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>

        {/* UPGRADE CARD */}
        <div className="bg-white/20 rounded-xl p-3 text-center">
          <p className="text-sm">Upgrade to Pro</p>
          <button className="mt-2 bg-white text-sky-600 px-3 py-1 rounded-lg text-xs font-bold">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;