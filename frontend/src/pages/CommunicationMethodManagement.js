import axios from 'axios';
import React, { useState, useEffect } from 'react';

const predefinedMethods = [
    "LinkedIn Post",
    "LinkedIn Message",
    "Email",
    "Phone Call",
    "Other",
];

const CommunicationMethodManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [methods, setMethods] = useState([]);
    const [newMethod, setNewMethod] = useState({
        name: '',
        description: '',
        sequence: '',
        mandatory: false,
        companyId: '',
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/communication-methods');
                setMethods(response.data);
            } catch (error) {
                console.error('Error fetching communication methods:', error);
            }
        };
        fetchMethods();
    }, []);

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
        setNewMethod({ ...newMethod, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setNewMethod({ ...newMethod, mandatory: e.target.checked });
    };

    const addOrUpdateMethod = async (e) => {
        console.log('New Method Data:', newMethod); // Log the new method data
        e.preventDefault();
        try {
            if (newMethod._id) {
                const response = await axios.put(`http://localhost:5000/api/communication-methods/${newMethod._id}`, newMethod);
                console.log('Update Response:', response.data); // Log the response data
                setMethods(methods.map(method => (method._id === response.data._id ? response.data : method)));
            } else {
                const response = await axios.post('http://localhost:5000/api/communication-methods', newMethod);
                setMethods([...methods, response.data]);
            }
            setNewMethod({ name: '', description: '', sequence: '', mandatory: false, companyId: '' });
            setSelectedCompany('');
            setShowForm(false);
        } catch (error) {
            console.error('Error adding/updating communication method:', error);
        }
    };

    const deleteMethod = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/communication-methods/${id}`);
            setMethods(methods.filter(method => method._id !== id));
        } catch (error) {
            console.error('Error deleting communication method:', error);
        }
    };

    const editMethod = (method) => {
        setNewMethod(method);
        setShowForm(true);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Communication Method Management</h2>
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            >
                {showForm ? 'Close Form' : 'Add New Method'}
            </button>
            {showForm && (
                <form onSubmit={addOrUpdateMethod} className="grid grid-cols-1 gap-4 mb-6 bg-white p-6 rounded shadow">
                    <select
                        name="name"
                        value={newMethod.name}
                        onChange={handleInputChange}
                        required
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Communication Method</option>
                        {predefinedMethods.map((method, index) => (
                            <option key={index} value={method}>{method}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={newMethod.description}
                        onChange={handleInputChange}
                        required
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        name="sequence"
                        placeholder="Sequence"
                        value={newMethod.sequence}
                        onChange={handleInputChange}
                        required
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="mandatory"
                            checked={newMethod.mandatory}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        Mandatory
                    </label>
                    <select
                        name="companyId"
                        value={selectedCompany}
                        onChange={(e) => {
                            setSelectedCompany(e.target.value);
                            setNewMethod({ ...newMethod, companyId: e.target.value });
                        }}
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Company</option>
                        {companies.map(company => (
                            <option key={company._id} value={company._id}>{company.name}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {newMethod._id ? 'Update Method' : 'Add Method'}
                    </button>
                </form>
            )}
            <h3 className="text-xl font-bold mb-4">Existing Methods</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">Communication Method</th>
                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">Description</th>
                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">Sequence</th>
                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">Mandatory</th>
                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">Company</th>
                            <th className="px-6 py-2 text-center text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {methods.map(method => (
                            <tr key={method._id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-2 text-sm text-gray-800">{method.name}</td>
                                <td className="px-6 py-2 text-sm text-gray-800">{method.description}</td>
                                <td className="px-6 py-2 text-sm text-gray-800">{method.sequence}</td>
                                <td className="px-6 py-2 text-sm text-gray-800">{method.mandatory ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-2 text-sm text-gray-800">
                                    {companies.find(company => company._id === method.companyId)?.name || 'N/A'}
                                </td>
                                <td className="px-6 py-2 text-sm text-center">
                                    <button
                                        onClick={() => editMethod(method)}
                                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteMethod(method._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CommunicationMethodManagement;
