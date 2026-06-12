<style scoped lang="scss" src="./AppMenu.scss" />
<script setup lang="ts">
import { ref } from 'vue';
import AppDesktop from './AppDesktop.component.vue';

const isOpen = ref(false);
</script>

<template>
  <span class="app-menu-button">
    <font-awesome-icon class="icon" :icon="['fas', 'layer-group']" @click="isOpen = true" />
    <Teleport to="body">
      <AppDesktop v-if="isOpen" @close="isOpen = false" />
    </Teleport>
  </span>
</template>
