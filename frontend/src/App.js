import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import CompanyManagement from './pages/CompanyManagement'; 
import Navbar from './Navbar'; // New import
import LogCommunication from './pages/LogCommunication';
import CalendarView from './pages/CalendarView'; // Import CalendarView component
import Notifications from './pages/Notifications'; // New import
import CommunicationMethodManagement from './pages/CommunicationMethodManagement'; // New import

const App = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        const fetchWelcomeMessage = async () => {
            try {
                const response = await fetch('/welcome');
                const data = await response.json();
                setWelcomeMessage(data.message);
            } catch (error) {
                console.error('Error fetching welcome message:', error);
            }
        };

        fetchWelcomeMessage();
    }, []);

    return (
        <Router>
            <div className="App">
                <Navbar /> 
                <h1>{welcomeMessage}</h1> {/* Display the welcome message */}
                <Routes> {/* Updated from Switch to Routes */}
                    <Route path="/companies" element={<CompanyManagement />} />
                    <Route path="/log-communication" element={<LogCommunication />} />
                    <Route path="/notifications" element={<Notifications />} /> {/* New route */}
                    <Route path="/communication-methods" element={<CommunicationMethodManagement />} /> {/* New route for managing communication methods */}
                    <Route path="/calendar" element={<CalendarView />} /> {/* New route for Calendar View */}
                    <Route path="/" element={<h1 className="text-3xl font-bold">Welcome to the Communication Tracking App</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

