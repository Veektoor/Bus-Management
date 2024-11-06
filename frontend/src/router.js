import { createRouter, createWebHistory } from 'vue-router';  // Use Vue 3 router methods
import Home from './views/Home.vue';
import BusList from './components/BusList.vue';
import DriverList from './components/DriverList.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/buses', component: BusList },
    { path: '/drivers', component: DriverList },
];

const router = createRouter({
    history: createWebHistory(),  // Use history mode
    routes
});

export default router;
