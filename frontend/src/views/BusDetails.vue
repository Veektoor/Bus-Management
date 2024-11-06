<template>
    <div class="bus-details">
      <h1>Bus Details</h1>
      <div v-if="bus">
        <h2>Bus ID: {{ bus.id }}</h2>
        <p><strong>Model:</strong> {{ bus.model }}</p>
        <p><strong>License Plate:</strong> {{ bus.licensePlate }}</p>
        <p><strong>Driver:</strong> {{ driverName }}</p>
        <p><strong>Status:</strong> {{ bus.status }}</p>
        <button @click="editBus">Edit</button>
      </div>
      <div v-else>
        <p>Loading bus details...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bus: null,
        driverName: '',
      };
    },
    created() {
      this.fetchBusDetails();
    },
    methods: {
      async fetchBusDetails() {
        try {
          const response = await fetch(`http://localhost:5000/api/buses/${this.$route.params.id}`);
          this.bus = await response.json();
          this.driverName = this.bus.driver ? this.bus.driver.name : 'No driver assigned';
        } catch (error) {
          console.error('Error fetching bus details:', error);
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
  }
  </style>
  