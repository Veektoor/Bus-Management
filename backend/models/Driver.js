const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    dateHired: { type: Date, default: Date.now },
    assignedBus: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Bus',
        required: false, 
        default: null,
    },
    shift: { 
        type: String, 
        enum: ["morning", "evening"], 
        required: false 
    },
});

module.exports = mongoose.model('Driver', DriverSchema);
