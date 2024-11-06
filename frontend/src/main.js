import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Import router.js

createApp(App)
  .use(router)  // Register the router
  .mount('#app');  // Mount the app

