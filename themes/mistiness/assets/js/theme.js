// Dark mode toggle. Persists the user's choice in localStorage and
// flips between two concrete states (light / dark) so every click
// produces a visible change. The no-flash boot snippet in
// head_start.html applies the persisted value before first paint.

const KEY = 'mistiness-theme';

function systemPrefersDark() {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Resolve whatever is currently in storage (or absent) to a concrete
// 'light' | 'dark' value, taking the system preference into account
// for first-time visitors and legacy 'auto' entries.
function resolvedCurrent() {
  let stored = null;
  try { stored = localStorage.getItem(KEY); } catch { /* ignore */ }
  if (stored === 'light' || stored === 'dark') return stored;
  return systemPrefersDark() ? 'dark' : 'light';
}

function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function save(theme) {
  try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
}

// Re-assert the resolved theme as soon as this module evaluates so the
// DOM attribute is always a concrete value (not 'auto') by the time
// initThemeToggle runs.
apply(resolvedCurrent());

export function initThemeToggle() {
  const btns = Array.from(document.querySelectorAll('.theme-toggle'));
  if (!btns.length) return;

  function refreshAll() {
    const theme = resolvedCurrent();
    btns.forEach((btn) => {
      const icon = btn.querySelector('.fa');
      if (icon) {
        icon.classList.remove('fa-sun-o', 'fa-moon-o', 'fa-adjust');
        icon.classList.add(theme === 'dark' ? 'fa-sun-o' : 'fa-moon-o');
      }
      const next = theme === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', `Switch to ${next} mode`);
      btn.setAttribute('title', `Switch to ${next} mode`);
    });
  }

  refreshAll();
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = resolvedCurrent() === 'dark' ? 'light' : 'dark';
      apply(next);
      save(next);
      refreshAll();
    });
  });
}
