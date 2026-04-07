import { $, $$ } from './utils.js';

// Open and close the sidebar by swiping it (and the blog) on small screens.
const MEDIUM_SCREEN_WIDTH = 768;

export function initSidebar() {
  const sidebar = $('#sidebar');
  if (!sidebar) return;

  const openBtn = $('#btn-open-sidebar');
  const closeTargets = $$('#header, #main, .post-header-cover');
  const blogParts = $$('.post-bottom-bar, #header, #main, .post-header-cover');
  const body = document.body;

  function open() {
    if (sidebar.classList.contains('pushed') || sidebar.classList.contains('processing')) return;
    sidebar.classList.add('processing', 'pushed');
    body.style.overflowX = 'hidden';
    setTimeout(() => sidebar.classList.remove('processing'), 250);

    blogParts.forEach((el) => {
      if (el.classList.contains('pushed') || el.classList.contains('processing')) return;
      el.classList.add('processing', 'pushed');
      setTimeout(() => el.classList.remove('processing'), 250);
    });
  }

  function close() {
    if (sidebar.classList.contains('pushed') && !sidebar.classList.contains('processing')) {
      sidebar.classList.remove('pushed');
      body.style.overflowX = 'auto';
    }
    blogParts.forEach((el) => {
      if (el.classList.contains('pushed') && !el.classList.contains('processing')) {
        el.classList.add('processing');
        el.classList.remove('pushed');
        setTimeout(() => el.classList.remove('processing'), 250);
      }
    });
  }

  openBtn?.addEventListener('click', () => {
    if (!sidebar.classList.contains('pushed')) open();
  });

  closeTargets.forEach((el) => {
    el.addEventListener('click', () => {
      if (sidebar.classList.contains('pushed')) close();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > MEDIUM_SCREEN_WIDTH) {
      sidebar.classList.remove('pushed');
      blogParts.forEach((el) => el.classList.remove('pushed'));
    } else {
      close();
    }
  });
}
