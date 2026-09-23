<style scoped lang="scss" src="./NavDesktop.component.scss" />
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { DOWNLOAD_URL } from '../../../middlewares/misc/const';
import Logo from '../Logo/Logo.component.vue';
import MenuDesktop from '../Menu/MenuDesktop.component.vue';
import AppMenu from '../AppMenu/AppMenu.vue';
import AccMenu from '../AccMenu/AccMenu.vue';

// The nav is sticky with a negative top, so on scroll this top row slides up out of
// view and only the menu row stays pinned. Once most of the row is gone, the nav
// switches to its compact state: the apps/account buttons move into the menu row,
// next to the search button.
const topRow = ref<HTMLElement | null>(null);
const compact = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!topRow.value) return;
  observer = new IntersectionObserver(
    ([entry]) => { compact.value = entry.intersectionRatio < 0.5; },
    { threshold: [0, 0.5, 1] }
  );
  observer.observe(topRow.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <nav class="nav-desk-container">
    <div class="d-flex align-cent logo-container" ref="topRow">
      <div class="d-flex align-cent logo-cont">
        <Logo />
      </div>

      <a :href="DOWNLOAD_URL + '/?product=nhexahub-desktop'" class="download-button">
        <font-awesome-icon :icon="['fas', 'download']" />
        Descargar NHEXA Hub
      </a>

      <div class="user-button" :class="{ 'is-hidden': compact }" :inert="compact || undefined">
        <AppMenu />
        <AccMenu />
      </div>
    </div>
    <div class="menu-desktop-container">
      <MenuDesktop :compact="compact" />
    </div>
  </nav>
</template>