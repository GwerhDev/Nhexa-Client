import './styles/style.css';
import './styles/root.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './app/routes';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// Register only the icons actually used (by their string name), instead of the
// whole solid/regular/brands packs — keeps the bundle small.
import {
  faArrowRight, faBars, faChevronDown, faChevronRight, faCodeBranch,
  faDownload, faFeatherPointed, faFilm, faTableCellsLarge, faHeadset, faHouse, faLayerGroup,
  faMagnifyingGlass, faMicrochip, faPeopleArrows, faPeopleGroup, faPhotoFilm, faShieldHalved,
  faUniversalAccess, faWandMagicSparkles, faXmark,
  faHourglassHalf, faScrewdriverWrench, faSpinner, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(
  faArrowRight, faBars, faChevronDown, faChevronRight, faCodeBranch,
  faDownload, faFeatherPointed, faFilm, faTableCellsLarge, faHeadset, faHouse, faLayerGroup,
  faMagnifyingGlass, faMicrochip, faPeopleArrows, faPeopleGroup, faPhotoFilm, faShieldHalved,
  faUniversalAccess, faWandMagicSparkles, faXmark,
  faHourglassHalf, faScrewdriverWrench, faSpinner, faUser,
  faGithub, faInstagram, faLinkedin,
);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .mount('#app');
