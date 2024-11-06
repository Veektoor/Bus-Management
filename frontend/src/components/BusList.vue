<template>
  <div>
    <h1>Bus List</h1>
    <div v-for="bus in buses" :key="bus._id">
      <p>Bus Number: {{ bus.busNumber }}</p>
      <p>Capacity: {{ bus.capacity }}</p>
      <p>Route: {{ bus.route.start }} - {{ bus.route.end }}</p>
      <p>Driver: {{ bus.driver.name }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      buses: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/buses');
      this.buses = response.data;
    } catch (error) {
      console.error("Error fetching buses:", error); // Added error handling
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
