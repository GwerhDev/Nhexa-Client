<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1.5rem;
  text-align: center;
  padding: 2rem;
}

.search-icon {
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.25);
}

.search-title {
  font-size: 1.25rem;
  color: var(--nhexa-white);
  font-weight: bold;
}

.search-query {
  color: rgba(255, 255, 255, 0.5);
}

.back-button {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .6rem 1.4rem;
  border-radius: .5rem;
  background: var(--components-background);
  color: var(--nhexa-white);
  border: solid 1px rgba(105, 105, 105, 0.705);
  cursor: pointer;
  font-weight: bold;
  transition-duration: .2s;
  text-decoration: none;

  &:hover {
    background: var(--menu-hover-color);
  }
}
</style>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const text = computed(() => route.query.text as string || '');
</script>

<template>
  <div class="search-page">
    <span class="search-icon">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
    </span>
    <p class="search-title">
      No se han encontrado resultados para:
      <span class="search-query">"{{ text }}"</span>
    </p>
    <router-link class="back-button" to="/">
      <font-awesome-icon :icon="['fas', 'house']" />
      Volver al inicio
    </router-link>
  </div>
</template>
