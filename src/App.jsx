import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import UserPage from './components/UserPage';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/customer/dashboard" element={<UserPage />} />
        <Route path="/contractor/dashboard" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
