const express = require('express');
const { getCommunications } = require('../controllers/communicationMethodController');
const communicationController = require('../controllers/communicationController');

const router = express.Router();

// Route to fetch communications
router.get('/', getCommunications);

// Create a new communication
router.post('/', communicationController.createCommunication);

// Fetch all communications
// router.get('/communications', communicationController.getCommunications);

// Update a communication by ID
router.put('/communications/:id', communicationController.updateCommunication);

// Delete a communication by ID
router.delete('/communications/:id', communicationController.deleteCommunication);

module.exports = router;
