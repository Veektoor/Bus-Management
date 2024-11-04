// models/Bus.js
const mongoose = require('mongoose');
const BusSchema = new mongoose.Schema({
    busNumber: String,
    capacity: Number,
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }
});
module.exports = mongoose.model('Bus', BusSchema);
