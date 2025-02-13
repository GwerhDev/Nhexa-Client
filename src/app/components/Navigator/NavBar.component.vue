<style scoped lang="scss" src="./NavBar.component.scss" />
<script setup lang="ts">
import AppMenu from '../AppMenu/AppMenu.component.vue';
import NavMobile from './NavMobile.component.vue';
import NavDesktop from './NavDesktop.component.vue';
import MenuDesktop from '../Menu/MenuDesktop.component.vue';
import AccountMenu from '../AccountMenu/AccountMenu.component.vue';

</script>

<template>
  <nav class="nav-container">
    <NavDesktop />
    <NavMobile />
    <AccountMenu />
    <AppMenu />
  </nav>
  <nav class="menu-nav-desktop">
    <MenuDesktop />
  </nav>
</template>