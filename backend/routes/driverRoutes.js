const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Driver = require('../models/Driver');
const Bus = require('../models/Bus'); 
<<<<<<< HEAD
const {authenticate, authorize}= require('../middleware/auth')

// Get all drivers and populate assigned bus details (Protected Route)
router.get("/all", authenticate, authorize("admin"), async (req, res) => {
=======
const { authenticate, authorize } = require('../middlewares/jwt');

// ✅ Protected: Get all drivers (Only "admin" or "manager" can access)
router.get("/all", authenticate, authorize(["admin", "manager"]), async (req, res) => {
>>>>>>> 4d2ae95 (keep calm)
  try {
    const drivers = await Driver.find().populate("assignedBus"); 
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drivers", error: error.message });
  }
});

<<<<<<< HEAD
// Get a specific driver by ID and populate the assigned bus details
router.get('/:id', authenticate, authorize("admin"), async (req, res) => {
=======
// ✅ Protected: Get a specific driver by ID
router.get('/:id', authenticate, authorize(["admin", "manager", "driver"]), async (req, res) => {
>>>>>>> 4d2ae95 (keep calm)
  try {
    const driver = await Driver.findById(req.params.id).populate('assignedBus'); 
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver', error });
  }
});

<<<<<<< HEAD
// Add a new driver and assign them to a bus
router.post('/', authenticate, authorize("admin"), async (req, res) => {
=======
// ✅ Protected: Add a new driver (Only "admin" can create drivers)
router.post('/', authenticate, authorize(["admin"]), async (req, res) => {
>>>>>>> 4d2ae95 (keep calm)
  try {
    const { name, licenseNumber, assignedBus, shift } = req.body;

    if (!["morning", "evening"].includes(shift)) {
      return res.status(400).json({ message: "Invalid shift. Must be 'morning' or 'evening'." });
    }

    let busId = assignedBus && mongoose.isValidObjectId(assignedBus) ? assignedBus : null;

    if (busId) {
      const bus = await Bus.findById(busId);
      if (!bus) {
        return res.status(404).json({ message: `Bus ${assignedBus} not found.` });
      }

      const conflictingDriver = await Driver.findOne({ assignedBus: busId, shift });
      if (conflictingDriver) {
        return res.status(400).json({ message: `Bus ${assignedBus} already has a ${shift} shift driver.` });
      }
    }

    const newDriver = new Driver({
      name,
      licenseNumber,
      assignedBus: busId,
      shift,
    });

    const savedDriver = await newDriver.save();

    if (busId) {
      const updateField = shift === "morning" ? { morningDriver: savedDriver._id } : { eveningDriver: savedDriver._id };
      await Bus.findByIdAndUpdate(busId, updateField, { new: true });
    }

    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(500).json({ message: "Error adding driver", error });
  }
});
<<<<<<< HEAD
router.put('/:id', authenticate, authorize("admin"), async (req, res) => {
=======

// ✅ Protected: Update a driver (Only "admin" can update driver info)
router.put('/:id', authenticate, authorize(["admin"]), async (req, res) => {
>>>>>>> 4d2ae95 (keep calm)
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

      const conflictingDriver = await Driver.findOne({
        assignedBus,
        shift: driver.shift
      });

      if (conflictingDriver && conflictingDriver._id.toString() !== driver._id.toString()) {
        return res.status(400).json({ message: `Bus already has a ${driver.shift} shift driver.` });
      }

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

      driver.assignedBus = assignedBus;
      if (driver.shift === "morning") {
        bus.morningDriver = driver._id;
      } else {
        bus.eveningDriver = driver._id;
      }

      await bus.save();
    }

    Object.assign(driver, updateFields);
    await driver.save();

    const updatedDriver = await driver.populate('assignedBus');

    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: 'Error updating driver', error });
  }
});

module.exports = router;
