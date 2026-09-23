<style scoped lang="scss" src="./MenuMobile.component.scss" />
<style scoped>
.mobile-search {
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  margin-bottom: .75rem;
  background: var(--components-background);
  backdrop-filter: blur(200px);
  border-radius: .5rem;
  padding-inline: .25rem;
}

.mobile-search input {
  flex: 1;
  border: none;
  background: transparent;
  padding-inline: 1rem;
  color: var(--nhexa-white);
}

.mobile-search input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.mobile-search input:focus,
.mobile-search input:focus-visible {
  border: none;
  outline: none;
}

.mobile-search button {
  border: none;
  background: transparent;
  color: var(--nhexa-white);
  padding-inline: .75rem;
  cursor: pointer;
}
</style>
<script setup lang="ts">
import { computed, ref, Ref } from 'vue';
import { closeMenu } from '../../../helpers/menu';
import { useStore } from '../../../middlewares/store';
import { useRouter } from 'vue-router';
import SkeletonLoader from '../Loaders/SkeletonLoader.component.vue';

const store = useStore();
const router = useRouter();
const menuList: Ref<any[]> = computed(() => store.menuList);

const query = ref('');

function search() {
  const text = query.value.trim();
  if (!text) return;
  query.value = '';
  closeMenu();
  router.push({ path: '/search', query: { text } });
}
</script>

<template>
  <div class="container-menu-mobile">
    <div class="mobile-search">
      <input
        type="text"
        placeholder="Buscar..."
        v-model="query"
        @keyup.enter="search"
      >
      <button type="button" @click="search" aria-label="Buscar">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>
    </div>

    <ul class="ul-menu-mobile" v-if="menuList.length">
      <li v-for="item in menuList" :key="item.label">
        <div class="mobile-menu-link">
          <router-link v-if="item.route || item.section" :to="item.route || item.section" @click="closeMenu()">
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
                <a v-if="subItem.href" @click="closeMenu()" class="mobile-submenu-link" :href="subItem.href">
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

                <router-link  @click="closeMenu()" v-if="subItem.route" class="mobile-submenu-link" :to="subItem.route">
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
      </ul>
    </div>
  </div>
</template>
