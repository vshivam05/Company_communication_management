const Company = require('../models/Company');
const CommunicationMethod = require('../models/CommunicationMethod'); // Import CommunicationMethod model

// Add a new company
const addCompany = async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        const savedCompany = await newCompany.save();
        res.status(201).json({ company: savedCompany });
    } catch (error) {
        res.status(500).json({ message: 'Error adding company', error });
    }
};

// Get all companies
const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate('communicationMethods'); // Populate communication methods
        console.log(companies);
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companies', error });
    }
};

// Update a company
  
const updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ company: updatedCompany });
    } catch (error) {
        res.status(500).json({ message: 'Error updating company', error });
    }
};

// Update communication methods for a company
const updateCommunicationMethods = async (req, res) => {
    try {
        const { communicationMethods } = req.body; // Expecting an array of communication method IDs
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, { communicationMethods }, { new: true });
        res.status(200).json({ company: updatedCompany });
    } catch (error) {
        res.status(500).json({ message: 'Error updating communication methods', error });
    }
};

// Delete a company
const deleteCompany = async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting company', error });
    }
};

module.exports = {
    addCompany,
    getCompanies,
    updateCompany,
    updateCommunicationMethods, // Export the new method
    deleteCompany
};
