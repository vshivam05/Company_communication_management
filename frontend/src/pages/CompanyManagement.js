import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from './API';
const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedin: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingCompany, setEditingCompany] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
const [loading, setLoading] = useState(true);
  // Fetch companies on component load
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${API}/api/companies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // console.log(localStorage.getItem('adminToken'));

        setCompanies(response.data || []);
        setLoading(false);
      } catch (error) {
        console.log(localStorage.getItem('adminToken'));
        console.error('Error fetching companies:', error.response ? error.response.data : error.message);
      }
    };
    fetchCompanies();
  }, [newCompany]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingIndex !== null) {
      setEditingCompany({ ...editingCompany, [name]: value });
    } else {
      setNewCompany({ ...newCompany, [name]: value });
    }
  };

  // Add a new company
  const addCompany = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${API}/api/companies`, newCompany, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCompanies([...companies, response.data]);
      setNewCompany({
        name: '',
        location: '',
        linkedin: '',
        emails: '',
        phoneNumbers: '',
        comments: '',
        periodicity: ''
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding company:', error.response ? error.response.data : error.message);
    }
  };

  // Edit a company
  const editCompany = (index) => {
    setEditingIndex(index);
    setEditingCompany(companies[index]);
    setIsFormVisible(true);
  };

  // Update a company
  const updateCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API}/api/companies/${editingCompany._id}`,
        editingCompany
      );
      const updatedCompanies = companies.map((company, index) =>
        index === editingIndex ? response.data : company
      );
      setCompanies(updatedCompanies);
      setEditingIndex(null);
      setEditingCompany({});
      setIsFormVisible(false);
      // setLoading(true);
      
    } catch (error) {
      console.error('Error updating company:', error.response ? error.response.data : error.message);
    }
  };

  // Delete a company
  const deleteCompany = async (id) => {
    try {
      await axios.delete(`${API}/api/companies/${id}`);
      setCompanies(companies.filter((company) => company._id !== id));
    } catch (error) {
      console.error('Error deleting company:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Management</h2>

        {/* Toggle Button */}
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-teal-600 text-white px-4 py-2 rounded mb-4 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {isFormVisible ? 'Hide Form' : 'Add Company'}
        </button>

        {/* Add/Edit Company Form */}
        {isFormVisible && (
          <form
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8"
            onSubmit={editingIndex !== null ? updateCompany : addCompany}
          >
            <input
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="name"
              placeholder="Company Name"
              value={editingIndex !== null ? editingCompany.name : newCompany.name}
              onChange={handleInputChange}
              required
            />
            <input
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="location"
              placeholder="Location"
              value={editingIndex !== null ? editingCompany.location : newCompany.location}
              onChange={handleInputChange}
            />
            <input
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="url"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={editingIndex !== null ? editingCompany.linkedin : newCompany.linkedin}
              onChange={handleInputChange}
            />
            <input
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="emails"
              placeholder="Emails (comma-separated)"
              value={editingIndex !== null ? editingCompany.emails : newCompany.emails}
              onChange={handleInputChange}
            />
            <input
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="phoneNumbers"
              placeholder="Phone Numbers (comma-separated)"
              value={editingIndex !== null ? editingCompany.phoneNumbers : newCompany.phoneNumbers}
              onChange={handleInputChange}
            />
            <textarea
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="comments"
              placeholder="Comments"
              value={editingIndex !== null ? editingCompany.comments : newCompany.comments}
              onChange={handleInputChange}
            />
            <input
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="periodicity"
              placeholder="Periodicity"
              value={editingIndex !== null ? editingCompany.periodicity : newCompany.periodicity}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="col-span-full bg-teal-600 text-white p-3 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {editingIndex !== null ? 'Update Company' : 'Add Company'}
            </button>
          </form>
        )}

        {/* Company List Table */}

        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">LinkedIn</th>
                <th className="px-4 py-2">Emails</th>
                <th className="px-4 py-2">Phone Numbers</th>
                <th className="px-4 py-2">Comments</th>
                <th className="px-4 py-2">Periodicity</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={company._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">{company.name}</td>
                  <td className="px-4 py-2">{company.location}</td>
                  <td className="px-4 py-2">
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </td>
                  <td className="px-4 py-2">{company.emails}</td>
                  <td className="px-4 py-2">{company.phoneNumbers}</td>
                  <td className="px-4 py-2">{company.comments}</td>
                  <td className="px-4 py-2">{company.periodicity}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => editCompany(index)}
                      className="text-teal-600 hover:text-teal-800 mr-2 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCompany(company._id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
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
    </div>
  );
};

export default CompanyManagement;
