<template>
  <div class="home">
    <h1>Welcome to the Bus Management System</h1>
    <div class="stats">
      <div class="stat">
        <h2>Total Buses</h2>
        <p>{{ totalBuses }}</p>
      </div>
      <div class="stat">
        <h2>Total Drivers</h2>
        <p>{{ totalDrivers }}</p>
      </div>
    </div>
    <div class="actions">
      <router-link to="/buses" class="btn">View Buses</router-link>
      <router-link to="/drivers" class="btn">View Drivers</router-link>
      <router-link to="/routes" class="btn">View Routes</router-link>
      <router-link to="/fares" class="btn">View Fares</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalBuses: 0,
      totalDrivers: 0,
    };
  },
  mounted() {
    this.fetchStatistics();
  },
  methods: {
    async fetchStatistics() {
      try {
        const busesResponse = await fetch('/api/buses/count');
        const driversResponse = await fetch('/api/drivers/count');
        
        if (!busesResponse.ok || !driversResponse.ok) {
          throw new Error('Failed to fetch statistics');
        }

        this.totalBuses = await busesResponse.json();
        this.totalDrivers = await driversResponse.json();
      } catch (error) {
        console.error('Error fetching statistics:', error);
        this.totalBuses = 'Error';
        this.totalDrivers = 'Error';
      }
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
.stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  flex-wrap: wrap;
}
.stat {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 30%;
  margin: 10px;
}
.actions {
  margin-top: 30px;
}
.btn {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
}
.btn:hover {
  background-color: #0056b3;
}
.btn:focus, .btn:active {
  outline: none;
  background-color: #004085;
  transform: scale(1.05);
}
@media (max-width: 768px) {
  .stat {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
