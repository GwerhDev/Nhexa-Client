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

// The open page's look, only for a page of its own: a section of one (a route with a #) isn't
// open, though vue-router counts it exact-active there (it doesn't compare the hash).
const activeClassOf = (route?: string) => (route && !route.includes('#') ? 'router-link-exact-active' : '');
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

    <!-- As Accounts' mobile menu: rows the menu's width, a separator between groups. -->
    <div class="menu-groups" v-if="menuList.length">
      <template v-for="(item, index) in menuList" :key="item.label">
        <div v-if="index > 0" class="separator mt-1 mb-1"></div>
        <ul class="ul-menu-mobile">
          <li v-if="item.route || item.section">
            <router-link class="menu-link glow-surface glow-surface--quiet" :to="item.route || item.section"
              :exact-active-class="activeClassOf(item.route)" @click="closeMenu()">
              {{ item.label }}
            </router-link>
          </li>
          <li v-else-if="item.href">
            <a class="menu-link glow-surface glow-surface--quiet" :href="item.href" @click="closeMenu()">
              {{ item.label }}
            </a>
          </li>
          <li v-else class="menu-heading">{{ item.label }}</li>

          <li v-for="(subItem, subIndex) in item.submenu ?? []" :key="subIndex">
            <a v-if="subItem.href" class="menu-link glow-surface glow-surface--quiet" :href="subItem.href" @click="closeMenu()">
              <span>
                <img :src="subItem.icon" alt="" height="60">
              </span>
              <span class="menu-text">
                {{ subItem.label }}
                <small>{{ subItem.description }}</small>
              </span>
            </a>
            <router-link v-else-if="subItem.route" class="menu-link glow-surface glow-surface--quiet" :to="subItem.route"
              :exact-active-class="activeClassOf(subItem.route)" @click="closeMenu()">
              <span>
                <img :src="subItem.icon" alt="" height="60">
              </span>
              <span class="menu-text">
                {{ subItem.label }}
                <small>{{ subItem.description }}</small>
              </span>
            </router-link>
          </li>
        </ul>
      </template>
    </div>
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
