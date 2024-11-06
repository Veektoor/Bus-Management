<template>
  <div class="driver-details">
    <h1>Driver Details</h1>
    <div v-if="loading">Loading driver details...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="driver">
      <h2>Name: {{ driver.name }}</h2>
      <p><strong>License Number:</strong> {{ driver.licenseNumber }}</p>
      <p><strong>Phone:</strong> {{ driver.phone }}</p>
      <p><strong>Email:</strong> {{ driver.email }}</p>
      <p><strong>Assigned Bus:</strong> {{ assignedBus }}</p>
      <button @click="editDriver" class="edit-button">Edit Driver</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      driver: null,
      assignedBus: '',
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchDriverDetails();
  },
  methods: {
    async fetchDriverDetails() {
      try {
        const response = await fetch(`http://localhost:5000/api/drivers/${this.$route.params.id}`);
        if (!response.ok) throw new Error('Driver not found');
        
        this.driver = await response.json();
        this.assignedBus = this.driver.assignedBus ? this.driver.assignedBus.model : 'No bus assigned';
      } catch (error) {
        console.error('Error fetching driver details:', error);
        this.error = 'Failed to load driver details. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    editDriver() {
      this.$router.push({ name: 'editDriver', params: { id: this.driver._id } });
    },
  },
};
</script>

<style scoped>
.driver-details {
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
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
.edit-button:hover {
  background-color: #0056b3;
}
</style>
