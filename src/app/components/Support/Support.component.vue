<style scoped lang="scss" src="./Support.component.scss" />
<script setup lang="ts">
</script>

<template>
  <section class="support" id="support">
    <div class="support-card">
      <span class="support-icon">
        <font-awesome-icon :icon="['fas', 'headset']" />
      </span>
      <h2>¿Necesitas ayuda?</h2>
      <p>Nuestro equipo de soporte está para resolver tus dudas y acompañarte en cada proyecto del ecosistema.</p>
      <router-link class="support-button" to="/support">
        Ir a soporte
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </router-link>
    </div>
  </section>
</template>
