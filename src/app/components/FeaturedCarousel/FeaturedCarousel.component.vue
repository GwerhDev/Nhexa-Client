<style scoped lang="scss" src="./FeaturedCarousel.component.scss" />
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FEATURED_SLIDES } from '../../../middlewares/misc/apps.data';

const modules = [Navigation, Pagination, Autoplay, EffectFade];
</script>

<template>
  <section class="featured-carousel" id="destacados">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      effect="fade"
      :autoplay="{ delay: 4500, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="featured-swiper"
    >
      <swiper-slide v-for="(slide, i) in FEATURED_SLIDES" :key="i">
        <div class="slide">
          <img :src="slide.src" :alt="slide.alt" loading="lazy" />
          <div class="slide-overlay">
            <span class="placeholder-badge">placeholder · streamby</span>
            <p class="slide-caption">{{ slide.alt }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>
