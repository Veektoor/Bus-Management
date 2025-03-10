import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, token: null }),
  actions: {
    async login(credentials) {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', credentials);
      this.user = data.user;
      this.token = data.token;
      localStorage.setItem('token', data.token);
    },
    async signup(userInfo) {
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', userInfo);
      this.user = data.user;
      this.token = data.token;
      localStorage.setItem('token', data.token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});