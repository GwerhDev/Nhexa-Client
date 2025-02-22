<style scoped lang="scss" src="./MenuMobile.component.scss" />
<script setup lang="ts">
import { closeMenu } from '../../../helpers/menu';
import { menuList } from './config';

</script>

<template>
  <div class="container-menu-mobile">
    <ul class="ul-menu-mobile">
      <li v-for="item in menuList" :key="item.label">
        <div class="mobile-menu-link">
          <router-link v-if="item.url" :to="item.url" @click="closeMenu()">
            <p class="pl-2 pr-2 d-flex align-cent gap-1 color-white font-bold">
              {{ item.label }}
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </p>
          </router-link>
          <span v-else>
            <p class="pl-2 pr-2 d-flex align-cent gap-1 font-bold">
              {{ item.label }}
              <font-awesome-icon v-if="item?.submenu" :icon="['fas', 'chevron-down']" />
            </p>
          </span>
          <div class="submenu-mobile-container">
            <ul v-if="item?.submenu" class="submenu-mobile">
              <li v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                <router-link class="mobile-submenu-link" :to="subItem?.url">
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
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>