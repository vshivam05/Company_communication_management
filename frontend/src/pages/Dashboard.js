import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notifications from './Notifications'; // Import Notifications component

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <table className="table-auto w-full bg-gray-50 rounded shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">Company Name</th>
            <th className="px-4 py-2">Last Five Communications</th>
            <th className="px-4 py-2">Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{company.name}</td>
              <td className="px-4 py-2">
                {/* Display last five communications */}
              </td>
              <td className="px-4 py-2">
                {/* Display next scheduled communication */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;