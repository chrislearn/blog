import { $, $$ } from './utils.js';

// Open and close the share options bar.
export function initShareOptions() {
  const bar = $('#share-options-bar');
  if (!bar) return;

  const openBtns = $$('.btn-open-shareoptions');
  const closeBtn = $('#btn-close-shareoptions');
  const body = document.body;

  function open() {
    if (bar.classList.contains('opened') || bar.classList.contains('processing')) return;
    bar.classList.add('processing', 'opened');
    body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.style.display = '';
    setTimeout(() => bar.classList.remove('processing'), 250);
  }

  function close() {
    if (!bar.classList.contains('opened') || bar.classList.contains('processing')) return;
    bar.classList.add('processing');
    bar.classList.remove('opened');
    if (closeBtn) closeBtn.style.display = 'none';
    setTimeout(() => {
      bar.classList.remove('processing');
      body.style.overflow = '';
    }, 250);
  }

  openBtns.forEach((btn) => btn.addEventListener('click', open));
  closeBtn?.addEventListener('click', close);
}
