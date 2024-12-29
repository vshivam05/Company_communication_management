const mongoose = require('mongoose');

const communicationMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const CommunicationMethod = mongoose.model('CommunicationMethod', communicationMethodSchema);

module.exports = CommunicationMethod;
