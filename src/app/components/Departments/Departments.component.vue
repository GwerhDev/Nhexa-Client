<style scoped lang="scss" src="./Departments.component.scss" />
<script setup lang="ts">
import { ref } from 'vue';
import { useReveal } from '../../../utils/useReveal';

const el = ref<HTMLElement | null>(null);
useReveal(el);

// Hard-coded departments (placeholder copy for now).
const departments = [
  {
    id: 'animation',
    name: 'Animación',
    icon: ['fas', 'film'] as [string, string],
    accent: '#9b59b6',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'technology',
    name: 'Tecnología',
    icon: ['fas', 'microchip'] as [string, string],
    accent: '#27ae9b',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];
</script>

<template>
  <section ref="el" class="departments reveal" id="departments">
    <div class="inner-container">
      <header class="section-header">
        <h2>Nuestros departamentos</h2>
        <p>Las áreas que dan forma y vida a cada proyecto del ecosistema NHEXA.</p>
      </header>

      <article
        v-for="dept in departments"
        :key="dept.id"
        :id="dept.id"
        class="department"
        :style="{ '--card-accent': dept.accent }"
      >
        <span class="department-icon">
          <font-awesome-icon :icon="dept.icon" />
        </span>
        <div class="department-body">
          <h3>{{ dept.name }}</h3>
          <p>{{ dept.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
