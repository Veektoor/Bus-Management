const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const Bus = require('./models/bus');
const Driver = require('./models/driver');
const Route = require('./models/routes');

const app = express();

// Function to connect to the database
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database!!", error);
        process.exit(1); 
    }
};
// Initialize the database connection
dbConnect();

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Define routes
const route1 = new Route('NRB-THIKA', ['THIKA','JUJA', 'RUIRU', 'KAHAWA'], 100, 80);
const route2 = new Route('NRB-MUTHAIGA', ['MUTHAIGA','NGARA'], 50, 30);
const route3 = new Route('NRB-TRM', ['TRM','ALLSOPS', 'GARDENCITY'], 70, 50);

// Define drivers
const driver1 = new Driver('0001', 'Kinuthia', null, 'AO6738', '2024-07-31');
const driver2 = new Driver('0001', 'Kinuthia2', null, 'AO6739', '2024-07-30');

// Define buses
const bus1 = new Bus('KDM024E', 51, route1.getRouteInfo());
const bus2 = new Bus('KDM023E', 51, route2.getRouteInfo());

// Assign bus to driver and print bus details
console.log(driver1.assignBus(bus1));
console.log(bus1.getBus());
console.log(route1.getFare());


console.log(driver2.assignBus(bus2));
console.log(bus2.getBus());
console.log(route2.getFare());


