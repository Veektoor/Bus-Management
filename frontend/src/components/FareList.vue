<template>
  <div>
    <h1>Fare List</h1>
    
    <!-- Loading state -->
    <div v-if="loading">Loading fares...</div>
    
    <!-- Error state -->
    <div v-else-if="error" class="error">
      Error fetching fares: {{ error }}
    </div>
    
    <!-- No fares state -->
    <div v-else-if="fares.length === 0" class="no-fares">
      No fares available at the moment.
    </div>

    <!-- Fare list -->
    <div v-else>
      <div v-for="fare in fares" :key="fare._id" class="fare-card">
        <p><strong>Route:</strong> {{ fare.route ? fare.route.start : 'N/A' }} - {{ fare.route ? fare.route.end : 'N/A' }}</p>
        
        <!-- Conditionally show fare based on time of day -->
        <p><strong>Fare Amount:</strong> KSH 
          {{ getFareAmount(fare) }}
        </p>

        <p><strong>Currency:</strong> {{ fare.currency || 'N/A' }}</p>
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
      // Assuming the response data contains an array of fare objects
      if (response.data && Array.isArray(response.data)) {
        this.fares = response.data;
      } else {
        throw new Error('Invalid fare data format');
      }
    } catch (error) {
      console.error("Error fetching fares:", error);
      this.error = error.response && error.response.data ? error.response.data.message : 'Failed to load fares. Please try again later.';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    // Method to get the fare based on time of day (morning or evening)
    getFareAmount(fare) {
      const currentHour = new Date().getHours();
      
      // Assuming morningFare and eveningFare exist on the fare object
      if (currentHour >= 6 && currentHour < 12) {
        return fare.morningFare || fare.amount;  // Fallback to default fare if morning fare not available
      } else {
        return fare.eveningFare || fare.amount;  // Fallback to default fare if evening fare not available
      }
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

.error, .no-fares {
  color: red;
  text-align: center;
}

.no-fares {
  color: #888;
}

</style>
