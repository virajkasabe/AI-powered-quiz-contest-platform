import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DomainReport() {
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState("c++");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/leaderboard?contestId=69d3c182e468f6f0e4f57e8e&domain=${domain}`
      );
      const result = await res.json();
      setData(result.data || []);
    } catch (err) {
      console.error(err);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [domain]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const topThree = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-all duration-300 font-sans ${
        theme === "dark"
          ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-100 to-white text-black"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          ⚡ Athenura Leaderboard
        </h1>

        <div className="flex gap-3">
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white border-none outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="c++">C++</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-lg"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-lg animate-pulse">Loading rankings...</p>
      )}

      {/* No Data */}
      {!loading && data.length === 0 && (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-slate-400">🚫 No Data Found</h2>
          <p className="text-slate-500 mt-2">
            No leaderboard data available for this domain
          </p>
        </div>
      )}

      {/* Top 3 */}
      {!loading && topThree.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {topThree.map((user, index) => (
            <motion.div
              key={index}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`p-6 rounded-2xl text-center shadow-xl backdrop-blur-lg ${
                index === 0
                  ? "bg-yellow-400 text-black scale-105 border-2 border-yellow-200"
                  : index === 1
                  ? "bg-slate-300 text-black border-2 border-slate-100"
                  : "bg-orange-300 text-black border-2 border-orange-200"
              }`}
            >
              <h2 className="text-2xl font-black mb-2">#{user.rank}</h2>
              <p className="text-lg font-bold truncate">{user.name}</p>
              <p className="text-xs opacity-70 mb-4">{user.email}</p>
              <div className="flex justify-around items-end pt-4 border-t border-black/10">
                <div>
                   <p className="text-[10px] font-bold uppercase opacity-60">Score</p>
                   <p className="text-xl font-black">{user.score}</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase opacity-60">Time</p>
                   <p className="text-sm font-bold">{user.timeTaken}s</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Others */}
      <div className="grid gap-4">
        {others.map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl shadow-md backdrop-blur-md transition border ${
              theme === "dark"
                ? "bg-white/5 border-white/5 hover:bg-white/10"
                : "bg-black/5 border-black/5 hover:bg-black/10"
            }`}
          >
            <div>
              <h2 className="font-bold text-lg">
                #{user.rank} {user.name}
              </h2>
              <p className="text-xs opacity-60">{user.email}</p>
            </div>

            <div className="text-left md:text-right mt-2 md:mt-0">
              <p className="font-bold">Score: {user.score}</p>
              <p className="text-xs opacity-70">⏱ {user.timeTaken}s</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}