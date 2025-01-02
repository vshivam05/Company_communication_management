import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import LandingPage from "./pages/LandingPage";
import AdminLogin from "./pages/AdminLogin";
import CompanyManagement from "./pages/CompanyManagement";
import Navbar from "./Navbar";
import LogCommunication from "./pages/LogCommunication";
import Notifications from "./pages/Notifications";
import CommunicationMethodManagement from "./pages/CommunicationMethodManagement";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";  // Import the AdminPage component

// Set base URL for API requests
axios.defaults.baseURL = "http://localhost:5000";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State for admin authentication

  useEffect(() => {
    // Check for existing token on initial load
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAdmin(true); // Assuming the token indicates an admin user
      console.log("Admin user detected",token);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/admin/login"
            element={<AdminLogin setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />}
          />
          <Route path="/userpage" element={<UserPage />} />

          {/* Protected Admin Routes */}
          {isAuthenticated && isAdmin && (
            <>
              <Route path="/admin" element={<AdminPage />} /> {/* Admin Page */}
              <Route path="/companies" element={<CompanyManagement />} />
              <Route path="/communication-methods" element={<CommunicationMethodManagement />} />
              <Route path="/log-communication" element={<LogCommunication />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}

          {/* If user is authenticated but not an admin, redirect to UserPage */}
          {isAuthenticated && !isAdmin && <Route path="/userpage" element={<UserPage />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
