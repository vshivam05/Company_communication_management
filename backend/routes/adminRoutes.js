const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const {adminLogin} = require('../controllers/adminController');
// Admin login
router.post('/login', adminLogin);

module.exports = router;
