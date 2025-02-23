<script setup lang="ts">
import NavBar from './app/components/Navigator/NavBar.component.vue';

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