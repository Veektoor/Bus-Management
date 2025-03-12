const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Bus=require('./models/Bus');
const Driver=require('./models/Driver');
const { authenticate } = require('./middlewares/jwt');
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


async function updateLocations() {
  const buses = await Bus.find({});
  for (const bus of buses) {
    if (!bus.latitude || !bus.longitude) {
      bus.latitude = -1.286389 + Math.random() * 0.02; // Near Nairobi
      bus.longitude = 36.817223 + Math.random() * 0.02;
      await bus.save();
      console.log("Locations set");
    }
  }
}

updateLocations();

// Routes
const busRoutes = require('./routes/busRoutes.js');
const driverRoutes = require('./routes/driverRoutes.js');
const routeRoutes = require('./routes/routeRoutes');
const fareRoutes = require('./routes/fareRoutes');
const locationRoutes = require('./routes/locationRoutes');
const authRoutes=require('./routes/authRoutes');

app.use('/api/buses', busRoutes);
app.use('/api/drivers',driverRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/fares', fareRoutes);
app.use('/api', locationRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

