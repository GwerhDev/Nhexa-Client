import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import SupportPage from '../pages/SupportPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/support',
    name: 'SupportPage',
    component: SupportPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;