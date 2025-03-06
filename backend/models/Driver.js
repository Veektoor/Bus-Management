const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    dateHired: { type: Date, default: Date.now },
    assignedBus: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Bus',
        required: false, 
        default: {} // Set the default value to an empty object
    },
    shift: { 
        type: String, 
        enum: ["morning", "evening"], 
        required: false 
    },
});

module.exports = mongoose.model('Driver', DriverSchema);
