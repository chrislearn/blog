import { $ } from './utils.js';

// Hide the header on scroll-down and show it on scroll-up.
export function initHeader() {
  const header = $('#header');
  if (!header) return;

  const headerHeight = header.offsetHeight;
  const upClass = 'header-up';
  const delta = 5;
  let lastScrollTop = 0;
  let didScroll = false;

  window.addEventListener('scroll', () => { didScroll = true; }, { passive: true });

  setInterval(() => {
    if (!didScroll) return;
    didScroll = false;
    const scrollTop = window.scrollY;
    if (Math.abs(lastScrollTop - scrollTop) <= delta) return;
    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
      header.classList.add(upClass);
    } else if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) {
      header.classList.remove(upClass);
    }
    lastScrollTop = scrollTop;
  }, 250);
}
