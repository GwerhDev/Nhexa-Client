<script setup lang="ts">
import NavBar from './app/components/Navigator/NavBar.component.vue';
import { onMounted, ref } from 'vue';
import { setUserToken } from './helpers';
import { useStore } from './middlewares/store/index';
import { ACCOUNTS_URL } from './middlewares/misc/const';

const store: any = useStore();
const authFrame = ref<HTMLIFrameElement | null>(null); // Referencia al iframe

onMounted(async () => {
  authFrame.value = document.createElement("iframe");
  authFrame.value.src = ACCOUNTS_URL + "/embed-session";
  authFrame.value.style.display = "none";
  document.body.appendChild(authFrame.value);

  window.addEventListener("message", async (event) => {
    if (event.origin !== ACCOUNTS_URL) return;

    const { userToken } = event.data;
    if (userToken) {
      setUserToken(userToken);
      await store.handleUserData(userToken);
    } else {
      console.error("No hay sesión activa.");
    }
  });
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
