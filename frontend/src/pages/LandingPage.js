import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* <Navbar /> */}
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Communication Management</h1>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Admin Login
            </button>
            <button
              onClick={() => navigate('/userpage')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              User Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
