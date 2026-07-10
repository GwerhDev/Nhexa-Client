<style scoped lang="scss" src="./Projects.component.scss" />
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WebGLFluid from 'webgl-fluid';
import { useReveal } from '../../../utils/useReveal';

const el = ref<HTMLElement | null>(null);
useReveal(el);

// Same GPU fluid cursor effect as the hero — one instance per card, rendered
// behind the card content, following the mouse.
onMounted(() => {
  const section = el.value;
  if (!section) return;

  const fluidConfig = {
    IMMEDIATE: true,
    TRIGGER: 'hover',
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2,
    PRESSURE: 0.1,
    PRESSURE_ITERATIONS: 20,
    CURL: 3,
    SPLAT_RADIUS: 0.22,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: false,
    SPLAT_COLOR: { r: 0.08, g: 0.08, b: 0.1 },
    TRANSPARENT: true,
    BLOOM: true,
    BLOOM_INTENSITY: 0.22,
    SUNRAYS: false,
  };

  const canvases = Array.from(section.querySelectorAll('canvas.card-fx')) as HTMLCanvasElement[];
  canvases.forEach((canvas) => {
    WebGLFluid(canvas, fluidConfig);
    const card = canvas.parentElement;              // the .project-card
    card?.addEventListener('mousemove', (e: MouseEvent) => {
      canvas.dispatchEvent(new MouseEvent('mousemove', {
        clientX: e.clientX, clientY: e.clientY, bubbles: false,
      }));
    });
  });
});

// Hard-coded projects (placeholder copy for now).
// TODO(streamby): replace with project data served by the API.
const projects = [
  {
    id: 'world-of-gwerh',
    name: 'World of Gwerh',
    status: 'En desarrollo',
    statusKind: 'dev',
    accent: '#5086b0',
    text: 'Un mundo narrativo e interactivo en construcción: lore, personajes y mecánicas que conectan las disciplinas del ecosistema.',
  },
  {
    id: 'placeholder-1',
    name: 'Próximamente',
    status: 'Próximamente',
    statusKind: 'soon',
    accent: '#9b59b6',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'placeholder-2',
    name: 'Próximamente',
    status: 'Próximamente',
    statusKind: 'soon',
    accent: '#27ae9b',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
          <canvas class="card-fx" aria-hidden="true"></canvas>
          <div class="project-body">
            <h3>{{ project.name }}</h3>
            <p>{{ project.text }}</p>
          </div>
          <div class="project-media project-media--placeholder">
            <div class="soon-placeholder">
              <font-awesome-icon
                :icon="['fas', project.statusKind === 'dev' ? 'screwdriver-wrench' : 'hourglass-half']"
                class="soon-icon"
              />
              <span class="soon-label">{{ project.statusKind === 'dev' ? 'En desarrollo' : 'En camino' }}</span>
            </div>
            <span class="status-badge" :class="`status-badge--${project.statusKind}`">{{ project.status }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
