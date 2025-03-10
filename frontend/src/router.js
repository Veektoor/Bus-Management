import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import BusList from './components/BusList.vue';
import DriverList from './components/DriverList.vue'; 
import NotFound from './views/NotFound.vue';
import RoutesComponent from './components/RouteList.vue';
import FaresComponent from './components/FareList.vue';
import assignBus from './components/assignBus.vue';
import LoginComponent from './views/AuthPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/buses', name: 'buses', component: BusList },
  { path: '/drivers', name: 'drivers', component: DriverList },
  { path: '/routes', name: 'routes', component: RoutesComponent }, 
  { path: '/fares', name: 'fares', component: FaresComponent }, 
  { path: '/asign', name: 'asign', component: assignBus },
  {path: '/login', name: 'login', component:LoginComponent},
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }, // 404 route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
