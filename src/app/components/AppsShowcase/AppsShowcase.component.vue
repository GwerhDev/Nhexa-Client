<style scoped lang="scss" src="./AppsShowcase.component.scss" />
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { APPS } from '../../../middlewares/misc/apps.data';

const modules = [Navigation, Pagination];
</script>

<template>
  <section class="apps-showcase" id="apps">
    <div class="inner-container">
      <header class="section-header">
        <h2>Nuestras aplicaciones</h2>
        <p>Un ecosistema de herramientas para crear, publicar y distribuir medios interactivos.</p>
      </header>

      <article
        v-for="(app, index) in APPS"
        :key="app.id"
        :id="app.id"
        class="app-row"
        :class="{ reversed: index % 2 === 1 }"
        :style="{ '--app-accent': app.accent }"
      >
        <!-- Per-app mini carousel (placeholders -> streamby later) -->
        <div class="app-media">
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :loop="true"
            :space-between="0"
            :pagination="{ clickable: true }"
            :navigation="true"
            class="app-swiper"
          >
            <swiper-slide v-for="(media, i) in app.gallery" :key="i">
              <div class="media-slide">
                <img :src="media.src" :alt="media.alt" loading="lazy" />
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <!-- App info -->
        <div class="app-info">
          <span class="app-icon">
            <img v-if="app.logo" :src="app.logo" :alt="app.name" />
            <font-awesome-icon v-else :icon="app.icon" />
          </span>
          <h3>{{ app.name }}</h3>
          <p class="tagline">{{ app.tagline }}</p>
          <p class="description">{{ app.description }}</p>
          <a class="app-link" :href="app.url" target="_blank" rel="noopener">
            Explorar {{ app.name }}
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
