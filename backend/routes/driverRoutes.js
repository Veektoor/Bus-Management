const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver'); // Adjust the path according to your project structure
const Bus = require('../models/Bus'); // Assuming you have a Bus model

// Get all drivers and populate the assigned bus details
router.get('/', async (req, res) => {
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
  const { name, licenseNumber, assignedBus,shift } = req.body;

  // Validate that a bus is assigned
  if (!assignedBus) {
    return res.status(400).json({ message: 'Please assign a bus to the driver' });
  }

  try {
    // Check if the bus is already assigned to another driver
    const existingDriver = await Driver.findOne({ assignedBus });
    if (existingDriver) {
      return res
        .status(400)
        .json({ message: `Bus ${assignedBus} is already assigned to another driver.` });
    }

    // Create a new driver with the provided information
    const newDriver = new Driver({
      name,
      licenseNumber,
      assignedBus,
      shift,
    });

    // Save the new driver to the database
    const savedDriver = await newDriver.save();

    // Respond with the saved driver
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(500).json({ message: 'Error adding driver', error });
  }
});

// Update an existing driver and populate the assigned bus
router.put('/:id', async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('assignedBus'); // Populating the assignedBus field
    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: 'Error updating driver', error });
  }
});
//endpoint for assigning buses
router.put('/:id/assign-bus', async (req, res) => {
  const { busId } = req.body; // Bus ID to assign

  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Assign the bus to the driver
    driver.assignedBus = busId;
    await driver.save();

    // Populate the assignedBus field and return the updated driver
    const updatedDriver = await driver.populate('assignedBus');
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: 'Error assigning bus', error });
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
