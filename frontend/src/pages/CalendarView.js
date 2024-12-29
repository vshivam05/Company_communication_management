import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalendarView = () => {
  const [communications, setCommunications] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Set initial date to today in YYYY-MM-DD format

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/communications'); // Adjust endpoint as necessary
        setCommunications(response.data);
      } catch (error) {
        console.error('Error fetching communications:', error);
      }
    };
    fetchCommunications();
  }, []);

  const handleDateChange = (event) => {
    setDate(event.target.value); // Update date from input
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Calendar View</h2>
      <input 
        type="date" 
        value={date} 
        onChange={handleDateChange} 
        className="border rounded p-2 mb-4"
      />
      <div className="mt-4">
        <h3 className="text-xl">Communications on {new Date(date).toLocaleDateString()}</h3>
        <ul>
          {communications
            .filter(comm => new Date(comm.date).toDateString() === new Date(date).toDateString())
            .map(comm => (
              <li key={comm._id} className="p-2 border-b border-gray-200">
                {comm.type} - {new Date(comm.date).toLocaleTimeString()}<br />
                Notes: {comm.notes}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarView;
