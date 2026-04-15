import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Leaderboard from './pages/Leaderboard';
import DomainReport from './pages/DomainReport';
import InternDashboard from './pages/InternDashboard';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

import ProfilePage from './components/Profile';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/Adminloginpage';
import QuizPage from './pages/QuizPage';
import CreateContest from './pages/CreateContest';
import MainLayout from './layout/MainLayout';
import NotFound from './pages/NotFound';
import ReviewQuiz from './pages/ReviewQuiz';
import AllContests from './pages/AllContests';
import ReviewQuestion from './pages/ReviewQuestion';
import AllInterns from './pages/AllInterns';
import UploadInterns from './pages/UploadInterns';

import Register from './pages/Register';

import MyQuizzes from './pages/MyQuizzes';
import UpcomingQuiz from './pages/UpcomingQuiz';
import InternLeaderboard from './pages/InternLeaderboard';


function AppRoutes() {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<Home onLogin={() => navigate('/login')} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<LoginPage onLogin={() => navigate('/intern')} onAdminClick={() => navigate('/admin-login')} />} />

        <Route path='/admin-login' element={<AdminLoginPage onLogin={() => navigate('/reports')} onBackClick={() => navigate('/')} />} />
        <Route path='/register' element={<Register />} />

        <Route path='/admin-login' element={<AdminLoginPage onLogin={() => navigate('/all-interns')} onBackClick={() => navigate('/')} />} />

        <Route path='/quiz' element={<QuizPage />} />
        
        <Route element={<MainLayout />} >
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/intern-leaderboard" element={<InternLeaderboard />} />
          <Route path="/reports" element={<DomainReport />} />
          <Route path="/intern" element={<InternDashboard />} />
          <Route path="/my-quizzes" element={<MyQuizzes />} />
          <Route path="/upcoming" element={<UpcomingQuiz />} />
          <Route path='/profile' element={<ProfilePage />} />
<Route path="/create-contest" element={<CreateContest />} />
          <Route path="/contests" element={<AllContests />} />
          <Route path="/review-question" element={<ReviewQuestion />} />
          <Route path="/review-quiz" element={<ReviewQuiz />} />
          <Route path="/all-interns" element={<AllInterns />} />
          <Route path="/upload-interns" element={<UploadInterns />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;