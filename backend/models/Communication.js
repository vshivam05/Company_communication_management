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
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: true
    },
    communicationDate: { type: Date }, // New field for communication date
    lastCommunicationDate: { type: Date } // New field for last communication date
}); // Removed the extra comma here

const Communication = mongoose.model('Communication', communicationSchema);
module.exports = Communication;
