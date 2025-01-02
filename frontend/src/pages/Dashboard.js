import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dashboard');
                setDashboardData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : dashboardData.length > 0 ? (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-pink-500 text-white">
                                <th className="px-6 py-3 border-b text-left text-sm font-medium">Company Name</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium">Last 5 Communications</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium">Next Scheduled Communication</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.map((company, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">
                                        {company.companyName || 'No Name'}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">
                                        {company.lastFiveCommunications.length > 0 ? (
                                            <ul className="list-disc pl-4">
                                                {company.lastFiveCommunications.map((comm, idx) => (
                                                    <li key={idx} className="py-1">
                                                        <span className="font-semibold">{comm.type}</span> - {comm.date || 'No Date'}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">No communications available</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">
                                        {company.nextScheduledCommunication ? (
                                            <span className="font-semibold">
                                                {company.nextScheduledCommunication.type} - {company.nextScheduledCommunication.date || 'No Date'}
                                            </span>
                                        ) : (
                                            <p className="text-gray-500">No scheduled communication</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}
        </div>
    );
};

export default Dashboard;
