import { $d } from "../utils/cssSelector";

export function openMenu() {
  $d(".nav-menu-ul").style.height="100vh";
  $d(".menu-mobile-container").style.display="flex";
  $d(".close-menu-container").style.display="flex";
  $d(".burger-menu-container").style.display="none";
}

export function closeMenu() {
  $d(".nav-menu-ul").style.height="auto";
  $d(".menu-mobile-container").style.display="none";
  $d(".close-menu-container").style.display="none";
  $d(".burger-menu-container").style.display="flex";
}

// The scroll container is <body> (html has overflow:hidden).
export function scrollToTop() {
  document.body.scrollTo({ top: 0, behavior: "smooth" });
}

// The menu API (StreamBy-managed content) names its external-link field "url", but this
// app's menu templates historically only checked "href" -- so an item carrying only "url"
// (every app entry under "Aplicaciones": Spectra, Spellcast, ...) silently fell through to
// the in-app anchor branch below instead of linking out. Accepts either name so a real
// external link always wins over the fallback.
export function getMenuHref(item) {
  return item?.href || item?.url || null;
}

// The menu API's in-app anchors ("route"/"section") arrive as a bare "#hash" string, e.g.
// "#audiovisual". Passed directly to <router-link :to>, vue-router resolves a string with
// no leading "/" RELATIVE TO THE CURRENT ROUTE -- so clicking a submenu item from anywhere
// other than the home page (e.g. "/search") resolved to "/search#audiovisual" instead of
// "/#audiovisual". Every such anchor only ever exists on the home page, so it has to be
// targeted explicitly rather than left to relative resolution. A real path (starting with
// "/", none in use today but kept for forward compatibility) is returned as-is.
export function getMenuTarget(route) {
  if (!route) return null;
  if (route.startsWith("#")) return { name: "LandingPage", hash: route };
  return route;
}