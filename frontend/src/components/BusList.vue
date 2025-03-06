<template>
  <div>
    <h1>Bus Management</h1>
    <div class="add-bus-form">
      <h2>{{ isEditMode ? 'Edit Bus' : 'Add New Bus' }}</h2>
      <form @submit.prevent="submitForm">
        <input v-model="busNumber" placeholder="Bus Number" required />
        <input v-model="capacity" type="number" placeholder="Capacity" required />
        
        <select v-model="selectedRoute" required>
          <option value="" disabled selected>Select Route</option>
          <option v-for="route in routes" :key="route._id" :value="route._id">
            {{ route.start }} - {{ route.end }}
          </option>
        </select>
        
        <select v-model="selectedDriver" required :disabled="!availableDrivers.length">
          <option value="" disabled selected>Select Driver</option>
          <option v-for="driver in availableDrivers" :key="driver._id" :value="driver._id">
            {{ driver.name }}
          </option>
        </select>
        
        <button type="submit">{{ isEditMode ? 'Update Bus' : 'Add Bus' }}</button>
      </form>
    </div>
    
    <div v-if="loading">Loading buses...</div>
    <div v-else-if="error" class="error">
      Error fetching buses: {{ error }}
    </div>
    <div v-else>
      <table class="bus-table">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Capacity</th>
            <th>Route</th>
            <th>Driver</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bus in buses" :key="bus._id">
            <td>{{ bus.busNumber }}</td>
            <td>{{ bus.capacity }}</td>
            <td>{{ bus.route ? bus.route.start : 'N/A' }} - {{ bus.route ? bus.route.end : 'N/A' }}</td>
            <td>{{ bus.driver ? bus.driver.name : 'N/A' }}</td>
            <td>
              <button @click="editBus(bus)">Edit</button>
              <button @click="deleteBus(bus._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      buses: [],
      drivers: [],
      routes: [],
      availableDrivers: [],
      selectedDriver: '',
      selectedRoute: '',
      busNumber: '',
      capacity: '',
      isEditMode: false,
      editBusId: null,
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchBuses() {
    this.loading = true;
    try {
      const response = await axios.get('http://localhost:5000/api/buses');
      this.buses = Array.isArray(response.data) ? response.data : []; // Ensuring it's an array
      this.filterAvailableDrivers();
    } catch (error) {
      console.error("Error fetching buses:", error);
      this.error = "Failed to load buses. Please try again later.";
    } finally {
      this.loading = false;
    }
  },

    async fetchDrivers() {
      try {
        const response = await axios.get('http://localhost:5000/api/drivers');
        this.drivers = Array.isArray(response.data) ? response.data : []; // Ensure it's an array
        this.filterAvailableDrivers();
      } catch (error) {
        console.error("Error fetching drivers:", error);
        this.error = "Failed to load drivers. Please try again later.";
      }
    },

    async fetchRoutes() {
      try {
        const response = await axios.get('http://localhost:5000/api/routes');
        this.routes = response.data;
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    },
    filterAvailableDrivers() {
      const assignedDriverIds = new Set(this.buses.map(bus => bus.driver?._id));
      this.availableDrivers = this.drivers.filter(driver => !assignedDriverIds.has(driver._id));
    },
    async submitForm() {
      const newBus = {
        busNumber: this.busNumber,
        capacity: this.capacity,
        route: this.selectedRoute,
        driver: this.selectedDriver,
      };
      try {
        if (this.isEditMode) {
          await axios.put(`http://localhost:5000/api/buses/${this.editBusId}`, newBus);
          this.isEditMode = false;
        } else {
          await axios.post('http://localhost:5000/api/buses', newBus);
        }
        this.resetForm();
        this.fetchBuses();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    resetForm() {
      this.busNumber = '';
      this.capacity = '';
      this.selectedRoute = '';
      this.selectedDriver = '';
    },
    editBus(bus) {
      this.isEditMode = true;
      this.editBusId = bus._id;
      this.busNumber = bus.busNumber;
      this.capacity = bus.capacity;
      this.selectedRoute = bus.route ? bus.route._id : '';
      this.selectedDriver = bus.driver ? bus.driver._id : '';
    },
    async deleteBus(busId) {
      try {
        await axios.delete(`http://localhost:5000/api/buses/${busId}`);
        this.fetchBuses();
      } catch (error) {
        console.error("Error deleting bus:", error);
      }
    }
  },
  created() {
    this.fetchBuses();
    this.fetchDrivers();
    this.fetchRoutes();
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.add-bus-form {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #eef;
}

input, select {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 8px;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

button[disabled] {
  background-color: #ccc;
}

.bus-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.bus-table th, .bus-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.bus-table th {
  background-color: #f4f4f4;
}

.error {
  color: red;
  text-align: center;
}
</style>
