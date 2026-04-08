import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [domainCount, setDomainCount] = useState(0);

    useEffect(() => {
        // ✅ Get logged-in user from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) return;

        setUser(storedUser);

        // ✅ Fetch leaderboard just for domain count
        fetch("http://localhost:5000/api/overall")
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    const count = data.data.filter(
                        (item) => item.domain === storedUser.domain
                    ).length;
                    setDomainCount(count);
                }
            })
            .catch(err => console.error("Error fetching leaderboard data:", err));
    }, []);

    if (!user) {
        return (
            <div className="h-screen flex items-center justify-center text-xl text-white bg-black font-sans">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 font-sans">
            {/* Logo */}
            <div className="text-3xl font-bold text-center mb-8 tracking-wider">
                <span className="text-blue-500">Athenura</span>
            </div>

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto bg-gray-900/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-700"
            >
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Avatar */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold"
                    >
                        {user.userName?.charAt(0)}
                    </motion.div>

                    {/* Info */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold">{user.userName}</h2>
                        <p className="text-gray-400">ID: {user.id}</p>

                        <div className="mt-3 flex flex-wrap gap-4 justify-center md:justify-start">
                            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                                Domain: {user.domain}
                            </span>
                            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                                Interns in Domain: {domainCount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    {[
                        { label: "Badges", value: user.badgesEarned },
                        { label: "Domain", value: user.domain },
                        { label: "Rank", value: "#2" }, // later dynamic
                        { label: "Status", value: user.status },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center shadow-inner"
                        >
                            <p className="text-gray-400 text-sm">{item.label}</p>
                            <p className="text-xl font-semibold">{item.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Badges Section */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4">Badges</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Beginner", "Intermediate", "Pro", "Legend"].map(
                            (badge, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gray-800 p-4 rounded-xl text-center border border-gray-700 shadow-inner"
                                >
                                    <div className="text-2xl">🏆</div>
                                    <p className="mt-2">{badge}</p>
                                    <p className="text-sm text-gray-400">
                                        {user.badgesEarned > index ? "Unlocked" : "Locked"}
                                    </p>
                                </motion.div>
                            )
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfilePage;