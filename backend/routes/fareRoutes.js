const express = require('express');
const router = express.Router();
const Fare = require('../models/Fare'); 

// Get all fares
router.get('/', async (req, res) => {
  try {
    const fares = await Fare.find();
    res.status(200).json(fares);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fares', error });
  }
});

// Get a specific fare by ID
router.get('/:id', async (req, res) => {
  try {
    const fare = await Fare.findById(req.params.id);
    if (!fare) {
      return res.status(404).json({ message: 'Fare not found' });
    }
    res.status(200).json(fare);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fare', error });
  }
});

// Create a new fare
router.post('/', async (req, res) => {
  const newFare = new Fare(req.body);
  try {
    const savedFare = await newFare.save();
    res.status(201).json(savedFare);
  } catch (error) {
    res.status(400).json({ message: 'Error creating fare', error });
  }
});

// Update an existing fare
router.put('/:id', async (req, res) => {
  try {
    const updatedFare = await Fare.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFare) {
      return res.status(404).json({ message: 'Fare not found' });
    }
    res.status(200).json(updatedFare);
  } catch (error) {
    res.status(400).json({ message: 'Error updating fare', error });
  }
});

// Delete a fare
router.delete('/:id', async (req, res) => {
  try {
    const deletedFare = await Fare.findByIdAndDelete(req.params.id);
    if (!deletedFare) {
      return res.status(404).json({ message: 'Fare not found' });
    }
    res.status(200).json({ message: 'Fare deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting fare', error });
  }
});

module.exports = router;
