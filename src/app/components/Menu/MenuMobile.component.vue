<style scoped lang="scss" src="./MenuMobile.component.scss" />
<script setup lang="ts">
import { computed, Ref } from 'vue';
import { closeMenu } from '../../../helpers/menu';
import { useStore } from '../../../middlewares/store';
import Loader from '../Loaders/Loader.component.vue';
import SkeletonLoader from '../Loaders/SkeletonLoader.component.vue';

const store = useStore();
const menuList: Ref<any[]> = computed(() => store.menuList);
</script>

<template>
  <div class="container-menu-mobile">
    <ul class="ul-menu-mobile" v-if="menuList.length">
      <li v-for="item in menuList" :key="item.label">
        <div class="mobile-menu-link">
          <router-link v-if="item.route" :to="item.route" @click="closeMenu()">
            <p class="pl-2 pr-2 d-flex align-cent gap-1 color-white font-bold">
              {{ item.label }}
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </p>
          </router-link>

          <a v-else-if="item.href" :href="item.href" @click="closeMenu()">
            <p class="pl-2 pr-2 d-flex align-cent gap-1 color-white font-bold">
              {{ item.label }}
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </p>
          </a>

          <span v-else>
            <p class="pl-2 pr-2 d-flex align-cent gap-1 font-bold">
              {{ item.label }}
              <font-awesome-icon v-if="item?.submenu" :icon="['fas', 'chevron-down']" />
            </p>
          </span>
          <div class="submenu-mobile-container">
            <ul v-if="item?.submenu" class="submenu-mobile">
              <li v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                <a v-if="subItem.href" class="mobile-submenu-link" :href="subItem.href">
                  <span>
                    <img :src="subItem?.icon" alt="" height="60">
                  </span>
                  <ul>
                    <li>
                      {{ subItem.label }}
                    </li>
                    <li class="mobile-description">
                      <small>
                        {{ subItem.description }}
                      </small>
                    </li>
                  </ul>
                </a>

                <router-link v-if="subItem.route" class="mobile-submenu-link" :to="subItem.route">
                  <span>
                    <img :src="subItem.icon" alt="" height="60">
                  </span>
                  <ul>
                    <li>
                      {{ subItem.label }}
                    </li>
                    <li class="mobile-description">
                      <small>
                        {{ subItem.description }}
                      </small>
                    </li>
                  </ul>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="loader-container" v-else>
      <ul class="empty-submenu-mobile">
        <li>
          <SkeletonLoader />
        </li>
        <li>
          <SkeletonLoader />
        </li>
        <li>
          <SkeletonLoader />
        </li>
        <li>
          <Loader />
        </li>
      </ul>
    </div>
  </div>
</template>