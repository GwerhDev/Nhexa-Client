import { MenuItem } from './menu';

const icon = (name: string) => new URL(`../../assets/svg/${name}-logo.svg`, import.meta.url).href;

// In development the local StreamBy export usually has no menu: this one stands in for it, with
// a submenu, so the bar can be seen as it is in production. Its routes lead nowhere on purpose:
// none is the page open, so none shows as the active one.
export const DEV_MENU: MenuItem[] = [
  {
    label: 'Departamentos',
    section: '#departments',
    submenu: [
      { label: 'StreamBy', description: 'Gestión de contenido multimedia', route: '/departments/streamby', icon: icon('streamby') },
      { label: 'Spellcast', description: 'Lectura en voz alta', route: '/departments/spellcast', icon: icon('spellcast') },
      { label: 'Spectra', description: 'Visualización de datos', route: '/departments/spectra', icon: icon('spectra') },
    ],
  },
  { label: 'Productos', section: '#products' },
];
