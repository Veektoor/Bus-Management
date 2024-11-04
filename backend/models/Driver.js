// models/Driver.js
const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: String,
    licenseNumber: String,
    assignedBus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }
});

module.exports = mongoose.model('Driver', DriverSchema);
