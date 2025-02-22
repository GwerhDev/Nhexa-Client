<script setup lang="ts">
import NavBar from './app/components/Navigator/NavBar.component.vue';

</script>

<template>
  <div class="viewport-container">
    <header>
      <nav-bar />
    </header>
    <div class="app-container">
      <div class="router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>