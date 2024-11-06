<template>
  <div>
    <h1>Fare List</h1>
    <div v-if="loading">Loading fares...</div>
    <div v-else-if="error" class="error">
      Error fetching fares: {{ error }}
    </div>
    <div v-else>
      <div v-for="fare in fares" :key="fare._id" class="fare-card">
        <p><strong>Route:</strong> {{ fare.route.start }} - {{ fare.route.end }}</p>
        <p><strong>Fare Amount:</strong> KSH {{ fare.amount }}</p>
        <p><strong>Currency:</strong> {{ fare.currency }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fares: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/fares');
      this.fares = response.data;
    } catch (error) {
      console.error("Error fetching fares:", error);
      this.error = "Failed to load fares. Please try again later.";
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
.fare-card {
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
