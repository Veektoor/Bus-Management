<template>
  <div class="home">
    <h1>Fika Chuo</h1>
    <!-- <div v-if="loading" class="loading">Loading statistics...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="stats">
      <div class="stat">
        <h2>Total Buses</h2>
        <p>{{ totalBuses }}</p>
      </div>
      <div class="stat">
        <h2>Total Drivers</h2>
        <p>{{ totalDrivers }}</p>
      </div>
    </div> -->
    <l-map :zoom="13" :center="[ -1.286389, 36.817223 ]" style="height: 500px; width: 100%;">
      <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
      <l-marker v-for="bus in buses" :key="bus._id" :lat-lng="[bus.location.lat, bus.location.lng]">
        <l-popup>{{ bus.busNumber }} - {{ bus.route.name }}</l-popup>
      </l-marker>
    </l-map>
    <div class="actions">
      <router-link to="/routes" class="btn">View Routes</router-link>
      <router-link to="/fares" class="btn">View Fares</router-link>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: { LMap, LTileLayer, LMarker, LPopup },
  data() {
    return {
      tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      buses: [],

      totalBuses: 0,
      totalDrivers: 0,
      loading: true,
      error: null,
    };
  },
  mounted() {
    // this.fetchStatistics();
    this.fetchBuses();
    setInterval(this.fetchBuses, 5000);

  },

  methods: {
    async fetchBuses() {
    try {
      const response = await fetch("http://localhost:5000/api/buses"); // Adjust API URL if needed
      if (!response.ok) throw new Error("Failed to fetch buses");

      const busesData = await response.json();
      this.buses = busesData.map(bus => ({
        ...bus,
        location: { lat: bus.location.lat, lng: bus.location.lng } // Ensure the correct mapping
      }));
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  }
  }
  // methods: {
  //   async fetchStatistics() {
  //     try {
  //       const busesResponse = await fetch('http://localhost:5000/api/buses/');
  //       const driversResponse = await fetch('http://localhost:5000/api/drivers/');

  //       if (!busesResponse.ok || !driversResponse.ok) throw new Error('Failed to fetch statistics');

  //       const buses = await busesResponse.json();
  //       const drivers = await driversResponse.json();
  //       this.totalBuses = buses.count;
  //       this.totalDrivers = drivers.count;
  //     } catch (error) {
  //       console.error('Error fetching statistics:', error);
  //       this.error = 'Failed to load statistics. Please try again later.';
  //     } finally {
  //       this.loading = false;
  //     }
  //   },
  // },
};
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
.loading {
  font-size: 1.2em;
  color: #666;
}
.error {
  color: red;
  font-size: 1.1em;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  transform: scale(1.05);
}
.btn:focus, .btn:active {
  outline: none;
  background-color: #004085;
}
@media (max-width: 768px) {
  .stat {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
