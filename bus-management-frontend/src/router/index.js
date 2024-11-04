import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BusList from '../components/BusList.vue';
import DriverList from '../components/DriverList.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/buses', component: BusList },
    { path: '/drivers', component: DriverList },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
