<style scoped lang="scss" src="./NavDesktop.component.scss" />
<script setup lang="ts">
import { DOWNLOAD_URL } from '../../../middlewares/misc/const';
import Logo from '../Logo/Logo.component.vue';
import MenuDesktop from '../Menu/MenuDesktop.component.vue';
import AppMenu from '../AppMenu/AppMenu.vue';
import AccMenu from '../AccMenu/AccMenu.vue';

</script>

<template>
  <nav class="nav-desk-container">
    <div class="d-flex align-cent logo-container">
      <div class="d-flex align-cent logo-cont">
        <Logo />
      </div>

      <a :href="DOWNLOAD_URL + '/?product=nhexahub-desktop'" class="download-button">
        <font-awesome-icon :icon="['fas', 'download']" />
        Descargar NHEXA Hub
      </a>

      <div class="user-button">
        <AppMenu />
        <AccMenu />
      </div>
    </div>
    <div class="menu-desktop-container">
      <MenuDesktop />
    </div>
  </nav>
</template>