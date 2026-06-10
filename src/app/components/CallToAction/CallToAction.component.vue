<style scoped lang="scss" src="./CallToAction.component.scss" />
<script setup lang="ts">
import { DOWNLOAD_URL } from '../../../middlewares/misc/const';
</script>

<template>
  <section class="cta" id="download">
    <div class="cta-card">
      <div class="cta-text">
        <h2>Lleva NHEXA contigo</h2>
        <p>Descarga NHEXA Hub y accede a todo el ecosistema desde un solo lugar.</p>
      </div>
      <a :href="DOWNLOAD_URL + '/?product=nhexahub-desktop'" class="cta-button">
        <font-awesome-icon :icon="['fas', 'download']" />
        Descargar NHEXA Hub
      </a>
    </div>
  </section>
</template>
