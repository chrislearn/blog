import { $$ } from './utils.js';

// Animate tabs of tabbed code blocks.
export function initTabbedCodeBlocks() {
  $$('.codeblock--tabbed .tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const codeblock = tab.closest('.codeblock--tabbed');
      if (!codeblock) return;
      const contents = codeblock.querySelectorAll('.tabs-content > pre, .tabs-content > .highlight');
      Array.from(tab.parentElement.children).forEach((sibling) => sibling.classList.remove('active'));
      tab.classList.add('active');
      const index = Array.from(tab.parentElement.children).indexOf(tab);
      contents.forEach((c, i) => { c.style.display = i === index ? '' : 'none'; });
    });
  });
}
