<style scoped lang="scss" src="./MenuMobile.component.scss" />
<script setup lang="ts">
import { closeMenu } from '../../../helpers/menu';
</script>

<template>
  <div class="container-menu-mobile">
    <ul class="ul-menu-mobile">
      <li>
        <router-link class="lateral-menu-link" to="/" @click="closeMenu()">
          La Ruina Records
        </router-link>
      </li>
      <li>
        <router-link class="lateral-menu-link" to="/" @click="closeMenu()">
          El Umbral Studios
        </router-link>
      </li>
      <li>
        <router-link class="lateral-menu-link" to="/" @click="closeMenu()">
          Terminal Core
        </router-link>
      </li>
      <li>
        <router-link class="lateral-menu-link" to="/" @click="closeMenu()">
          Fulgor Systems
        </router-link>
      </li>
    </ul>
    <div class="separator mt-1 mb-1"></div>
    <ul class="ul-menu-mobile">
      <li>
        <router-link class="lateral-menu-link" to="/environment/apps" @click="closeMenu()">
          Aplicaciones
        </router-link>
      </li>
      <li>
        <router-link class="lateral-menu-link" to="/support" @click="closeMenu()">
          Soporte técnico
        </router-link>
      </li>
    </ul>
  </div>
</template>