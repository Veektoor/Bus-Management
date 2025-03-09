const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Driver = require('../models/Driver');
const Bus = require('../models/Bus'); 

// Get all drivers and populate the assigned bus details
router.get('/all', async (req, res) => {
  try {
    const drivers = await Driver.find().populate('assignedBus'); // Populating the assignedBus field
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers', error });
  }
});

// Get a specific driver by ID and populate the assigned bus details
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('assignedBus'); // Populating the assignedBus field
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver', error });
  }
});

// Add a new driver and assign them to a bus
router.post('/', async (req, res) => {
  try {

    const { name, licenseNumber, assignedBus, shift } = req.body;

    // Validate assignedBus: Convert to ObjectId or set to null
    let busId = assignedBus && mongoose.isValidObjectId(assignedBus) ? assignedBus : null;

    // If a bus is assigned, check if it's already assigned to another driver
    if (busId) {
      const existingDriver = await Driver.findOne({ assignedBus: busId });
      if (existingDriver) {
        return res.status(400).json({ message: `Bus ${assignedBus} is already assigned to another driver.` });
      }
    }

    // Create a new driver
    const newDriver = new Driver({
      name,
      licenseNumber,
      assignedBus: busId,  // Set busId as ObjectId or null
      shift,
    });

    // Save the driver to the database
    const savedDriver = await newDriver.save();

    if (busId) {
      await Bus.findByIdAndUpdate(busId, { driver: savedDriver._id }, { new: true });
    }

    res.status(201).json(savedDriver);
  } catch (error) {
    console.error("Error adding driver:", error);
    res.status(500).json({ message: 'Error adding driver', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, licenseNumber, assignedBus, shift } = req.body;

    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    let busId = assignedBus && mongoose.isValidObjectId(assignedBus) ? assignedBus : null;

    if (busId) {
      const existingDriver = await Driver.findOne({ assignedBus: busId });
      if (existingDriver && existingDriver._id.toString() !== driver._id.toString()) {
        return res.status(400).json({ message: `Bus ${assignedBus} is already assigned to another driver.` });
      }
    }

    if (driver.assignedBus && driver.assignedBus.toString() !== busId) {
      await Bus.findByIdAndUpdate(driver.assignedBus, { driver: null });
    }

    driver.name = name || driver.name;
    driver.licenseNumber = licenseNumber || driver.licenseNumber;
    driver.shift = shift || driver.shift;
    driver.assignedBus = busId;

    const updatedDriver = await driver.save();

    if (busId) {
      await Bus.findByIdAndUpdate(busId, { driver: updatedDriver._id }, { new: true });
    }

    const populatedDriver = await updatedDriver.populate('assignedBus');

    res.status(200).json(populatedDriver);
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ message: 'Error updating driver', error });
  }
});

// Get all drivers and return the count
router.get('/', async (req, res) => {
  try {
    const driverCount = await Driver.countDocuments();
    res.status(200).json({ count: driverCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver count', error });
  }
});

module.exports = router;
