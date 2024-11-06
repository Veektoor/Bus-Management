<template>
  <div class="bus-details">
    <h1>Bus Details</h1>
    <div v-if="loading">Loading bus details...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="bus">
      <h2>Bus ID: {{ bus.id }}</h2>
      <p><strong>Model:</strong> {{ bus.model }}</p>
      <p><strong>License Plate:</strong> {{ bus.licensePlate }}</p>
      <p><strong>Driver:</strong> {{ driverName }}</p>
      <p><strong>Status:</strong> {{ bus.status }}</p>
      <button @click="editBus" class="edit-button">Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bus: null,
      driverName: '',
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchBusDetails();
  },
  methods: {
    async fetchBusDetails() {
      try {
        const response = await fetch(`http://localhost:5000/api/buses/${this.$route.params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bus details');
        }
        this.bus = await response.json();
        this.driverName = this.bus.driver ? this.bus.driver.name : 'No driver assigned';
      } catch (error) {
        console.error('Error fetching bus details:', error);
        this.error = 'Failed to load bus details. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    editBus() {
      this.$router.push({ name: 'editBus', params: { id: this.bus.id } });
    },
  },
};
</script>

<style scoped>
.bus-details {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
.edit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.edit-button:hover {
  background-color: #0056b3;
}
</style>
