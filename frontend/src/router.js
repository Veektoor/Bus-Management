import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import BusList from './components/BusList.vue';
import DriverList from './components/DriverList.vue'; 
import NotFound from './views/NotFound.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/buses', name: 'buses', component: BusList },
  { path: '/drivers', name: 'drivers', component: DriverList },
//   { path: '/routes', name: 'routes', component: RoutesComponent }, // Placeholder for routes page
//   { path: '/fares', name: 'fares', component: FaresComponent }, // Placeholder for fares page
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }, // 404 route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
