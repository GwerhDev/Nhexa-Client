<style scoped lang="scss" src="./MenuDesktop.component.scss" />
<script setup lang="ts">
import { closeMenu } from '../../../helpers/menu';
</script>

<template>
  <div class="d-flex container-menu-desk">
    <div class="inner-container">
      <ul class="ul-menu-desktop">
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
      <!--     <ul class="ul-menu-desktop d-none">
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
    </ul> -->
    </div>
  </div>
</template>