<style scoped lang="scss" src="./CallToAction.component.scss" />
<script setup lang="ts">
import { ref } from 'vue';
import { DOWNLOAD_URL } from '../../../middlewares/misc/const';
import { useReveal } from '../../../utils/useReveal';

const el = ref<HTMLElement | null>(null);
useReveal(el);
</script>

<template>
  <section ref="el" class="cta reveal" id="download">
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
