<template>
    <div>
      <h1>Route List</h1>
      <div v-for="route in routes" :key="route._id"> <!-- Using route._id as the key -->
        <p>Route ID: {{ route._id }}</p>
        <p>Start: {{ route.start }}</p>
        <p>End: {{ route.end }}</p>
        <p>Distance: {{ route.distance }} km</p>
        <p>Duration: {{ route.duration }} minutes</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        routes: []
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:5000/api/routes'); // Update the endpoint as necessary
        this.routes = response.data;
      } catch (error) {
        console.error("Error fetching routes:", error); // Added error handling
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
  