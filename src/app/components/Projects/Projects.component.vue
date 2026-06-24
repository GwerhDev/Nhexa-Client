<style scoped lang="scss" src="./Projects.component.scss" />
<script setup lang="ts">
import { ref } from 'vue';
import { useReveal } from '../../../utils/useReveal';

const el = ref<HTMLElement | null>(null);
useReveal(el);

// Hard-coded projects (placeholder media/copy for now).
// TODO(streamby): replace with project data served by the API.
const projects = [
  {
    id: 'world-of-gwerh',
    name: 'World of Gwerh',
    status: 'En desarrollo',
    statusKind: 'dev',
    accent: '#5086b0',
    text: 'Un mundo narrativo e interactivo en construcción: lore, personajes y mecánicas que conectan las disciplinas del ecosistema.',
    image: 'https://picsum.photos/seed/world-of-gwerh/800/480',
  },
  {
    id: 'placeholder-1',
    name: 'Próximamente',
    status: 'Próximamente',
    statusKind: 'soon',
    accent: '#9b59b6',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://picsum.photos/seed/project-placeholder-1/800/480',
  },
  {
    id: 'placeholder-2',
    name: 'Próximamente',
    status: 'Próximamente',
    statusKind: 'soon',
    accent: '#27ae9b',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: 'https://picsum.photos/seed/project-placeholder-2/800/480',
  },
];
</script>

<template>
  <section ref="el" class="projects reveal" id="projects">
    <div class="inner-container">
      <header class="section-header">
        <h2>Nuestros proyectos</h2>
        <p>Lo que estamos construyendo, en distintas etapas de desarrollo.</p>
      </header>

      <ul class="project-grid">
        <li
          v-for="project in projects"
          :key="project.id"
          :id="project.id"
          class="project-card"
          :style="{ '--card-accent': project.accent }"
        >
          <div class="project-media">
            <img :src="project.image" :alt="project.name" loading="lazy" />
            <span class="status-badge" :class="`status-badge--${project.statusKind}`">{{ project.status }}</span>
          </div>
          <div class="project-body">
            <h3>{{ project.name }}</h3>
            <p>{{ project.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
