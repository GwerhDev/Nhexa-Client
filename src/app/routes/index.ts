import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // The scroll container is <body> (html has overflow:hidden), so window.scrollTo
  // does not work; scroll the element/body directly.
  scrollBehavior(to) {
    if (to.hash) {
      // scrollIntoView respects scroll-padding-top, so anchors land below the nav.
      const el = document.querySelector(to.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return false;
    }
    // Any hash-less navigation (e.g. '/') always lands at the top.
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }
});

export default router;