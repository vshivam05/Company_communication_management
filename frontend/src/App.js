import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import CompanyManagement from './pages/CompanyManagement';
import Navbar from './Navbar';
import LogCommunication from './pages/LogCommunication';
import CalendarView from './pages/CalendarView';
import Notifications from './pages/Notifications';
import CommunicationMethodManagement from './pages/CommunicationMethodManagement';
import Dashboard from './pages/Dashboard';

// Set base URL for API requests
axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing token on initial load
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/companies" element={<CompanyManagement />} />
          <Route path="/log-communication" element={<LogCommunication />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/communication-methods" element={<CommunicationMethodManagement />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
    );
};

export default App;
