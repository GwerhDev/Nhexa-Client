<style scoped lang="scss" src="./Manifesto.component.scss" />
<script setup lang="ts">
import { ref } from 'vue';
import { useReveal } from '../../../utils/useReveal';

const el = ref<HTMLElement | null>(null);
useReveal(el);

const pillars = [
  {
    icon: ['fas', 'people-group'] as [string, string],
    title: 'Colaboración interdisciplinar',
    text: 'Reunimos disciplinas distintas en torno a proyectos comunes de medios interactivos.',
  },
  {
    icon: ['fas', 'code-branch'] as [string, string],
    title: 'Desarrollo autónomo',
    text: 'Herramientas propias para crear, publicar y distribuir sin intermediarios.',
  },
  {
    icon: ['fas', 'comments'] as [string, string],
    title: 'Retroalimentación abierta',
    text: 'Construimos en diálogo constante con las comunidades a las que apuntamos.',
  },
];
</script>

<template>
  <section ref="el" class="manifesto reveal" id="manifesto">
    <div class="inner-container">
      <header class="manifesto-header">
        <span class="eyebrow">Acerca de</span>
        <h2>Conecta tus <b class="featured">sentidos</b></h2>
        <p>
          <b>Nhexa Interface</b> es un espacio donde disciplinas como la programación y lo
          audiovisual colaboran para desarrollar proyectos interactivos.
        </p>
        <p>
          Trabajamos desde lo colectivo, buscando producir contenidos que generen valor, no
          solo desde una perspectiva económica, sino también como instancia de crecimiento
          cooperativa y autónoma de los equipos. Nuestros proyectos se construyen en diálogo
          comprometido y abierto con las comunidades a las que están dirigidos, para que
          tengan sentido compartido y crezcan por sí mismos.
        </p>
      </header>

      <ul class="pillars">
        <li v-for="(p, i) in pillars" :key="i" class="pillar">
          <span class="pillar-icon">
            <font-awesome-icon :icon="p.icon" />
          </span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
