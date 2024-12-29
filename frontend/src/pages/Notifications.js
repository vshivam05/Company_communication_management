import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <ul className="space-y-3">
                {notifications.map(notification => (
                    <li key={notification._id} className="p-4 bg-gray-50 rounded border border-gray-200 shadow-sm">
                        <p className="font-medium text-gray-800">{notification.type}</p>
                        <p className="text-sm text-gray-600">Due Date: {new Date(notification.dueDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{notification.notes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
