import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
import BusList from './components/BusList.vue';
import DriverList from './components/DriverList.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/buses', component: BusList },
    { path: '/drivers', component: DriverList },
    // More routes for Routes and Fares
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
