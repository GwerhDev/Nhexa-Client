/**
 * Hard-coded data for the NHEXA ecosystem applications.
 *
 * TODO(streamby): this information (especially `gallery`) will become dynamic,
 * fed by the nhexa-streamby API. For now placeholders are used to preview the
 * design. The shape of each item is kept stable so the swap is straightforward.
 */

export interface AppMedia {
  /** Image URL. Placeholder today; will come from streamby later. */
  src: string;
  /** Alternative text / slide caption. */
  alt: string;
}

export interface AppInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** FontAwesome icon ([prefix, name]). */
  icon: [string, string];
  /** App logo (SVG asset URL). Optional. */
  logo?: string;
  /** Specific hero slide background. Falls back to gallery[0] when absent. */
  heroBg?: string;
  /** Per-app accent color, used for gradients and borders. */
  accent: string;
  /** App URL (dev placeholder for now). */
  url: string;
  /** Screenshot gallery. TODO(streamby): replace with real media. */
  gallery: AppMedia[];
}

/** Builds a deterministic placeholder image (picsum) from a seed. */
const placeholder = (seed: string, w = 800, h = 480): string =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

import spectraLogo from '../../assets/svg/spectra-logo.svg';
import spellcastLogo from '../../assets/svg/spellcast-logo.svg';
import streambyLogo from '../../assets/svg/streamby-logo.svg';
// Dedicated hero slide backgrounds.
import spectraBg from '../../assets/slider/spectra-bg.png';
import spellcastBg from '../../assets/slider/spellcast-bg.png';
import streambyBg from '../../assets/slider/streamby-bg.png';

/** Real app screenshots bundled by Vite (handles spaces in filenames). */
const spectraShots = Object.values(
  import.meta.glob('../../assets/screenshots/spectra/*.png', { eager: true, import: 'default' })
) as string[];
const spellcastShots = Object.values(
  import.meta.glob('../../assets/screenshots/spellcast/*.png', { eager: true, import: 'default' })
) as string[];
const streambyShots = Object.values(
  import.meta.glob('../../assets/screenshots/streamby/*.png', { eager: true, import: 'default' })
) as string[];

const toGallery = (shots: string[], name: string): AppMedia[] =>
  shots.map((src, i) => ({ src, alt: `${name} — captura ${i + 1}` }));

export const APPS: AppInfo[] = [
  {
    id: 'spectra',
    name: 'Spectra',
    tagline: 'Salas de streaming para compartir multimedia',
    description:
      'Spectra es el espacio social de streaming de NHEXA: salas compartidas donde la comunidad transmite y comparte contenido multimedia en tiempo real, al estilo Twitch o Discord.',
    icon: ['fas', 'wand-magic-sparkles'],
    logo: spectraLogo,
    heroBg: spectraBg,
    accent: '#9b59b6',
    url: 'https://spectra.nhexa.cl',
    gallery: toGallery(spectraShots, 'Spectra'),
  },
  {
    id: 'spellcast',
    name: 'Spellcast',
    tagline: 'Narrativa interactiva y publicación',
    description:
      'Spellcast es el editor y publicador de contenidos interactivos de NHEXA: documentos enriquecidos, medios embebidos y distribución hacia las comunidades.',
    icon: ['fas', 'feather-pointed'],
    logo: spellcastLogo,
    heroBg: spellcastBg,
    accent: '#5086b0',
    url: 'https://spellcast.nhexa.cl',
    gallery: toGallery(spellcastShots, 'Spellcast'),
  },
];

/** StreamBy is a product (not listed in #apps), but it gets its own hero slide. */
const streamby: AppInfo = {
  id: 'streamby',
  name: 'StreamBy',
  tagline: 'Gestión y entrega de medios',
  description:
    'StreamBy es la librería de gestión y entrega de medios de NHEXA: almacenamiento, exportación y streaming listos para integrar en cualquier proyecto.',
  icon: ['fas', 'photo-film'],
  logo: streambyLogo,
  heroBg: streambyBg,
  accent: '#5086b0',
  url: 'https://streamby.nhexa.cl',
  gallery: toGallery(streambyShots, 'StreamBy'),
};

/** Apps/products shown as hero slides (StreamBy first, then the apps). */
export const HERO_APPS: AppInfo[] = [streamby, ...APPS];

/** Products shown in the #products section. */
export const PRODUCTS: AppInfo[] = [streamby];

/**
 * Slides for the featured (hero) carousel.
 * TODO(streamby): replace with featured media served by the API.
 */
export const FEATURED_SLIDES: AppMedia[] = [
  { src: placeholder('featured-1', 1600, 640), alt: 'NHEXA — medios interactivos' },
  { src: placeholder('featured-2', 1600, 640), alt: 'NHEXA — colaboración interdisciplinar' },
  { src: placeholder('featured-3', 1600, 640), alt: 'NHEXA — comunidades' },
];
