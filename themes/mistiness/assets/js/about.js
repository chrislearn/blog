import { $, $$, fadeIn, fadeOut } from './utils.js';

// Show the "about" card when an `#about` link is clicked.
export function initAboutCard() {
  const about = $('#about');
  const aboutCard = $('#about-card');
  const blog = $('#blog');
  if (!about || !aboutCard || !blog) return;

  const openBtns = $$("#sidebar a[href*='#about'], #header a[href*='#about']");
  const closeBtn = $('#about-btn-close');

  function dropAboutCard() {
    const cardHeight = aboutCard.offsetHeight;
    let offsetTop = window.innerHeight / 2 - cardHeight / 2 + cardHeight;
    if (cardHeight + 30 > window.innerHeight) offsetTop = cardHeight;
    aboutCard.style.top = '-' + cardHeight + 'px';
    aboutCard.style.display = '';
    requestAnimationFrame(() => {
      aboutCard.style.transition = 'top 500ms ease';
      aboutCard.style.top = offsetTop - cardHeight + 'px';
    });
  }

  function liftAboutCard() {
    aboutCard.style.transition = 'top 500ms ease';
    aboutCard.style.top = '-' + aboutCard.offsetHeight + 'px';
    setTimeout(() => {
      aboutCard.style.display = 'none';
      aboutCard.removeAttribute('style');
    }, 500);
  }

  function play() {
    fadeOut(blog);
    fadeIn(about);
    setTimeout(dropAboutCard, 300);
  }

  function playBack() {
    liftAboutCard();
    setTimeout(() => fadeIn(blog), 500);
    setTimeout(() => fadeOut(about), 500);
  }

  openBtns.forEach((btn) => btn.addEventListener('click', (e) => { e.preventDefault(); play(); }));
  closeBtn?.addEventListener('click', (e) => { e.preventDefault(); playBack(); });
}
