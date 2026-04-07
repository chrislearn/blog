import { $$, debounce } from './utils.js';

// Resize Hugo/Chroma code blocks (figure.highlight) to fit the screen width.
export function initCodeBlockResizer() {
  const blocks = $$('figure.highlight');
  if (!blocks.length) return;

  function resize() {
    blocks.forEach((block) => {
      const gutter = block.querySelector('.gutter');
      const code = block.querySelector('.code');
      if (!code) return;
      const codeStyle = window.getComputedStyle(code);
      const codePaddingLeft = parseFloat(codeStyle.paddingLeft) || 0;
      const codePaddingRight = parseFloat(codeStyle.paddingRight) || 0;
      const gutterWidth = gutter ? gutter.offsetWidth : 0;
      const width = block.offsetWidth - gutterWidth - codePaddingLeft - codePaddingRight;
      code.style.width = width + 'px';
      const pre = code.querySelector('pre');
      if (pre) pre.style.width = width + 'px';
    });
  }

  resize();
  window.addEventListener('resize', debounce(resize, 100));
}
