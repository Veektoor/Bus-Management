const express = require('express');
const router = express.Router();
const Route = require('../models/Route'); // Adjust the path according to your project structure

// Get all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find().populate('buses'); // Populate with related buses if needed
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching routes', error });
  }
});

// Get a specific route by ID
router.get('/:id', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate('buses');
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching route', error });
  }
});

// Create a new route
router.post('/', async (req, res) => {
  const newRoute = new Route(req.body);
  try {
    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (error) {
    res.status(400).json({ message: 'Error creating route', error });
  }
});

// Update an existing route
router.put('/:id', async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json(updatedRoute);
  } catch (error) {
    res.status(400).json({ message: 'Error updating route', error });
  }
});

// Delete a route
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting route', error });
  }
});

module.exports = router;


