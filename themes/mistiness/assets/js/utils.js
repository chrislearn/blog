// Small DOM/utility helpers used by the modern Mistiness scripts.

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export function debounce(fn, wait = 100) {
  let t;
  return function debounced(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

export function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn, { once: true });
}

export function show(el) {
  if (el) el.style.display = '';
}

export function hide(el) {
  if (el) el.style.display = 'none';
}

export function slideDown(el, duration = 200) {
  if (!el) return;
  el.style.removeProperty('display');
  let display = window.getComputedStyle(el).display;
  if (display === 'none') display = 'block';
  el.style.display = display;
  const height = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.style.height = '0px';
  el.style.transition = `height ${duration}ms ease`;
  // force reflow
  el.offsetHeight; // eslint-disable-line no-unused-expressions
  el.style.height = height + 'px';
  setTimeout(() => {
    el.style.removeProperty('height');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition');
  }, duration);
}

export function slideUp(el, duration = 200) {
  if (!el) return;
  el.style.height = el.offsetHeight + 'px';
  el.style.overflow = 'hidden';
  el.style.transition = `height ${duration}ms ease`;
  el.offsetHeight; // eslint-disable-line no-unused-expressions
  el.style.height = '0px';
  setTimeout(() => {
    el.style.display = 'none';
    el.style.removeProperty('height');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition');
  }, duration);
}

export function fadeIn(el, duration = 200) {
  if (!el) return;
  el.style.opacity = 0;
  el.style.display = '';
  el.style.transition = `opacity ${duration}ms ease`;
  el.offsetHeight; // eslint-disable-line no-unused-expressions
  el.style.opacity = 1;
  setTimeout(() => {
    el.style.removeProperty('transition');
  }, duration);
}

export function fadeOut(el, duration = 200) {
  if (!el) return;
  el.style.transition = `opacity ${duration}ms ease`;
  el.style.opacity = 0;
  setTimeout(() => {
    el.style.display = 'none';
    el.style.removeProperty('opacity');
    el.style.removeProperty('transition');
  }, duration);
}
