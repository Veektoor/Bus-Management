const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Bus=require('./models/Bus');
const Driver=require('./models/Driver');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

let currentLocation = {};
// Logging Middleware
app.use((req, res, next) => {
    const currentDateTime = new Date().toISOString();
    console.log(`[${currentDateTime}] ${req.method} ${req.originalUrl}`);
    next(); 
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
const busRoutes = require('./routes/busRoutes.js');
const driverRoutes = require('./routes/driverRoutes.js');
const routeRoutes = require('./routes/routeRoutes');
const fareRoutes = require('./routes/fareRoutes');
const locationRoutes = require('./routes/locationRoutes');

app.use('/api/buses', busRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/fares', fareRoutes);
app.use('/api', locationRoutes);

app.post('/api/assign', async (req, res) => {
  try {
    const { busId, driverId } = req.body;

    // Find the bus by ID
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Find the driver by ID
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Assign the driver to the bus
    bus.assignedDriver = driver._id;

    // Save the updated bus document
    await bus.save();

    res.status(200).json({ message: 'Bus assigned to driver successfully', bus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
