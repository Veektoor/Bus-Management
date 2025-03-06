const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Create a new bus
router.post('/', async (req, res) => {
    try {
        const bus = new Bus(req.body);  // Create a new bus with data from the request body
        await bus.save();  // Save the bus to the database
        res.status(201).json(bus);  // Respond with the created bus and 201 status code
    } catch (error) {
        res.status(400).json({ error: 'Failed to create bus', details: error.message });  // Error handling
    }
});

// Fetch all buses
router.get('/all', async (req, res) => {
    try {
        const buses = await Bus.find().populate('route driver');  
        res.json(buses); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch buses', details: error.message });  
    }
});

// Fetch a single bus by ID
router.get('/:id', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id).populate('route driver');  // Find bus by ID and populate related fields
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });  // Return a 404 if the bus is not found
        }
        res.json(bus);  // Respond with the bus data
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bus', details: error.message });  // Error handling
    }
});

// Update a bus (example route for updating bus data)
router.put('/:id', async (req, res) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('route driver');
        if (!updatedBus) {
            return res.status(404).json({ error: 'Bus not found for update' });
        }
        res.json(updatedBus);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update bus', details: error.message });
    }
});

// Delete a bus (example route for deleting a bus)
router.delete('/:id', async (req, res) => {
    try {
        const deletedBus = await Bus.findByIdAndDelete(req.params.id);
        if (!deletedBus) {
            return res.status(404).json({ error: 'Bus not found for deletion' });
        }
        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete bus', details: error.message });
    }
});

// API route to get the count of buses
router.get('/', async (req, res) => {
    try {
        const { start, end } = req.query; 
        const filter = {};
        if (start) filter["route.start"] = start;
        if (end) filter["route.end"] = end;
        const count = await Bus.countDocuments(filter);
        
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error fetching bus count:", error);
        res.status(500).json({ error: "Failed to fetch bus count", details: error.message });
    }
});

module.exports = router;
