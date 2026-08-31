<style scoped lang="scss" src="./Manifesto.component.scss" />
<script setup lang="ts">
import { ref } from 'vue';
import { useReveal } from '../../../utils/useReveal';

const el = ref<HTMLElement | null>(null);
useReveal(el);

const pillars = [
  {
    icon: ['fas', 'people-group'] as [string, string],
    title: 'Comunidades coautoras',
    text: 'Las comunidades dan vida a los proyectos, y en Nhexa, la retroalimentación y participación es una herramienta concreta para crear.',
  },
  {
    icon: ['fas', 'people-arrows'] as [string, string],
    title: 'Contra la Autoría Tradicional',
    text: 'Adherimos a un esquema en donde las decisiones nacen del trabajo colectivo, para ser una red creativa que se fortalezca a través de la colaboración.',
  },
  {
    icon: ['fas', 'film'] as [string, string],
    title: 'Hacer Cultura vs. Consumo Pasivo',
    text: 'Buscamos que nuestros proyectos no sean solo entretenimiento efímero, sino que reflejen narrativas con un punto de vista que les sostengan en el tiempo.',
  },
  {
    icon: ['fas', 'microchip'] as [string, string],
    title: 'Tecnología como expresión humana',
    text: 'Las tecnologías digitales no suelen ser medios neutros, pero al hacerlas propias se convierten en herramientas para construir nuevos mundos y formas de habitarlos.',
  },
  {
    icon: ['fas', 'shield-halved'] as [string, string],
    title: 'Autonomía digital',
    text: 'Nhexa se posiciona en contra del lucro con la información privada, así como también se proyecta desde el código abierto como espacio de resistencia.',
  },
  {
    icon: ['fas', 'universal-access'] as [string, string],
    title: 'Accesibilidad y difusión',
    text: 'Creemos que el arte, la cultura y el entretenimiento no deben ser excluyentes. Fomentamos el acceso libre y el conocimiento compartido.',
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
          <b>Nhexa Interface</b> es un espacio interdisciplinar, en donde áreas como la
          programación y lo audiovisual colaboran para el desarrollo de proyectos de
          «nuevos medios», explorando tecnologías que hagan posible la interactividad e
          inmersión.
        </p>
        <p>
          Desde el trabajo colectivo y cooperativo, se busca producir contenidos que generen
          valor por sí mismos como obra, pero también como instancia de crecimiento para el
          equipo y su autonomía. Este valor de los proyectos de Nhexa también se extiende a
          las comunidades a las que se dirigen, a través de diálogo y participación constante,
          para así generar medios que tengan sentido compartido y se sostengan en el tiempo.
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
