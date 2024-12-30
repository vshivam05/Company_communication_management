import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogCommunication = () => {
    const [companies, setCompanies] = useState([]);
    const [allCommunicationTypes, setAllCommunicationTypes] = useState([]);
    const [filteredCommunicationTypes, setFilteredCommunicationTypes] = useState([]);
    const [communication, setCommunication] = useState({
        companyId: '',
        type: '',
        date: '', // Start Communication Date
        notes: '',
        communicationDate: '' // Last Communication Date
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch companies and communication methods on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [companiesResponse, communicationTypesResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/companies'),
                    axios.get('http://localhost:5000/api/communication-methods')
                ]);
                setCompanies(companiesResponse.data);
                setAllCommunicationTypes(communicationTypesResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err.message);
                setError('Failed to fetch data. Please try again.');
            }
        };
        fetchData();
    }, []);

    // Update communication types based on selected company
    useEffect(() => {
        if (communication.companyId) {
            const filteredTypes = allCommunicationTypes.filter(
                (type) => type.companyId === communication.companyId
            );
            setFilteredCommunicationTypes(filteredTypes);
        } else {
            setFilteredCommunicationTypes([]);
        }
    }, [communication.companyId, allCommunicationTypes]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommunication((prev) => ({ ...prev, [name]: value }));
    };

    const logCommunication = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/communications', communication);
            setMessage('Communication logged successfully!');
            setError('');
            setCommunication({
                companyId: '',
                type: '',
                date: '',
                notes: '',
                communicationDate: ''
            });
        } catch (err) {
            console.error('Error logging communication:', err.response?.data || err.message);
            setError('Failed to log communication. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="p-6 max-w-2xl content-center mx-auto"> 
            <h2 className="text-2xl font-bold mb-4">Log Communication</h2>
            {message && <div className="text-green-500">{message}</div>}
            {error && <div className="text-red-500">{error}</div>}

            <form onSubmit={logCommunication} className="grid grid-cols-1 gap-4">
                {/* Company Selection */}
                <label htmlFor="companyId" className="block text-sm font-medium text-gray-700">
                    Company
                </label>
                <select
                    id="companyId"
                    name="companyId"
                    value={communication.companyId}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                        <option key={company._id} value={company._id}>
                            {company.name}
                        </option>
                    ))}
                </select>

                {/* Communication Type Selection */}
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Communication Type
                </label>
                <select
                    id="type"
                    name="type"
                    value={communication.type}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Select Communication Type</option>
                    {filteredCommunicationTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                            {type.name}
                        </option>
                    ))}
                </select>

                {/* Start Communication Date */}
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Start Communication Date
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={communication.date}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Notes */}
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                </label>
                <input
                    type="text"
                    id="notes"
                    name="notes"
                    placeholder="Add your notes"
                    value={communication.notes}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Last Communication Date */}
                <label htmlFor="communicationDate" className="block text-sm font-medium text-gray-700">
                    Last Communication Date
                </label>
                <input
                    type="date"
                    id="communicationDate"
                    name="communicationDate"
                    value={communication.communicationDate}
                    onChange={handleInputChange}
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Submit Button */}
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
