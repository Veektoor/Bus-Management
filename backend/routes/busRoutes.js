// routes/busRoutes.js
const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Create a new bus
router.post('/', async (req, res) => {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
});

// Fetch all buses
router.get('/', async (req, res) => {
    const buses = await Bus.find().populate('route driver');
    res.json(buses);
});

// Fetch a single bus
router.get('/:id', async (req, res) => {
    const bus = await Bus.findById(req.params.id).populate('route driver');
    res.json(bus);
});

// Update and delete routes follow similar pattern...
module.exports = router;
