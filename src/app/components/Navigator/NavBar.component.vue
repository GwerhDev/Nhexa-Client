<style scoped lang="scss" src="./NavBar.component.scss" />
<script setup lang="ts">
import NavMobile from './NavMobile.component.vue';
import NavDesktop from './NavDesktop.component.vue';
import AppMenu from '../AppMenu/AppMenu.component.vue';
import AccountMenu from '../AccountMenu/AccountMenu.component.vue';
import { onMounted } from 'vue';
import { useStore } from '../../../middlewares/store';
const store = useStore();

onMounted(() => {
  store.handleGetMenuList();
});

</script>

<template>
  <nav class="nav-container">
    <NavDesktop />
    <NavMobile />
    <AccountMenu />
    <AppMenu />
  </nav>
</template>