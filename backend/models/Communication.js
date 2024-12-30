const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    startDate: { type: Date }, // New field for communication date
    lastDate: { type: Date } // New field for last communication date
}); // Removed the extra comma here

const Communication = mongoose.model('Communication', communicationSchema);
module.exports = Communication;
