<template>
  <footer class="footer">
    <div class="inner-container">
      <div class="footer-top">
        <div class="footer-brand">
          <h3>NHEXA<span>Interface</span></h3>
          <p>Colaboración interdisciplinar para medios interactivos.</p>
        </div>

        <nav class="footer-links">
          <div class="footer-col">
            <h4>Aplicaciones</h4>
            <a v-for="app in APPS" :key="app.id" :href="app.url" target="_blank" rel="noopener">
              {{ app.name }}
            </a>
          </div>
          <div class="footer-col">
            <h4>Explorar</h4>
            <router-link to="/#manifiesto">Manifiesto</router-link>
            <router-link to="/#aplicaciones">Aplicaciones</router-link>
            <router-link to="/support">Soporte</router-link>
          </div>
          <div class="footer-col">
            <h4>Síguenos</h4>
            <div class="footer-social">
              <a href="#" aria-label="GitHub"><font-awesome-icon :icon="['fab', 'github']" /></a>
              <a href="#" aria-label="Instagram"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
              <a href="#" aria-label="LinkedIn"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
            </div>
          </div>
        </nav>
      </div>

      <div class="footer-bottom">
        <small>© {{ year }} NHEXA Interface · Todos los derechos reservados.</small>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { APPS } from '../../../middlewares/misc/apps.data';

export default defineComponent({
  name: 'FooterComponent',
  data() {
    return { APPS, year: new Date().getFullYear() };
  },
});
</script>

<style lang="scss" scoped>
@import './Footer.component.scss';
</style>
