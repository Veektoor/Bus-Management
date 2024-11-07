<template>
    <div class="assign-bus">
      <h2>Assign Bus to Driver</h2>
      <form @submit.prevent="assignBusToDriver">
        <!-- Bus ID input -->
        <div>
          <label for="busId">Bus ID:</label>
          <input
            id="busId"
            v-model="busId"
            type="text"
            placeholder="Enter Bus ID"
            required
          />
        </div>
        
        <!-- Driver ID input -->
        <div>
          <label for="driverId">Driver ID:</label>
          <input
            id="driverId"
            v-model="driverId"
            type="text"
            placeholder="Enter Driver ID"
            required
          />
        </div>
  
        <!-- Submit Button -->
        <button type="submit">Assign</button>
      </form>
  
      <!-- Success or Error message -->
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
        busId: '', // The ID of the bus to assign
        driverId: '', // The ID of the driver to assign the bus
        message: '', // To display success or error messages
        messageType: '', // To style the message (success or error)
      };
    },
    methods: {
      // Function to send a POST request to the backend
      async assignBusToDriver() {
        this.loading = true;
        try {
            const response = await axios.post('http://localhost:5000/api/assign', {
            busId: this.busId,
            driverId: this.driverId,
            });
            console.log('Response:', response); // Log the response for debugging
            this.message = 'Bus assigned to driver successfully!';
            this.messageType = 'success';
        } catch (error) {
            this.message = error.response
            ? error.response.data.message
            : 'Failed to assign bus. Please try again.';
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
    max-width: 400px;
    margin: 0 auto;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  form input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
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
  