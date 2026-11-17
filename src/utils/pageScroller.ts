// What scrolls the page: on a wide screen <body> (html has overflow: hidden); on a phone the
// document itself, so the browser's bars fold away and its overscroll and pull-to-refresh
// work as on any site (see root.css).
export const pageScroller = (): HTMLElement =>
  getComputedStyle(document.documentElement).overflowY === 'hidden'
    ? document.body
    : (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
