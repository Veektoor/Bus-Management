<template>
    <div>
      <h1>Driver List</h1>
      <div v-for="driver in drivers" :key="driver._id"> <!-- Using driver._id as the key -->
        <p>Name: {{ driver.name }}</p>
        <p>License Number: {{ driver.licenseNumber }}</p>
        <p>Contact: {{ driver.contact }}</p>
        <p>Assigned Bus: {{ driver.assignedBus ? driver.assignedBus.busNumber : 'None' }}</p> <!-- Check if assignedBus exists -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        drivers: []
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:5000/api/drivers'); // Update the endpoint as necessary
        this.drivers = response.data;
      } catch (error) {
        console.error("Error fetching drivers:", error); // Added error handling
      }
    }
  };
  </script>
  
  <style scoped>
  /* You can add your styles here */
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  