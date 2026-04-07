import { $, slideDown, slideUp } from './utils.js';

// Hide the post-bottom bar when the post footer becomes visible.
export function initPostBottomBar() {
  const bar = $('.post-bottom-bar');
  if (!bar) return;

  const footer = $('.post-actions-wrap');
  const header = $('#header');
  if (!footer || !header) return;

  let lastScrollTop = 0;
  let didScroll = false;

  function tick() {
    const scrollTop = window.scrollY;
    const footerOffsetTop = footer.getBoundingClientRect().top + scrollTop;
    if (
      lastScrollTop > scrollTop &&
      (footerOffsetTop + footer.offsetHeight > scrollTop + window.innerHeight ||
        footerOffsetTop < scrollTop + header.offsetHeight)
    ) {
      slideDown(bar);
    } else {
      slideUp(bar);
    }
    lastScrollTop = scrollTop;
  }

  tick();
  window.addEventListener('scroll', () => { didScroll = true; }, { passive: true });
  setInterval(() => {
    if (!didScroll) return;
    didScroll = false;
    tick();
  }, 250);
}
