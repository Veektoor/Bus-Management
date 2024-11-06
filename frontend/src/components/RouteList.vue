<template>
  <div>
    <h1>Route List</h1>
    <div v-if="loading">Loading routes...</div>
    <div v-else-if="error" class="error">
      Error fetching routes: {{ error }}
    </div>
    <div v-else>
      <div v-for="route in routes" :key="route._id" class="route-card">
        <p><strong>Route ID:</strong> {{ route._id }}</p>
        <p><strong>Start:</strong> {{ route.start }}</p>
        <p><strong>End:</strong> {{ route.end }}</p>
        <p><strong>Distance:</strong> {{ route.distance }} km</p>
        <p><strong>Duration:</strong> {{ route.duration }} minutes</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      routes: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/routes');
      this.routes = response.data;
    } catch (error) {
      console.error("Error fetching routes:", error);
      this.error = "Failed to load routes. Please try again later.";
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
.route-card {
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
