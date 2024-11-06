<template>
    <div class="driver-details">
      <h1>Driver Details</h1>
      <div v-if="driver">
        <h2>Name: {{ driver.name }}</h2>
        <p><strong>License Number:</strong> {{ driver.licenseNumber }}</p>
        <p><strong>Phone:</strong> {{ driver.phone }}</p>
        <p><strong>Email:</strong> {{ driver.email }}</p>
        <p><strong>Assigned Bus:</strong> {{ assignedBus }}</p>
        <button @click="editDriver">Edit Driver</button>
      </div>
      <div v-else>
        <p>Loading driver details...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        driver: null,
        assignedBus: '',
      };
    },
    created() {
      this.fetchDriverDetails();
    },
    methods: {
      async fetchDriverDetails() {
        try {
          const response = await fetch(`http://localhost:5000/api/drivers/${this.$route.params.id}`);
          this.driver = await response.json();
          this.assignedBus = this.driver.assignedBus ? this.driver.assignedBus.model : 'No bus assigned';
        } catch (error) {
          console.error('Error fetching driver details:', error);
        }
      },
      editDriver() {
        this.$router.push({ name: 'editDriver', params: { id: this.driver.id } });
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
  }
  </style>
  