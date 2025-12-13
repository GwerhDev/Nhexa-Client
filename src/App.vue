<script setup lang="ts">
import NavBar from './app/components/Navigator/NavBar.component.vue';
import FooterComponent from './app/components/Footer/Footer.component.vue';
import { onMounted } from 'vue';
import { useStore } from './middlewares/store';
const store: any = useStore();

onMounted(() => {
  store.handleUserData();
  store.handleGetAppList();
  store.handleGetMenuList();
});

</script>

<template>
  <nav-bar />
  <div class="main-layout">
    <div class="app-container">
      <div class="router-view">
        <router-view />
      </div>
    </div>
    <footer-component />
  </div>
</template>

<style>
.main-layout {
  display: flex;
  flex-direction: column;
}
</style>
