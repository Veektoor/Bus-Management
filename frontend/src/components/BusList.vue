<template>
  <div>
    <h1>Bus List</h1>
    <div v-if="loading">Loading buses...</div>
    <div v-else-if="error" class="error">
      Error fetching buses: {{ error }}
    </div>
    <div v-else>
      <div v-for="bus in buses" :key="bus._id" class="bus-card">
        <p><strong>Bus Number:</strong> {{ bus.busNumber }}</p>
        <p><strong>Capacity:</strong> {{ bus.capacity }}</p>
        <!-- Displaying the populated route details -->
        <p><strong>Route:</strong> {{ bus.route ? bus.route.start : 'N/A' }} - {{ bus.route ? bus.route.end : 'N/A' }}</p>
        <!-- Displaying the populated driver details -->
        <p><strong>Driver:</strong> {{ bus.driver ? bus.driver.name : 'N/A' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      buses: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/buses/all');
      this.buses = response.data;
    } catch (error) {
      console.error("Error fetching buses:", error);
      this.error = "Failed to load buses. Please try again later.";
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.bus-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.error {
  color: red;
  text-align: center;
}
</style>
