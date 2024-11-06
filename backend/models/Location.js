const mongoose = require('mongoose');

// Define the location schema
const locationSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    buses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }],
    routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }]
}, { timestamps: true }); 

// Create the model from the schema
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
