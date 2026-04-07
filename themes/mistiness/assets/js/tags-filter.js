import { $, $$, show, hide } from './utils.js';

// Filter posts by tag on the /tags page.
export function initTagsFilter() {
  const root = $('#tags-archives');
  if (!root) return;

  const form = $('#filter-form', root);
  const searchInput = $('#filter-form input[name=tag]', root);
  const archiveResult = $('.archive-result', root);
  const allTags = $$('.tag', root);
  const allPosts = $$('.archive', root);

  const messages = {
    zero: archiveResult?.dataset.messageZero,
    one: archiveResult?.dataset.messageOne,
    other: archiveResult?.dataset.messageOther,
  };

  function showResult(n) {
    if (!archiveResult) return;
    if (n === -1) { archiveResult.innerHTML = ''; hide(archiveResult); return; }
    if (n === 0) archiveResult.innerHTML = messages.zero || '';
    else if (n === 1) archiveResult.innerHTML = messages.one || '';
    else archiveResult.innerHTML = (messages.other || '').replace(/\{n\}/, n);
    show(archiveResult);
  }

  function filter(tag) {
    if (!tag) {
      allTags.forEach(show);
      allPosts.forEach(show);
      showResult(-1);
      return;
    }
    allTags.forEach(hide);
    allPosts.forEach(hide);
    const sel = `[data-tag*="${CSS.escape(tag)}"]`;
    const matched = $$(`.archive${sel}`, root);
    $$(`.tag${sel}`, root).forEach(show);
    matched.forEach(show);
    showResult(matched.length);
  }

  searchInput?.addEventListener('keyup', () => filter((searchInput.value || '').toLowerCase()));
  form?.addEventListener('submit', (e) => e.preventDefault());
}
