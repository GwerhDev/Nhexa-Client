import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import AuthPage from '../pages/AuthPage.vue';
import LandingPage from '../pages/LandingPage.vue';
import SupportPage from '../pages/SupportPage.vue';
import AuthErrorPage from '../pages/AuthErrorPage.vue';
import ConnectedAppsPage from '../pages/ConnectedAppsPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/environment/apps',
    name: 'ConnectedAppsPage',
    component: ConnectedAppsPage
  },
  {
    path: '/auth/error',
    name: 'AuthErrorPage',
    component: AuthErrorPage
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: AuthPage
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