<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from './middlewares/store/index';
import NavBar from './app/components/Navigator/NavBar.component.vue';
import LateralBar from './app/components/Navigator/LateralBar.component.vue';

const store: any = useStore();
const token: any = localStorage.getItem('userToken');
const currentUser: any = computed(() => store.currentUser);
const logged: any = computed(() => currentUser.value.logged);
token && store.handleUserData(token);

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