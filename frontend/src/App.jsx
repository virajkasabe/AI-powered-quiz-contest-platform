import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './pages/Leaderboard';

import InternDashboard from './pages/InternDashboard';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/intern" element={<InternDashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
