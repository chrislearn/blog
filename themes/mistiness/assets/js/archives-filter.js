import { $, $$, show, hide } from './utils.js';

// Filter posts by date on the /archives page.
export function initArchivesFilter() {
  const root = $('#archives');
  if (!root) return;

  const form = $('#filter-form', root);
  const searchInput = $('input[name=date]', root);
  const archiveResult = $('.archive-result', root);
  const yearEls = $$('.archive-year', root);
  const monthEls = $$('.archive-month', root);
  const dayEls = $$('.archive-day', root);

  const messages = {
    zero: archiveResult?.dataset.messageZero,
    one: archiveResult?.dataset.messageOne,
    other: archiveResult?.dataset.messageOther,
  };

  function getSearch() {
    return (searchInput.value || '').replace(/[\/.\-]/g, '').toLowerCase();
  }

  function sliceDate(date) {
    return [date.slice(0, 4), date.slice(4, 6), date.slice(6)];
  }

  function showResult(n) {
    if (!archiveResult) return;
    if (n === -1) { archiveResult.innerHTML = ''; hide(archiveResult); return; }
    if (n === 0) archiveResult.innerHTML = messages.zero || '';
    else if (n === 1) archiveResult.innerHTML = messages.one || '';
    else archiveResult.innerHTML = (messages.other || '').replace(/\{n\}/, n);
    show(archiveResult);
  }

  function showAll() {
    yearEls.forEach(show);
    monthEls.forEach(show);
    dayEls.forEach(show);
  }

  function hideAll() {
    yearEls.forEach(hide);
    monthEls.forEach(hide);
    dayEls.forEach(hide);
  }

  function filter(date) {
    if (date[0] === '') {
      showAll();
      showResult(-1);
      return;
    }
    hideAll();
    const matches = $$(`.archive-day[data-date^="${date[0]}${date[1]}${date[2]}"]`, root);
    showResult(matches.length);
    if (matches.length > 0) {
      $$(`.archive-year[data-date^="${date[0]}"]`, root).forEach(show);
      $$(`.archive-month[data-date^="${date[0]}${date[1]}"]`, root).forEach(show);
      matches.forEach(show);
    }
  }

  searchInput?.addEventListener('keyup', () => filter(sliceDate(getSearch())));
  form?.addEventListener('submit', (e) => e.preventDefault());
}
