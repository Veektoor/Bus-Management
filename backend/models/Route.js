// models/Route.js
const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true },
    stops: { type: [String] },
    buses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }]
}, { timestamps: true });

module.exports = mongoose.model('Route', RouteSchema);
