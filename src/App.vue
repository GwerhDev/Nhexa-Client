<script setup lang="ts">
import NavBar from './app/components/Navigator/NavBar.component.vue';
import FooterComponent from './app/components/Footer/Footer.component.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from './middlewares/store';
const store: any = useStore();

let observer: IntersectionObserver | null = null;

// Scroll-spy: mark the nav link active when its section crosses the viewport
// center. No id-section in the center band (i.e. the hero/top) -> '' (home).
const setupScrollSpy = () => {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('.main-container > *[id]')
  );
  if (!sections.length) return;

  const visible = new Set<string>();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      });
      const firstVisible = sections.find((s) => visible.has(s.id));
      store.setActiveSection(firstVisible ? firstVisible.id : '');
    },
    // Thin detection band just below the nav: the section crossing it is active.
    // While the hero (no id) occupies the top, no id-section is in the band -> '' (home).
    { rootMargin: '-8% 0px -90% 0px', threshold: 0 }
  );
  sections.forEach((s) => observer!.observe(s));
};

onMounted(() => {
  store.handleUserData();
  store.handleGetAppList();
  store.handleGetMenuList();
  requestAnimationFrame(setupScrollSpy);
});

onUnmounted(() => observer?.disconnect());

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
