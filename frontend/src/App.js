import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import CompanyManagement from './pages/CompanyManagement'; 
import Navbar from './Navbar'; // New import
import LogCommunication from './pages/LogCommunication';
import CalendarView from './pages/CalendarView'; // Import CalendarView component
import Notifications from './pages/Notifications'; // New import
import CommunicationMethodManagement from './pages/CommunicationMethodManagement'; // New import
import Dashboard from './pages/Dashboard'; // Import the Dashboard component

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar /> 
                <Routes> 
                    <Route path="/companies" element={<CompanyManagement />} />
                    <Route path="/log-communication" element={<LogCommunication />} />
                    <Route path="/notifications" element={<Notifications />} /> 
                    <Route path="/communication-methods" element={<CommunicationMethodManagement />} />
                    <Route path="/calendar" element={<CalendarView />} />
                    <Route path="/dashboard" element={<Dashboard />} /> {/* New route for Dashboard */}
                    <Route path="/" element={<h1 className="text-3xl font-bold">Welcome to the Communication Tracking App</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
