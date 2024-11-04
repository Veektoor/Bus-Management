const express = require('express');
const router = express.Router();

let currentLocation = {}; 

// Update location
router.post('/update-location', (req, res) => {
    const { latitude, longitude } = req.body;
    currentLocation = { latitude, longitude }; 
    res.send('Current location updated successfully');
});

// Get current location
router.get('/current-location', (req, res) => {
    res.json(currentLocation); 
});

module.exports = router;
