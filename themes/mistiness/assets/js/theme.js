import { $ } from './utils.js';

// Dark mode toggle. Persists the user's choice in localStorage.
// Three states cycle: auto → light → dark → auto.

const KEY = 'mistiness-theme';
const ORDER = ['auto', 'light', 'dark'];

function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function load() {
  try { return localStorage.getItem(KEY) || 'auto'; }
  catch { return 'auto'; }
}

function save(theme) {
  try { localStorage.setItem(KEY, theme); }
  catch { /* ignore */ }
}

// Apply the persisted theme as early as possible (this module is bundled
// into the deferred script, so the inline boot snippet in head_start.html
// handles the no-flash case).
apply(load());

export function initThemeToggle() {
  const btn = $('#theme-toggle');
  if (!btn) return;
  const icon = btn.querySelector('.fa');

  function refreshIcon() {
    if (!icon) return;
    const theme = load();
    icon.classList.remove('fa-sun-o', 'fa-moon-o', 'fa-adjust');
    icon.classList.add(theme === 'dark' ? 'fa-sun-o' : 'fa-moon-o');
    btn.setAttribute('aria-label', `Theme: ${theme} (click to switch)`);
    btn.setAttribute('title', `Theme: ${theme}`);
  }

  refreshIcon();
  btn.addEventListener('click', () => {
    const current = load();
    const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    apply(next);
    save(next);
    refreshIcon();
  });
}
