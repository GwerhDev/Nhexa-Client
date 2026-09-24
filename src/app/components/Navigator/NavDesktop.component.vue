<style scoped lang="scss" src="./NavDesktop.component.scss" />
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { DOWNLOAD_URL } from '../../../middlewares/misc/const';
import Logo from '../Logo/Logo.component.vue';
import MenuDesktop from '../Menu/MenuDesktop.component.vue';

// The apps/account buttons are a single element that lives in the menu row (next to the
// search button), but at the top of the page it's drawn over an empty slot in the top row.
// As the top row scrolls away, the buttons don't move on screen -- the nav rearranges
// around them: the menu row rises to meet them and the menu bar narrows to make room.
// Everything is driven by --nav-progress (0 at the top, 1 once the nav is pinned), set
// from the scroll position, so it follows the scroll 1:1 and reverses on the way back.
const root = ref<HTMLElement | null>(null);
const slot = ref<HTMLElement | null>(null);

let stickDistance = 1;
let rafId = 0;

const scrollTop = () => Math.max(document.body.scrollTop, document.documentElement.scrollTop);

// Offset from the pill's resting place (menu row) to the top-row slot. Both live inside the
// same sticky nav, so this offset doesn't change with scroll -- only on layout changes.
function measure() {
  const nav = root.value;
  const pill = nav?.querySelector<HTMLElement>('.inline-user-inner');
  if (!nav || !slot.value || !pill) return;

  // The nav is sticky with a negative top: it pins once scrolled by that much.
  const navTop = parseFloat(getComputedStyle(nav.parentElement ?? nav).top);
  stickDistance = Math.max(1, Math.abs(navTop) || 1);

  // Read the pill without its own transform (restored in the same frame, never painted).
  pill.style.transform = 'none';
  const a = slot.value.getBoundingClientRect();
  const b = pill.getBoundingClientRect();
  pill.style.transform = '';

  nav.style.setProperty('--pill-dx', `${a.left + a.width / 2 - (b.left + b.width / 2)}px`);
  nav.style.setProperty('--pill-dy', `${a.top + a.height / 2 - (b.top + b.height / 2)}px`);
  nav.style.setProperty('--pill-w', `${b.width}px`);
}

function update() {
  rafId = 0;
  const progress = Math.min(1, Math.max(0, scrollTop() / stickDistance));
  root.value?.style.setProperty('--nav-progress', progress.toFixed(4));
}

const onScroll = () => { if (!rafId) rafId = requestAnimationFrame(update); };
const onResize = () => { measure(); onScroll(); };

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  measure();
  update();
  // The scroll container is <body> (html has overflow:hidden); window kept as a fallback.
  document.body.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  if (root.value) {
    resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(root.value);
  }
});

onUnmounted(() => {
  document.body.removeEventListener('scroll', onScroll);
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
  resizeObserver?.disconnect();
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <nav class="nav-desk-container" ref="root">
    <div class="d-flex align-cent logo-container">
      <div class="d-flex align-cent logo-cont">
        <Logo />
      </div>

      <a :href="DOWNLOAD_URL + '/?product=nhexahub-desktop'" class="download-button">
        <font-awesome-icon :icon="['fas', 'download']" />
        Descargar NHEXA Hub
      </a>

      <!-- Keeps the top row's layout; the apps/account buttons are drawn over it at the top
           of the page (see MenuDesktop's .inline-user-inner). -->
      <div class="user-button-slot" ref="slot" aria-hidden="true"></div>
    </div>
    <div class="menu-desktop-container">
      <MenuDesktop />
    </div>
  </nav>
</template>