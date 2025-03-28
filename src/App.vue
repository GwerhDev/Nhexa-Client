<script setup lang="ts">
import NavBar from './app/components/Navigator/NavBar.component.vue';
import { onMounted, ref } from 'vue';
import { useStore } from './middlewares/store/index';

const store: any = useStore();
const authFrame = ref<HTMLIFrameElement | null>(null); // Referencia al iframe

onMounted(async () => {
  const token: any = await getUserToken();
  token && store.handleUserData(token);
});

</script>

<template>
  <header>
    <nav-bar />
  </header>
  <div class="viewport-container">
    <div class="app-container">
      <div class="router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>
