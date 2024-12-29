const CommunicationMethod = require('../models/CommunicationMethod');

const getCommunicationMethods = async (req, res) => {
    try {
        const methods = await CommunicationMethod.find();
        res.json(methods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCommunicationMethod = async (req, res) => {
    const method = new CommunicationMethod(req.body);
    try {
        const savedMethod = await method.save();
        res.status(201).json(savedMethod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCommunicationMethod = async (req, res) => {
    try {
        const updatedMethod = await CommunicationMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMethod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCommunicationMethod = async (req, res) => {
    try {
        await CommunicationMethod.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getCommunicationMethods,
    createCommunicationMethod,
    updateCommunicationMethod,
    deleteCommunicationMethod,
};
