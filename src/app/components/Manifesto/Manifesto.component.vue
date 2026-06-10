<style scoped lang="scss" src="./Manifesto.component.scss" />
<script setup lang="ts">
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
  <section class="manifesto" id="manifiesto">
    <div class="inner-container">
      <header class="manifesto-header">
        <span class="eyebrow">Manifiesto</span>
        <h2>Conecta tus <b class="featured">sentidos</b></h2>
        <p>
          <b>NHEXA Interface</b> es un espacio de colaboración interdisciplinar para el
          desarrollo autónomo de proyectos de medios interactivos, en retroalimentación
          abierta con las comunidades a las que están dirigidos.
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
