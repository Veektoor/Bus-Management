// models/Driver.js
const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: String,
    licenseNumber: String,
    dateHired: {type:Date, default:Date.now()},
    assignedBus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }
});

module.exports = mongoose.model('Driver', DriverSchema);
