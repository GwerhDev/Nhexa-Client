<script setup lang="ts">
import NavBar from './app/components/Navigator/NavBar.component.vue';
import FooterComponent from './app/components/Footer/Footer.component.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from './middlewares/store';
const store: any = useStore();

let cleanupSpy: (() => void) | null = null;

// Scroll-spy by position: the active section is the LAST one whose top has
// scrolled under the nav line. Above the first section (hero, no id) -> '' (home).
// At the bottom of the page the last section is forced active (it may never
// reach the line). The scroll container is <body> (html has overflow:hidden).
const setupScrollSpy = () => {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('.main-container > *[id]')
  );
  if (!sections.length) return;

  const OFFSET = 110; // px under the top: a section turns active when its top reaches here
  const scroller = document.body;

  const update = () => {
    let current = '';
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= OFFSET) current = s.id;
      else break;
    }
    // Bottom of page: force the last section active.
    if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) {
      current = sections[sections.length - 1].id;
    }
    if (store.activeSection !== current) store.setActiveSection(current);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };

  scroller.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  cleanupSpy = () => {
    scroller.removeEventListener('scroll', onScroll);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
};

onMounted(() => {
  store.handleUserData();
  store.handleGetAppList();
  store.handleGetMenuList();
  requestAnimationFrame(setupScrollSpy);
});

onUnmounted(() => cleanupSpy?.());

</script>

<template>
  <nav-bar />
  <main class="main-container">
    <router-view />
  </main>
  <footer-component />
</template>

<style>
.main-layout {
  display: flex;
  flex-direction: column;
}
</style>
