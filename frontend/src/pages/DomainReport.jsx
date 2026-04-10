import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DomainReport() {
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState("c++");

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



  const topThree = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <div
      className="min-h-screen bg-sky-50 dark:bg-slate-900 p-4 md:p-8 font-sans"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-slate-900 dark:text-white">
          ⚡ Athenura Leaderboard
        </h1>

        <div className="flex gap-3">
            <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-[1.5px] border-slate-200 dark:border-slate-700 rounded-[14px] text-sm font-semibold focus:border-sky-400 focus:ring-[3px] focus:ring-sky-100/50 text-slate-900 dark:text-slate-100"
          >
            <option value="c++">C++</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>

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
              className={`p-6 rounded-3xl text-center shadow-2xl border border-sky-100/50 backdrop-blur-sm bg-white/90 ${
                index === 0
                  ? "ring-4 ring-yellow-200/50 scale-105 border-yellow-400 bg-yellow-50/80"
                  : index === 1
                  ? "ring-2 ring-slate-100 border-slate-200 bg-slate-50/80"
                  : "ring-4 ring-orange-200/50 border-orange-400 bg-orange-50/80"
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
              "dark:bg-slate-800/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/70"
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