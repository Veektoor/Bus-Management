<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-container">
        <router-link to="/" class="navbar-link">Home</router-link>
        <router-link to="/buses" class="navbar-link">Buses</router-link>
        <router-link to="/drivers" class="navbar-link">Drivers</router-link>
        <router-link to="/asign" class="navbar-link">Assign Bus</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
/* Global styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

/* Navbar styles */
.navbar {
  background-color: #007bff; /* Bootstrap primary color */
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-around; /* Distributes space between links */
  align-items: center;
}

.navbar-link {
  color: #ffffff; /* White color for the links */
  text-decoration: none; /* Removes underline */
  font-size: 16px; /* Font size for links */
  padding: 10px 15px; /* Padding around links */
  border-radius: 4px; /* Rounded corners */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.navbar-link:hover {
  background-color: #0056b3; /* Darker blue for hover effect */
}

/* Main content area */
#app {
  padding: 20px; /* Padding for the app container */
}

.router-view {
  margin-top: 20px; /* Space between navbar and content */
}
</style>
