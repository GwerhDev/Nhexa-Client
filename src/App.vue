<script setup lang="ts">
import NavBar from './app/components/Navigator/NavBar.component.vue';
import FooterComponent from './app/components/Footer/Footer.component.vue';
import { onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from './middlewares/store';
import { pageScroller } from './utils/pageScroller';
const store: any = useStore();
const route = useRoute();

let cleanupSpy: (() => void) | null = null;

// Scroll-spy by position: the active section is the LAST one whose top has
// scrolled under the nav line. Above the first section (hero, no id) -> '' (home).
// At the bottom of the page the last section is forced active (it may never
// reach the line). What scrolls is <body> on a wide screen, the document on a phone
// (pageScroller): both are listened to.
const setupScrollSpy = () => {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('.main-container > *[id]')
  );
  if (!sections.length) return;

  const OFFSET = 110; // px under the top: a section turns active when its top reaches here
  const scroller = document.body;

  const update = () => {
    if (store.pinnedSection !== null) return;
    const page = pageScroller();
    let current = '';
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= OFFSET) current = s.id;
      else break;
    }
    // Bottom of page: force the last section active.
    if (page.scrollTop + page.clientHeight >= page.scrollHeight - 2) {
      current = sections[sections.length - 1].id;
    }
    if (store.activeSection !== current) store.setActiveSection(current);
  };

  // A click's scroll: the spy waits until it has ended (scrollend where there is one, else the
  // page standing still for a few frames), then looks where it landed. The scroll can take a
  // moment to start after the click: until it moves, up to a second (one with nowhere to go
  // never starts).
  let watching = 0;
  const release = () => {
    cancelAnimationFrame(watching);
    if (store.pinnedSection === null) return;
    store.releasePinnedSection();
    update();
  };
  const watchScrollEnd = () => {
    cancelAnimationFrame(watching);
    const started = performance.now();
    let last = pageScroller().scrollTop;
    let moved = false;
    let still = 0;
    const frame = () => {
      const top = pageScroller().scrollTop;
      if (top !== last) { moved = true; still = 0; last = top; } else still++;
      if ((moved && still >= 5) || (!moved && performance.now() - started > 1000)) release();
      else watching = requestAnimationFrame(frame);
    };
    watching = requestAnimationFrame(frame);
  };
  const stopPinWatch = watch(() => store.pinnedSection, (pinned) => { if (pinned !== null) watchScrollEnd(); }, { immediate: true });

  let ticking = false;
  const onScroll = () => {
    if (store.pinnedSection !== null) return;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };

  scroller.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  scroller.addEventListener('scrollend', release);
  window.addEventListener('scrollend', release);
  window.addEventListener('resize', onScroll);
  update();

  cleanupSpy = () => {
    stopPinWatch();
    cancelAnimationFrame(watching);
    scroller.removeEventListener('scroll', onScroll);
    window.removeEventListener('scroll', onScroll);
    scroller.removeEventListener('scrollend', release);
    window.removeEventListener('scrollend', release);
    window.removeEventListener('resize', onScroll);
  };
};

watch(() => route.path, (path) => {
  if (path === '/') {
    requestAnimationFrame(setupScrollSpy);
  } else {
    cleanupSpy?.();
    cleanupSpy = null;
    store.releasePinnedSection();
    store.setActiveSection('');
  }
});

onMounted(() => {
  store.handleUserData();
  store.handleGetNhexaEnv();
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
