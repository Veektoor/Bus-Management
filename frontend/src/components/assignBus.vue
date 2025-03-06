<template>
  <div class="assign-bus">
    <h2>Add New Driver and Assign to Bus</h2>

    <!-- Form to Add New Driver -->
    <form @submit.prevent="addDriver">
      <div>
        <label for="driverName">Driver Name:</label>
        <input
          id="driverName"
          v-model="driverName"
          type="text"
          placeholder="Enter Driver's Name"
          required
        />
      </div>

      <div>
        <label for="licenseNumber">License Number:</label>
        <input
          id="licenseNumber"
          v-model="licenseNumber"
          type="text"
          placeholder="Enter Driver's License Number"
          required
        />
      </div>

      <!-- Select Bus to Assign -->
      <div>
        <label for="busId">Assign to Bus:</label>
        <select v-model="selectedBusId" required>
          <option v-for="bus in [{ _id: '', busNumber: 'Select a Bus', capacity: '', disabled: true }, ...buses]" 
                :key="bus._id" 
                :value="bus._id" 
                disabled>
          {{ bus.busNumber }}{{ bus.capacity ? ' - Capacity: ' + bus.capacity : '' }}
        </option>
        </select>
        
      </div>

      <button type="submit">Add Driver and Assign Bus</button>
    </form>

    <!-- Success or Error Message -->
    <div v-if="message" class="message" :class="messageType">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      driverName: '', // Driver's name
      licenseNumber: '', // Driver's license number
      selectedBusId: '', // The bus to assign
      message: '', // Message to show success or error
      messageType: '', // Success or error type (for styling)
      buses: [], // Array of available buses to assign to driver
      loading: false, // Loading indicator
    };
  },
  created() {
    this.fetchBuses(); // Fetch the list of buses when the component is created
  },
  methods: {
    // Fetch available buses from the backend
    async fetchBuses() {
      try {
        const response = await axios.get('http://localhost:5000/api/buses/all');
        this.buses = response.data;
      } catch (error) {
        this.message = 'Failed to load buses. Please try again later.';
        this.messageType = 'error';
      }
    },

    // Add a new driver and assign them to a bus
    async addDriver() {
      this.loading = true;
      try {
        // Create the new driver object
        const newDriver = {
          name: this.driverName,
          licenseNumber: this.licenseNumber,
          assignedBus: this.selectedBusId, // Assign the selected bus ID
        };

        // Send POST request to create a new driver
        await axios.post('http://localhost:5000/api/drivers', newDriver); // Removed response variable

        // If successful, show the success message
        this.message = `Driver ${this.driverName} added and assigned to bus successfully!`;
        this.messageType = 'success';
        
        // Reset form fields after successful creation
        this.driverName = '';
        this.licenseNumber = '';
        this.selectedBusId = '';
      } catch (error) {
        this.message = error.response
          ? error.response.data.message
          : 'Failed to add driver. Please try again.';
        this.messageType = 'error';
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>

<style scoped>
/* Basic styling for the form and message */
.assign-bus {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  text-align: center;
}

form div {
  margin-bottom: 15px;
}

form input,
form select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

option:enabled {
  position: relative;
  margin-left: 50vw;
  color: black;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}

.success {
  background-color: #28a745;
  color: white;
}

.error {
  background-color: #dc3545;
  color: white;
}

</style>
