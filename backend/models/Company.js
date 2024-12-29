const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    linkedin: { type: String },
    emails: { type: String },
    phoneNumbers: { type: String },
    comments: { type: String },
    periodicity: { type: String }
});

module.exports = mongoose.model('Company', companySchema);
