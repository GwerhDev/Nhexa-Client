<script setup lang="ts">
import HeroBannerComponent from '../components/HeroBanner/HeroBanner.component.vue';
import Projects from '../components/Projects/Projects.component.vue';
import Departments from '../components/Departments/Departments.component.vue';
import AppsShowcase from '../components/AppsShowcase/AppsShowcase.component.vue';
import Products from '../components/Products/Products.component.vue';
import Manifesto from '../components/Manifesto/Manifesto.component.vue';
import CallToAction from '../components/CallToAction/CallToAction.component.vue';
import Support from '../components/Support/Support.component.vue';
</script>

<template>
    <hero-banner-component />
    <departments />
    <products />
    <apps-showcase />
    <projects />
    <manifesto />
    <call-to-action />
    <support />
</template>
