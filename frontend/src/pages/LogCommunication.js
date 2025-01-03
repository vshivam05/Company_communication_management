import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "./API";

const LogCommunication = () => {
  const [companies, setCompanies] = useState([]);
  const [allCommunicationTypes, setAllCommunicationTypes] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [communication, setCommunication] = useState({
    companyId: "",
    type: "",
    startDate: "",
    lastDate: "",
    notes: "",
  });

  const [filteredCommunicationTypes, setFilteredCommunicationTypes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentCommunication, setCurrentCommunication] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // To manage loading state

  const toggleForm = () => setIsVisible(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          communicationTypesResponse,
          companiesResponse,
          communicationsResponse,
        ] = await Promise.all([
          axios.get(`${API}/api/communication-methods`),
          axios.get(`${API}/api/companies`),
          axios.get(`${API}/api/communications`),
        ]);

        setCompanies(companiesResponse.data);
        setAllCommunicationTypes(communicationTypesResponse.data);
        setCommunications(communicationsResponse.data);
        setLoading(false); // Data fetched, stop loading
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to fetch data. Please try again.");
        setLoading(false); // Stop loading even on error
      }
    };
    fetchData();
  }, []);

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

  // Update the form fields when editing starts
  useEffect(() => {
    if (isEditing && currentCommunication) {
      setCommunication({
        companyId: currentCommunication.companyId,
        type: currentCommunication.type,
        startDate: formatDate(currentCommunication.startDate),
        lastDate: formatDate(currentCommunication.lastDate),
        notes: currentCommunication.notes,
      });
    }
  }, [isEditing, currentCommunication]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommunication((prev) => ({ ...prev, [name]: value }));
  };

  const logCommunication = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/communications",
        communication
      );
      setCommunications([...communications, response.data]);
      setMessage("Communication logged successfully!");
      setError("");
      setCommunication({
        companyId: "",
        type: "",
        startDate: "",
        lastDate: "",
        notes: "",
      });
      setIsVisible(false);
    } catch (err) {
      console.error(
        "Error logging communication:",
        err.response?.data || err.message
      );
      setError("Failed to log communication. Please try again.");
      setMessage("");
    }
  };

  const deleteCommunication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/communications/${id}`);
      setCommunications(communications.filter((comm) => comm._id !== id));
      setMessage("Communication deleted successfully!");
    } catch (err) {
      console.error("Error deleting communication:", err.message);
      setError("Failed to delete communication. Please try again.");
    }
  };

  // Utility function to format date to yyyy-MM-dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEdit = (comm) => {
    setIsEditing(true);
    setCurrentCommunication(comm);
    setIsVisible(true);
  };

  const updateCommunication = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/communications/${currentCommunication._id}`,
        communication
      );
      setCommunications(
        communications.map((comm) =>
          comm._id === currentCommunication._id ? response.data : comm
        )
      );
      setMessage("Communication updated successfully!");
      setError("");
      setIsEditing(false);
      setCommunication({
        companyId: "",
        type: "",
        startDate: "",
        lastDate: "",
        notes: "",
      });
      setIsVisible(false);
    } catch (err) {
      console.error(
        "Error updating communication:",
        err.response?.data || err.message
      );
      setError("Failed to update communication. Please try again.");
      setMessage("");
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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Log Communication</h2>
      {message && <div className="text-green-500">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!isVisible ? (
        <button
          className="bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700 mr-2"
          onClick={toggleForm}
        >
          Add Communication
        </button>
      ) : (
        <form
          onSubmit={isEditing ? updateCommunication : logCommunication}
          className="grid grid-cols-1 gap-4 mb-6"
        >
          <select
            name="companyId"
            value={communication.companyId}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2"
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>

          <select
            name="type"
            value={communication.type}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2"
          >
            <option value="">Select Communication Type</option>
            {filteredCommunicationTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="startDate"
            value={communication.startDate}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2"
          />
          <input
            type="date"
            name="lastDate"
            value={communication.lastDate}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2"
          />
          <textarea
            name="notes"
            value={communication.notes}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2"
            placeholder="Notes"
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {isEditing ? "Update Communication" : "Submit"}
          </button>
        </form>
      )}

      <h3 className="text-xl font-bold mb-4">Communication Logs</h3>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Company</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Notes</th>
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
            <th className="border border-gray-300 px-4 py-2">Last Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {communications.map((comm) => {
            const company = companies.find((comp) => comp._id === comm.companyId) || {};
            const communicationType =
              allCommunicationTypes.find((type) => type._id === comm.type) || {};

            return (
              <tr key={comm._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {company.name || "Unknown"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {communicationType.name || "Unknown"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {comm.notes}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(comm.startDate)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(comm.lastDate)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(comm)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCommunication(comm._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LogCommunication;
