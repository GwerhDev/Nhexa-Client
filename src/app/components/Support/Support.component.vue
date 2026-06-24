<style scoped lang="scss" src="./Support.component.scss" />
<script setup lang="ts">
import { ref } from 'vue';
import { useReveal } from '../../../utils/useReveal';

const el = ref<HTMLElement | null>(null);
useReveal(el);
</script>

<template>
  <section ref="el" class="support reveal" id="support">
    <div class="support-card">
      <span class="support-icon">
        <font-awesome-icon :icon="['fas', 'headset']" />
      </span>
      <h2>¿Necesitas ayuda?</h2>
      <p>Nuestro equipo de soporte está para resolver tus dudas y acompañarte en cada proyecto del ecosistema.</p>
    </div>
  </section>
</template>
