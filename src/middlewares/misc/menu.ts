// The site's menu: what StreamBy's export lists (its "menu-list"), always between Home (first)
// and Support (last), which are the site's own: without an answer from the export, or before
// it, the menu is these two.

export interface MenuItem {
  label: string;
  section?: string;
  route?: string;
  href?: string;
  submenu?: unknown[];
  // Home: drawn as the bar's house icon on a wide screen.
  home?: boolean;
}

export const HOME_ITEM: MenuItem = { label: 'Inicio', route: '/', home: true };
export const SUPPORT_ITEM: MenuItem = { label: 'Soporte', section: '#support' };

// Where an item leads, so "#support" and "/#support" (or "/" and "") are the same place.
const targetOf = (item: MenuItem) => (item.route ?? item.section ?? item.href ?? '').replace(/^\/(?=#)/, '') || '/';

const isItem = (value: unknown): value is MenuItem =>
  !!value && typeof value === 'object' && typeof (value as MenuItem).label === 'string';

/** Home, the export's items (anything else it answers ignored, and none of Home's or Support's again), and Support. */
export function withMenuFallbacks(fetched: unknown): MenuItem[] {
  const own = new Set([targetOf(HOME_ITEM), targetOf(SUPPORT_ITEM)]);
  const middle = (Array.isArray(fetched) ? fetched : []).filter(isItem).filter(item => !own.has(targetOf(item)));
  return [HOME_ITEM, ...middle, SUPPORT_ITEM];
}
