import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Options</h1>
      <div className="flex flex-wrap justify-center gap-6">
        <Link
          to="/companies"
          className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-64 text-center border border-gray-200 hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold text-gray-700">Companies</h2>
          <p className="text-gray-500 mt-2">Manage company information here.</p>
        </Link>
        <Link
          to="/communication-methods"
          className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-64 text-center border border-gray-200 hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold text-gray-700">Communication Methods</h2>
          <p className="text-gray-500 mt-2">Manage communication methods here.</p>
        </Link>
        <Link
          to="/log-communication"
          className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-64 text-center border border-gray-200 hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold text-gray-700">Log Communication</h2>
          <p className="text-gray-500 mt-2">View or manage communication logs here.</p>
        </Link>
        <Link
          to="/notifications"
          className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-64 text-center border border-gray-200 hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold text-gray-700">Notifications</h2>
          <p className="text-gray-500 mt-2">Manage notifications here.</p>
        </Link>
        <Link
          to="/dashboard"
          className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-64 text-center border border-gray-200 hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>
          <p className="text-gray-500 mt-2">Access your dashboard here.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
