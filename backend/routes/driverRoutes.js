const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const Driver = require('../models/Driver');
const Bus = require('../models/Bus'); 
const {authenticate, authorize}= require('../middlewares/jwt')

// Get all drivers and populate assigned bus details (Protected Route)
router.get("/all", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const drivers = await Driver.find().populate("assignedBus"); 
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drivers", error: error.message });
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

    // Validate shift
    if (!["morning", "evening"].includes(shift)) {
      return res.status(400).json({ message: "Invalid shift. Must be 'morning' or 'evening'." });
    }

    // Validate assignedBus: Convert to ObjectId or set to null
    let busId = assignedBus && mongoose.isValidObjectId(assignedBus) ? assignedBus : null;

    if (busId) {
      const bus = await Bus.findById(busId);
      if (!bus) {
        return res.status(404).json({ message: `Bus ${assignedBus} not found.` });
      }

      // Check if the bus already has a driver for the same shift
      const conflictingDriver = await Driver.findOne({ assignedBus: busId, shift });
      if (conflictingDriver) {
        return res.status(400).json({ message: `Bus ${assignedBus} already has a ${shift} shift driver.` });
      }
    }

    // Create new driver
    const newDriver = new Driver({
      name,
      licenseNumber,
      assignedBus: busId,
      shift,
    });

    // Save driver
    const savedDriver = await newDriver.save();

    // If assignedBus exists, update the correct shift field in Bus
    if (busId) {
      const updateField = shift === "morning" ? { morningDriver: savedDriver._id } : { eveningDriver: savedDriver._id };
      await Bus.findByIdAndUpdate(busId, updateField, { new: true });
    }

    res.status(201).json(savedDriver);
  } catch (error) {
    console.error("Error adding driver:", error);
    res.status(500).json({ message: "Error adding driver", error });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { assignedBus, ...updateFields } = req.body;

    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    if (assignedBus) {
      if (!mongoose.isValidObjectId(assignedBus)) {
        return res.status(400).json({ message: 'Invalid bus ID' });
      }

      const bus = await Bus.findById(assignedBus);
      if (!bus) {
        return res.status(404).json({ message: 'Bus not found' });
      }

      // Ensure no duplicate shift assignment on the same bus
      const conflictingDriver = await Driver.findOne({
        assignedBus,
        shift: driver.shift
      });

      if (conflictingDriver && conflictingDriver._id.toString() !== driver._id.toString()) {
        return res.status(400).json({ message: `Bus already has a ${driver.shift} shift driver.` });
      }

      // Clear previous bus assignment
      if (driver.assignedBus) {
        const previousBus = await Bus.findById(driver.assignedBus);
        if (previousBus) {
          if (driver.shift === "morning") {
            previousBus.morningDriver = null;
          } else {
            previousBus.eveningDriver = null;
          }
          await previousBus.save();
        }
      }

      // Assign driver to new bus
      driver.assignedBus = assignedBus;
      if (driver.shift === "morning") {
        bus.morningDriver = driver._id;
      } else {
        bus.eveningDriver = driver._id;
      }

      await bus.save();
    }

    // Update driver info
    Object.assign(driver, updateFields);
    await driver.save();

    const updatedDriver = await driver.populate('assignedBus');

    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: 'Error updating driver', error });
  }
});

// Get all drivers and return the count
// router.get('/', async (req, res) => {
//   try {
//     const driverCount = await Driver.countDocuments();
//     res.status(200).json({ count: driverCount });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching driver count', error });
//   }
// });

module.exports = router;
