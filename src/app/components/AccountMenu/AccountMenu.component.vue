<style scoped lang="scss" src="./AccountMenu.component.scss" />
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../../middlewares/store';
import { ACCOUNTS_URL, CLIENT_URL } from '../../../middlewares/misc/const';
import { CanvasMenuFunction, closeAccountMenu, closeMenu } from '../../../helpers/menu';

const store = useStore();
const userToken: any = computed(() => store.userToken);
const currentUser: any = computed(() => store.currentUser);
const logged: any = computed(() => currentUser.value.logged);

CanvasMenuFunction("#account-menu-container");

function logout() {
  store.logout();
  closeMenu();
  closeAccountMenu();
};

function select() {
  closeAccountMenu();
  closeMenu();
};

const pathAccount: string = `${ACCOUNTS_URL}/auth?token=${userToken.value}`;
const loginRoute: string = `${ACCOUNTS_URL}/login?callback=${encodeURIComponent(CLIENT_URL)}`;
const signupRoute: string = `${ACCOUNTS_URL}/register?callback=${encodeURIComponent(CLIENT_URL)}`;

</script>

<template>
  <ul class="account-menu-container" id="account-menu-container">
    <li v-if="!logged">
      <a class="menu-text principal-button" :href="loginRoute" @click="select()">
        Iniciar sesión
      </a>
    </li>
    <li v-if="!logged">
      <a class="menu-text secondary-button" :href="signupRoute" @click="select()">
        Registrarse
      </a>
    </li>
    <li class="current-user-data" v-if="logged">
      <h2>{{ currentUser?.userData?.username }}</h2>
      <img v-if="currentUser?.userData?.profilePic" :src="currentUser?.userData?.profilePic" alt="">
      <font-awesome-icon v-else icon="fa-solid fa-user" />
      <p>{{ currentUser?.userData?.role }}</p>
    </li>
    <div class="separator"></div>
    <li v-if="logged">
      <a class="menu-text principal-button" :href="pathAccount" @click="select()">
        Administrar cuenta
      </a>
    </li>
    <li v-if="logged">
      <router-link class="menu-text secondary-button" to='/' @click="logout()">
        Cerrar sesión
      </router-link>
    </li>
  </ul>
</template>