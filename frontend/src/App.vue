<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-container">
        <router-link to="/" class="navbar-link">Home</router-link>
        <router-link v-if="authStore.isAuthenticated()" to="/buses" class="navbar-link">Buses</router-link>
        <router-link v-if="authStore.isAuthenticated()" to="/drivers" class="navbar-link">Drivers</router-link>
        <router-link v-if="authStore.isAuthenticated()" to="/assign" class="navbar-link">Assign Bus</router-link>

        <!-- Show Login/Logout button based on authentication state -->
        <router-link v-if="!authStore.isAuthenticated()" to="/login" class="navbar-link">Login</router-link>
        <button v-else @click="handleLogout" class="navbar-link logout-button">Logout</button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from "./store/authStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
      authStore.logout();
      router.push("/login"); // Redirect to login page after logout
    };

    return { authStore, handleLogout };
  },
};
</script>

<style scoped>
/* Navbar styles */
.navbar {
  background-color: #007bff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.navbar-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar-link:hover {
  background-color: #0056b3;
}

.logout-button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.logout-button:hover {
  text-decoration: underline;
}
</style>
