// models/Bus.js
const mongoose = require('mongoose');
const BusSchema = new mongoose.Schema({
    busNumber: String,
    capacity: Number,
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
    morningDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
    eveningDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
    location: { 
        lat: { type: Number, default: () => -1.26 + Math.random() * (-1.20 + 1.26)},
        lng: { type: Number, default: () => 36.82 + Math.random() * (37.00 - 36.82)}
    }
});

module.exports = mongoose.model('Bus', BusSchema);
