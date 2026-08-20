<style scoped lang="scss" src="./Departments.component.scss" />
<script setup lang="ts">
import { ref } from 'vue';
import { useReveal } from '../../../utils/useReveal';

const el = ref<HTMLElement | null>(null);
useReveal(el);

const departments = [
  {
    id: 'audiovisual',
    name: 'Departamento Audiovisual',
    icon: ['fas', 'film'] as [string, string],
    accent: '#9b59b6',
    text: 'Encargado de la producción de imágenes en movimiento, este departamento se enfoca en la experimentación medial, en el cruce entre lo análogo y lo digital, el 2d y el 3d, la imagen real y la animación, para la generación de experiencias inmersivas.',
  },
  {
    id: 'programming',
    name: 'Departamento de Programación',
    icon: ['fas', 'code-branch'] as [string, string],
    accent: '#27ae9b',
    text: 'Enfocado en el código abierto, este departamento busca la socialización de las nuevas tecnologías disponibles, a través de la generación de interfaces interactivas para usuarios y comunidades.',
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
