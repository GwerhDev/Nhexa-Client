<script setup lang="ts">
import HeroBannerComponent from '../components/HeroBanner/HeroBanner.component.vue';
import FeaturedCarousel from '../components/FeaturedCarousel/FeaturedCarousel.component.vue';
import AppsShowcase from '../components/AppsShowcase/AppsShowcase.component.vue';
import Manifesto from '../components/Manifesto/Manifesto.component.vue';
import CallToAction from '../components/CallToAction/CallToAction.component.vue';
</script>

<template>
  <main class="main-container">
    <hero-banner-component />
    <featured-carousel />
    <apps-showcase />
    <manifesto />
    <call-to-action />
  </main>
</template>
