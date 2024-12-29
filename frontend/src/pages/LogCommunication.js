import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogCommunication = () => {
    const [companies, setCompanies] = useState([]);
    const [communication, setCommunication] = useState({
        companyId: '',
        name: '',
        description: '',
        sequence: '',
        mandatory: false,
        date: '',
        notes: '',
        dueDate: ''
    });
    const [message, setMessage] = useState(''); // State for confirmation message
    const [error, setError] = useState(''); // State for error message

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommunication({ ...communication, [name]: value });
    };

    const logCommunication = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/communication-methods', communication);
            setMessage('Communication logged successfully!'); // Set confirmation message
            setError(''); // Clear error message
            // Reset form
            setCommunication({
                companyId: '',
                name: '',
                description: '',
                sequence: '',
                mandatory: false,
                date: '',
                notes: '',
                dueDate: ''
            });
        } catch (error) {
            console.error('Error logging communication:', error);
            setError('Failed to log communication. Please try again.'); // Set error message
            setMessage(''); // Clear confirmation message
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Log Communication</h2>
            {message && <div className="text-green-500">{message}</div>} {/* Display confirmation message */}
            {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
            <form onSubmit={logCommunication} className="grid grid-cols-1 gap-4">
                <select
                    name="companyId"
                    value={communication.companyId}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Select Company</option>
                    {companies.map(company => (
                        <option key={company._id} value={company._id}>{company.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="name"
                    placeholder="Communication Type"
                    value={communication.name}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={communication.description}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    name="sequence"
                    placeholder="Sequence"
                    value={communication.sequence}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="mandatory"
                        checked={communication.mandatory}
                        onChange={(e) => setCommunication({ ...communication, mandatory: e.target.checked })}
                        className="mr-2"
                    />
                    Mandatory
                </label>
                <input
                    type="date"
                    name="date"
                    value={communication.date}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    value={communication.notes}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="date"
                    name="dueDate"
                    value={communication.dueDate}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Log Communication
                </button>
            </form>
        </div>
    );
};

export default LogCommunication;
