<template>
    <div>
      <h1>Fare List</h1>
      <div v-for="fare in fares" :key="fare._id"> <!-- Using fare._id as the key -->
        <p>Route: {{ fare.route.start }} - {{ fare.route.end }}</p>
        <p>Fare Amount: KSH {{ fare.amount }}</p>
        <p>Currency: {{ fare.currency }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        fares: []
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:5000/api/fares'); // Update the endpoint as necessary
        this.fares = response.data;
      } catch (error) {
        console.error("Error fetching fares:", error); // Added error handling
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
  