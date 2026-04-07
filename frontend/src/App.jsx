import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './pages/Leaderboard';
import DomainReport from './pages/DomainReport';
import InternDashboard from './pages/InternDashboard';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import ProfilePage from './components/Profile';
import LoginPage from './pages/Login';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route element={<MainLayout />} >
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/reports" element={<DomainReport />} />
              <Route path="/intern" element={<InternDashboard />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider >
  );
}

export default App;