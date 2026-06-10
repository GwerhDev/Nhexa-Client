<style scoped lang="scss" src="./Products.component.scss" />
<script setup lang="ts">
// Hard-coded products (placeholder media for now).
// TODO(streamby): replace with product data served by the API.
const products = [
  {
    id: 'streamby',
    name: 'StreamBy',
    icon: ['fas', 'photo-film'] as [string, string],
    accent: '#5086b0',
    text: 'Nuestra librería de gestión y entrega de medios: almacenamiento, exportación y streaming listos para integrar en cualquier proyecto del ecosistema.',
    ctaLabel: 'Conocer StreamBy',
    ctaHref: 'https://streamby.nhexa.cl',
    image: 'https://picsum.photos/seed/streamby-product/800/480',
  },
];
</script>

<template>
  <section class="products" id="products">
    <div class="inner-container">
      <header class="section-header">
        <h2>Nuestros productos</h2>
        <p>Herramientas que abren el ecosistema NHEXA a otros equipos y proyectos.</p>
      </header>

      <article
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        class="product"
        :style="{ '--card-accent': product.accent }"
      >
        <div class="product-info">
          <span class="product-icon">
            <font-awesome-icon :icon="product.icon" />
          </span>
          <h3>{{ product.name }}</h3>
          <p>{{ product.text }}</p>
          <a class="product-link" :href="product.ctaHref" target="_blank" rel="noopener">
            {{ product.ctaLabel }}
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </a>
        </div>

        <div class="product-media">
          <img :src="product.image" :alt="product.name" loading="lazy" />
          <span class="placeholder-badge">placeholder · streamby</span>
        </div>
      </article>
    </div>
  </section>
</template>
