const express = require('express');
const { 
  addCompany, 
  getCompanies, 
  updateCompany, 
  // updateCommunicationMethods, // Import the new method
  deleteCompany 
} = require('../controllers/companyController.js');


const router = express.Router();

// Company routes
router.post('/', addCompany);
router.get('/', getCompanies);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router;
