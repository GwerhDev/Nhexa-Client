<style scoped lang="scss" src="./MenuDesktop.component.scss" />
<script setup lang="ts">
import { menuList } from './config';

</script>

<template>
  <div class="container-menu-desk">
    <div class="inner-container">
      <ul class="ul-menu-desktop" v-if="menuList">
        <router-link class="label-menu-link pl-2 pr-2" id="first" to="/">
          <font-awesome-icon :icon="['fas', 'house']" />
        </router-link>
        <li v-for="(item, index) in menuList" :key="index">
          <div class="label-menu-link">
            <router-link v-if="item.url" :to="item.url">
              <p class="pl-2 pr-2 d-flex align-cent gap-1 color-white font-bold">
                {{ item.label }}
                <font-awesome-icon v-if="item?.submenu" :icon="['fas', 'chevron-down']" />
              </p>
            </router-link>
            <span v-else>
              <p class="pl-2 pr-2 d-flex align-cent gap-1 font-bold">
                {{ item.label }}
                <font-awesome-icon v-if="item?.submenu" :icon="['fas', 'chevron-down']" />
              </p>
            </span>
            <div class="submenu-container">
              <ul v-if="item?.submenu" class="submenu">
                <li v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                  <router-link class="label-submenu-link" :to="subItem?.url">
                    <span>
                      <img :src="subItem?.icon" alt="" height="60">
                    </span>
                    <ul>
                      <li>
                        {{ subItem.label }}
                      </li>
                      <li class="description">
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

      <ul class="ul-search">
        <li>
          <input type="text" placeholder="Buscar...">
          <button>
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>