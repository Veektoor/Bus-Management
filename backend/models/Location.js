const mongoose = require('mongoose');

const locationSchema= new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    buses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }],
    routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }]
});