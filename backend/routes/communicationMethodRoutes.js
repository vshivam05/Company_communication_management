const express = require('express');
const { getCommunicationMethods, createCommunicationMethod, updateCommunicationMethod, deleteCommunicationMethod } = require('../controllers/communicationMethodController');

const router = express.Router();

router.get('/', getCommunicationMethods);
router.post('/', createCommunicationMethod);
router.put('/:id', updateCommunicationMethod);
router.delete('/:id', deleteCommunicationMethod);

module.exports = router;
