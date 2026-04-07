import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Leaderboard() {
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
      className={`min-h-screen p-4 md:p-8 transition-all duration-300 ${
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
            className="p-2 rounded-lg bg-gray-700 text-white"
          >
            <option value="c++">C++</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-lg animate-pulse">Loading...</p>
      )}

      {/* No Data */}
      {!loading && data.length === 0 && (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">🚫 No Data Found</h2>
          <p className="text-gray-400 mt-2">
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
                  ? "bg-yellow-400 text-black scale-105"
                  : index === 1
                  ? "bg-gray-300 text-black"
                  : "bg-orange-300 text-black"
              }`}
            >
              <h2 className="text-xl font-bold">#{user.rank}</h2>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm">{user.email}</p>
              <p className="mt-2 font-bold">Score: {user.score}</p>
              <p className="text-sm">⏱ {user.timeTaken}s</p>
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
            className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl shadow-md backdrop-blur-md transition ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20"
                : "bg-black/5 hover:bg-black/10"
            }`}
          >
            <div>
              <h2 className="font-bold text-lg">
                #{user.rank} {user.name}
              </h2>
              <p className="text-sm opacity-70">{user.email}</p>
            </div>

            <div className="text-left md:text-right mt-2 md:mt-0">
              <p className="font-semibold">Score: {user.score}</p>
              <p className="text-sm">⏱ {user.timeTaken}s</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}