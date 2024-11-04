const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

let currectLocation={};
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

app.use('/api/buses', busRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/fares', fareRoutes);
//update location
app.post('/api/update-location',(req, res) => {
    const{latitude, longitude} = req.body;
    currectLocation = {latitude,longitude};
    res.send('Current location updated successfully');
})
//get current location
app.get('/api/current-location', (req, res) => {
    res.json(currentLocation)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
