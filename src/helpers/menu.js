import { $d } from "../utils/cssSelector";
import { pageScroller } from "../utils/pageScroller";

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

// What scrolls the page (see pageScroller): <body> on a wide screen, the document on a phone.
export function scrollToTop() {
  pageScroller().scrollTo({ top: 0, behavior: "smooth" });
}