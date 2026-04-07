import { $$ } from './utils.js';

// Lightweight click-to-zoom replacement for Fancybox.
// Looks for `.fancybox` anchors (the legacy markup) and any
// `<img>` inside post content; clicking opens an overlay.

let overlay;

function ensureOverlay() {
  if (overlay) return overlay;
  overlay = document.createElement('div');
  overlay.className = 'image-zoom-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.tabIndex = -1;
  overlay.addEventListener('click', close);
  document.body.appendChild(overlay);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
  return overlay;
}

function open(src, alt) {
  const o = ensureOverlay();
  o.innerHTML = `<img src="${src}" alt="${alt || ''}">`;
  o.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function close() {
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.innerHTML = '';
  document.body.style.overflow = '';
}

export function initZoom() {
  $$('.fancybox').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href');
      const img = a.querySelector('img');
      open(href, img?.getAttribute('alt'));
    });
  });

  // Also enable zoom for any standalone <img> in the post body.
  $$('.post-content img, .markdown img').forEach((img) => {
    if (img.closest('a')) return;
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => open(img.currentSrc || img.src, img.alt));
  });
}
