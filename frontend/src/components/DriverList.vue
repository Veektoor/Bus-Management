<template>
  <div>
    <h1>Driver Management</h1>

    <!-- Add New Driver Form -->
    <div class="add-driver-form">
      <h2>{{ isEditing ? 'Edit Driver' : 'Add New Driver' }}</h2>
      <form @submit.prevent="isEditing ? updateDriver() : addDriver">
        <input 
          v-model="driverName" 
          placeholder="Driver Name" 
          required 
          :class="{'input-error': formErrors.driverName}" 
        />
        <span v-if="formErrors.driverName" class="error-message">Driver name is required</span>

        <input 
          v-model="licenseNumber" 
          placeholder="License Number" 
          required 
          :class="{'input-error': formErrors.licenseNumber}" 
        />
        <span v-if="formErrors.licenseNumber" class="error-message">License number is required</span>

        <select 
          v-model="assignedBus" 
          required 
          :class="{'input-error': formErrors.assignedBus}" 
        >
          <option value="" disabled selected>Select Bus</option>
          <option v-for="bus in busList" :key="bus._id" :value="bus._id">
            {{ bus.busNumber }} - 
            {{ bus.route && bus.route.start ? bus.route.start : 'N/A' }} to 
            {{ bus.route && bus.route.end ? bus.route.end : 'N/A' }}
          </option>

        </select>
        <span v-if="formErrors.assignedBus" class="error-message">Bus assignment is required</span>

        <select v-model="shift" required :class="{'input-error': formErrors.shift}">
          <option value="" disabled selected>Select Shift</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
        </select>
        <span v-if="formErrors.shift" class="error-message">Shift is required</span>

        <button type="submit" :disabled="isSubmitting">Add Driver</button>
      </form>
    </div>

    <!-- Driver List Table -->
    <div v-if="loading">Loading drivers...</div>
    <div v-else-if="error" class="error">
      Error fetching drivers: {{ error }}
    </div>
    <div v-else>
      <table class="driver-table">
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>License Number</th>
            <th>Assigned Bus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="driver in drivers" :key="driver._id">
            <td>{{ driver.name }}</td>
            <td>{{ driver.licenseNumber }}</td>
            <td>{{ driver.assignedBus ? driver.assignedBus.busNumber : 'N/A' }}</td>
            <td>
              <button @click="editDriver(driver)">Edit</button>
              <button @click="assignToBus(driver._id)">Assign to Bus</button>
              <button @click="unassignFromBus(driver._id)" v-if="driver.assignedBus">Unassign</button>
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
      drivers: [],
      busList: [],
      driverName: '',
      licenseNumber: '',
      assignedBus: '',
      shift: '',
      editedDriver: null,
      isEditing: false,
      isSubmitting: false,
      loading: true,
      error: null,
      formErrors: {
        driverName: false,
        licenseNumber: false,
        assignedBus: false,
        shift: false,
      }
    };
  },
  methods: {
    async fetchDrivers() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:5000/api/drivers');
        this.drivers = response.data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
        this.error = "Failed to load drivers. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    async fetchBuses() {
      try {
        const response = await axios.get('http://localhost:5000/api/buses');
        this.busList = response.data;
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    },
    validateForm() {
      this.formErrors.driverName = !this.driverName;
      this.formErrors.licenseNumber = !this.licenseNumber;
      this.formErrors.assignedBus = !this.assignedBus;
      this.formErrors.shift = !this.shift;

      return !Object.values(this.formErrors).includes(true);
    },
    async addDriver() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;
      try {
        const newDriver = {
          name: this.driverName,
          licenseNumber: this.licenseNumber,
          assignedBus: this.assignedBus,
          shift: this.shift,
        };
        await axios.post('http://localhost:5000/api/drivers', newDriver);
        this.fetchDrivers();
        this.resetForm();
      } catch (error) {
        console.error("Error adding driver:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async editDriver(driver) {
      this.isEditing = true;
      this.editedDriver = { ...driver };
      this.driverName = driver.name;
      this.licenseNumber = driver.licenseNumber;
      this.assignedBus = driver.assignedBus ? driver.assignedBus._id : '';
      this.shift = driver.shift;
    },
    async updateDriver() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;
      try {
        const updatedDriver = {
          name: this.driverName,
          licenseNumber: this.licenseNumber,
          assignedBus: this.assignedBus,
          shift: this.shift,
        };
        await axios.put(`http://localhost:5000/api/drivers/${this.editedDriver._id}`, updatedDriver);
        this.fetchDrivers();
        this.cancelEdit();
      } catch (error) {
        console.error("Error updating driver:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.resetForm();
    },
    resetForm() {
      this.driverName = '';
      this.licenseNumber = '';
      this.assignedBus = '';
      this.shift = '';
      this.formErrors = { driverName: false, licenseNumber: false, assignedBus: false, shift: false };
    },
    async assignToBus(driverId) {
      const busId = prompt("Enter bus ID to assign this driver to:");
      if (!busId) return;

      try {
        await axios.put(`http://localhost:5000/api/drivers/${driverId}/assign`, { busId });
        this.fetchDrivers();
      } catch (error) {
        console.error("Error assigning driver to bus:", error);
      }
    },
    async unassignFromBus(driverId) {
      try {
        await axios.put(`http://localhost:5000/api/drivers/${driverId}/unassign`);
        this.fetchDrivers();
      } catch (error) {
        console.error("Error unassigning driver from bus:", error);
      }
    }
  },
  created() {
    this.fetchDrivers();
    this.fetchBuses();
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.add-driver-form, .edit-driver-form {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #eef;
}

input,
select {
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

.driver-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.driver-table th, .driver-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.driver-table th {
  background-color: #f4f4f4;
}

.error {
  color: red;
  text-align: center;
}

.input-error {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
