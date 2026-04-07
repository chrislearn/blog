import { $, $$, show, hide } from './utils.js';

// Filter posts by category on the /categories page.
export function initCategoriesFilter() {
  const root = $('#categories-archives');
  if (!root) return;

  const form = $('#filter-form', root);
  const searchInput = $('input[name=category]', root);
  const archiveResult = $('.archive-result', root);
  const allPosts = $$('.archive', root);
  const allCategories = $$('.category-anchor', root);

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

  function showAll() {
    allCategories.forEach(show);
    allPosts.forEach(show);
    $$('.archive .archive-posts > .archive-post', root).forEach(show);
  }

  function hideAll() {
    allCategories.forEach(hide);
    allPosts.forEach(hide);
  }

  function filter(category) {
    if (!category) { showAll(); showResult(-1); return; }
    hideAll();
    const postSel = `.archive[data-category*="${CSS.escape(category)}"]`;
    const catSel = `.category-anchor[data-category*="${CSS.escape(category)}"]`;
    const matchedPosts = $$(postSel, root);
    const matchedCats = $$(catSel, root);

    matchedCats.forEach((cat) => {
      const parents = cat.dataset.parentCategories;
      if (!parents) return;
      parents.split(',').forEach((parent) => {
        const dataAttr = `[data-category="${CSS.escape(parent)}"]`;
        $$(`.category-anchor${dataAttr}`, root).forEach(show);
        $$(`.archive${dataAttr}`, root).forEach((p) => {
          show(p);
          p.querySelectorAll('.archive-posts > .archive-post').forEach(hide);
        });
      });
    });

    matchedCats.forEach(show);
    matchedPosts.forEach((p) => {
      show(p);
      p.querySelectorAll('.archive-posts > .archive-post').forEach(show);
    });
    showResult(matchedPosts.length);
  }

  searchInput?.addEventListener('keyup', () => filter((searchInput.value || '').toLowerCase()));
  form?.addEventListener('submit', (e) => e.preventDefault());
}
