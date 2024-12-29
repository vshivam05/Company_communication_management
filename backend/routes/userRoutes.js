const express = require('express');
const { 
  logCommunication, 
  getCommunications, 
  getNotifications 
} = require('../controllers/userController.js');

const Communication = require('../models/Communication.js'); // Assuming a Communication model exists

const router = express.Router();

// Welcome message function
const welcomeMessage = (req, res) => {
    res.json({ message: 'Welcome to the Communication Tracking App!' });
};

// User communication routes
router.get('/welcome', welcomeMessage); // Add welcome route
router.post('/communications', logCommunication);
router.get('/communications', getCommunications);
router.get('/notifications', getNotifications);

module.exports = router;
