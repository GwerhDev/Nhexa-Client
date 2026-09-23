<style scoped lang="scss" src="./MenuDesktop.component.scss" />
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, Ref, watch } from 'vue';
import { useStore } from '../../../middlewares/store';
import { scrollToTop } from '../../../helpers/menu';
import { useRouter } from 'vue-router';
import SkeletonLoader from '../Loaders/SkeletonLoader.component.vue';
import AppMenu from '../AppMenu/AppMenu.vue';
import AccMenu from '../AccMenu/AccMenu.vue';

// True once the nav's top row has scrolled away (see NavDesktop): the apps/account
// buttons then slide into this row, next to the search button.
const props = defineProps<{ compact?: boolean }>();

const store = useStore();
const router = useRouter();
const menuList: Ref<any[]> = computed(() => store.menuList);

const isActive = (section?: string): boolean =>
  !!section && !!store.activeSection && section.endsWith('#' + store.activeSection);

const query = ref('');
const searchOpen = ref(false);
const searchAnchor = ref<HTMLElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);

async function toggleSearch() {
  searchOpen.value = !searchOpen.value;
  if (searchOpen.value) {
    await nextTick();
    searchInput.value?.focus();
  }
}

function closeSearch() {
  searchOpen.value = false;
}

function search() {
  const text = query.value.trim();
  if (!text) return;
  query.value = '';
  closeSearch();
  router.push({ path: '/search', query: { text } });
}

const handleClickOutside = (event: MouseEvent) => {
  if (searchAnchor.value && !searchAnchor.value.contains(event.target as Node)) closeSearch();
};

// The inline group has to clip its content while it animates its width open, but that
// same clipping would cut off the account dropdown -- so clipping is only lifted once the
// open animation has finished.
const inlineSettled = ref(false);
watch(() => props.compact, (isCompact) => { if (!isCompact) inlineSettled.value = false; });
function onInlineTransitionEnd(event: TransitionEvent) {
  if (event.propertyName === 'max-width' && props.compact) inlineSettled.value = true;
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div class="container-menu-desk">
    <div class="inner-container">
      <ul class="ul-menu-desktop" v-if="menuList.length">
        <router-link class="label-menu-link pl-2 pr-2" id="first" to="/" @click="scrollToTop()" :class="{ 'is-active': !store.activeSection }">
          <font-awesome-icon :icon="['fas', 'house']" />
        </router-link>
        <li v-for="(item, index) in menuList" :key="index">
          <div class="label-menu-link" :class="{ 'is-active': isActive(item.route || item.section) }">
            <router-link v-if="item.route || item.section" :to="item.route || item.section">
              <p class="pl-2 pr-2 d-flex align-cent gap-1 color-white font-bold">
                {{ item.label }}
                <font-awesome-icon v-if="item?.submenu" :icon="['fas', 'chevron-down']" />
              </p>
            </router-link>

            <a v-else-if="item.href" :href="item.href">
              <p class="pl-2 pr-2 d-flex align-cent gap-1 color-white font-bold">
                {{ item.label }}
                <font-awesome-icon v-if="item?.submenu" :icon="['fas', 'chevron-down']" />
              </p>
            </a>

            <span v-else>
              <p class="pl-2 pr-2 d-flex align-cent gap-1 font-bold">
                {{ item.label }}
                <font-awesome-icon v-if="item.submenu" :icon="['fas', 'chevron-down']" />
              </p>
            </span>
            <div class="submenu-container">
              <ul v-if="item?.submenu" class="submenu">
                <li v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                  <a v-if="subItem.href" class="label-submenu-link" :href="subItem.href">
                    <span>
                      <img :src="subItem.icon" alt="" height="60">
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
                  </a>
                  <router-link v-if="subItem.route" class="label-submenu-link" :to="subItem.route">
                    <span>
                      <img :src="subItem.icon" alt="" height="30">
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
      <ul class="ul-menu-desktop" v-else>
        <SkeletonLoader />
      </ul>

      <div class="nav-actions">
        <div class="search-anchor" ref="searchAnchor">
          <button
            type="button"
            class="action-button"
            :class="{ 'is-open': searchOpen }"
            aria-label="Buscar"
            :aria-expanded="searchOpen"
            @click="toggleSearch"
          >
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </button>

          <Transition name="popover">
            <div v-if="searchOpen" class="search-popover" @keydown.esc="closeSearch">
              <label class="search-popover-label" for="nav-search-input">Buscar en Nhexa</label>
              <div class="search-popover-field">
                <input
                  id="nav-search-input"
                  ref="searchInput"
                  type="text"
                  placeholder="Apps, productos..."
                  v-model="query"
                  @keyup.enter="search"
                >
                <button type="button" aria-label="Buscar" @click="search">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <div
          class="inline-user-buttons"
          :class="{ 'is-visible': compact, 'is-settled': inlineSettled }"
          :inert="!compact || undefined"
          @transitionend="onInlineTransitionEnd"
        >
          <div class="action-button inline-user-inner">
            <AppMenu />
            <AccMenu />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
