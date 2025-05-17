import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ChallengesListPage from './pages/ChallengesListPage';
import ChallengeDetailPage from './pages/ChallengeDetailPage';
import SubmitChallengePage from './pages/SubmitChallengePage';
import LeaderboardPage from './pages/LeaderboardPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/challenges" element={<ChallengesListPage />} />
                <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
                <Route path="/submit/:id" element={<SubmitChallengePage />} />
                <Route path="/leaderboard/:id" element={<LeaderboardPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App; 