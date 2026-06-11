<style scoped lang="scss" src="./Products.component.scss" />
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PRODUCTS } from '../../../middlewares/misc/apps.data';

const modules = [Navigation, Pagination];
</script>

<template>
  <section class="products" id="products">
    <div class="inner-container">
      <header class="section-header">
        <h2>Nuestros productos</h2>
        <p>Herramientas que abren el ecosistema NHEXA a otros equipos y proyectos.</p>
      </header>

      <article
        v-for="product in PRODUCTS"
        :key="product.id"
        :id="product.id"
        class="product"
        :style="{ '--card-accent': product.accent }"
      >
        <div class="product-info">
          <span class="product-icon">
            <img v-if="product.logo" :src="product.logo" :alt="product.name" />
            <font-awesome-icon v-else :icon="product.icon" />
          </span>
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <a class="product-link" :href="product.url" target="_blank" rel="noopener">
            Conocer {{ product.name }}
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </a>
        </div>

        <div class="product-media">
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :loop="true"
            :space-between="0"
            :pagination="{ clickable: true }"
            :navigation="true"
            class="product-swiper"
          >
            <swiper-slide v-for="(media, i) in product.gallery" :key="i">
              <div class="media-slide">
                <img :src="media.src" :alt="media.alt" loading="lazy" />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </article>
    </div>
  </section>
</template>
