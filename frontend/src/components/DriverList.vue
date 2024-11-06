<template>
  <div>
    <h1>Driver List</h1>
    <div v-if="loading">Loading drivers...</div>
    <div v-else-if="error" class="error">
      Error fetching drivers: {{ error }}
    </div>
    <div v-else>
      <div v-for="driver in drivers" :key="driver._id" class="driver-card">
        <p><strong>Name:</strong> {{ driver.name }}</p>
        <p><strong>License Number:</strong> {{ driver.licenseNumber }}</p>
        <p><strong>Contact:</strong> {{ driver.contact }}</p>
        <p><strong>Assigned Bus:</strong> {{ driver.assignedBus ? driver.assignedBus.busNumber : 'None' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      drivers: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/drivers');
      this.drivers = response.data;
    } catch (error) {
      console.error("Error fetching drivers:", error);
      this.error = "Failed to load drivers. Please try again later.";
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
.driver-card {
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
