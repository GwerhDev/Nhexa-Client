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

export const APPS: AppInfo[] = [
  {
    id: 'spectra',
    name: 'Spectra',
    tagline: 'Experiencias visuales en tiempo real',
    description:
      'Spectra es el motor de visuales reactivos de NHEXA: composición de escenas, mapeo de audio y render generativo para instalaciones y performances en vivo.',
    icon: ['fas', 'wand-magic-sparkles'],
    accent: '#5086b0',
    url: 'https://spectra.nhexa.cl',
    gallery: [
      { src: placeholder('spectra-1'), alt: 'Spectra — escena generativa' },
      { src: placeholder('spectra-2'), alt: 'Spectra — mapeo de audio' },
      { src: placeholder('spectra-3'), alt: 'Spectra — instalación en vivo' },
    ],
  },
  {
    id: 'spellcast',
    name: 'Spellcast',
    tagline: 'Narrativa interactiva y publicación',
    description:
      'Spellcast es el editor y publicador de contenidos interactivos de NHEXA: documentos enriquecidos, medios embebidos y distribución hacia las comunidades.',
    icon: ['fas', 'feather-pointed'],
    accent: '#9b59b6',
    url: 'https://spellcast.nhexa.cl',
    gallery: [
      { src: placeholder('spellcast-1'), alt: 'Spellcast — editor enriquecido' },
      { src: placeholder('spellcast-2'), alt: 'Spellcast — medios embebidos' },
      { src: placeholder('spellcast-3'), alt: 'Spellcast — publicación' },
    ],
  },
  {
    id: 'havenstore',
    name: 'Havenstore',
    tagline: 'Comercio y distribución digital',
    description:
      'Havenstore es la tienda del ecosistema NHEXA: catálogo de productos físicos y digitales, gestión de descargas y entrega segura a la comunidad.',
    icon: ['fas', 'store'],
    accent: '#27ae9b',
    url: 'https://havenstore.nhexa.cl',
    gallery: [
      { src: placeholder('havenstore-1'), alt: 'Havenstore — catálogo' },
      { src: placeholder('havenstore-2'), alt: 'Havenstore — producto' },
      { src: placeholder('havenstore-3'), alt: 'Havenstore — descargas' },
    ],
  },
];

/**
 * Slides for the featured (hero) carousel.
 * TODO(streamby): replace with featured media served by the API.
 */
export const FEATURED_SLIDES: AppMedia[] = [
  { src: placeholder('featured-1', 1600, 640), alt: 'NHEXA — medios interactivos' },
  { src: placeholder('featured-2', 1600, 640), alt: 'NHEXA — colaboración interdisciplinar' },
  { src: placeholder('featured-3', 1600, 640), alt: 'NHEXA — comunidades' },
];
