// models/Fare.js
const mongoose = require('mongoose');

const FareSchema = new mongoose.Schema({
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true, unique: true },
    price: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Fare', FareSchema);
