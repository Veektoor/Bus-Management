import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null); // Stores the logged-in user

  const login = (email) => {
    user.value = { email }; // Simulating login
    localStorage.setItem("user", JSON.stringify(user.value)); // Store user in local storage
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user"); // Remove user from storage
  };

  const isAuthenticated = () => !!user.value; // Check if logged in

  // Restore user from local storage on app load
  user.value = JSON.parse(localStorage.getItem("user")) || null;

  return { user, login, logout, isAuthenticated };
});
