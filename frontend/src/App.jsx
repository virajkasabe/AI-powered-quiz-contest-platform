import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Leaderboard from './pages/DomainReport';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Leaderboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
