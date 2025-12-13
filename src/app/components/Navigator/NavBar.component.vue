<style scoped lang="scss" src="./NavBar.component.scss" />
<script setup lang="ts">
import NavMobile from './NavMobile.component.vue';
import NavDesktop from './NavDesktop.component.vue';

</script>

<template>
  <nav class="nav-container">
    <NavDesktop />
    <NavMobile />
  </nav>
</template>