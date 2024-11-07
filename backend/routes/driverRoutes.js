const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver'); // Adjust the path according to your project structure

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers', error });
  }
});

// Get a specific driver by ID
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver', error });
  }
});

// Create a new driver
router.post('/', async (req, res) => {
  const newDriver = new Driver(req.body);
  try {
    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(400).json({ message: 'Error creating driver', error });
  }
});

// Update an existing driver
router.put('/:id', async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: 'Error updating driver', error });
  }
});

// Delete a driver
router.delete('/:id', async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver', error });
  }
});

// Get all drivers and return the count
router.get('/count', async (req, res) => {
  try {
    const driverCount = await Driver.countDocuments();
    res.status(200).json({ count: driverCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver count', error });
  }
});


module.exports = router;
