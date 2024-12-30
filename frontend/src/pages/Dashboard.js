import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dashboard'); // Use the updated endpoint for dashboard
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="overflow-x-auto">
                {dashboardData.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Company Name</th>
                                <th className="border p-2 text-left">Last 5 Communications</th>
                                <th className="border p-2 text-left">Next Scheduled Communication</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.map((company, index) => (
                                <tr key={index} className="border-b">
                                    <td className="border p-2">{company.companyName || 'No Name'}</td>

                                    <td className="border p-2">
                                        {company.lastFiveCommunications.length > 0 ? (
                                            <ul className="list-none">
                                                {company.lastFiveCommunications.map((comm, idx) => (
                                                    <li key={idx} className="py-1">
                                                        {comm.type} - {comm.date || 'No Date'}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No communications available</p>
                                        )}
                                    </td>

                                    <td className="border p-2">
                                        {company.nextScheduledCommunication ? (
                                            <span>
                                                {company.nextScheduledCommunication.type} - {company.nextScheduledCommunication.date || 'No Date'}
                                            </span>
                                        ) : (
                                            'No scheduled communication'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
