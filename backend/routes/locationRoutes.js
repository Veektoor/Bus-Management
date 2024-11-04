const express = require('express');
const router = express.Router();

let currentLocation = {}; 

// Update location
router.post('/update-location', (req, res) => {
    const { latitude, longitude } = req.body;

    // Validate latitude and longitude
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ message: 'Latitude and Longitude must be numbers.' });
    }
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return res.status(400).json({ message: 'Latitude must be between -90 and 90, and Longitude must be between -180 and 180.' });
    }

    currentLocation = { latitude, longitude }; 
    res.json({ message: 'Current location updated successfully', currentLocation });
});

// Get current location
router.get('/current-location', (req, res) => {
    res.json(currentLocation); 
});

module.exports = router;
