import { $$, debounce } from './utils.js';

// Resize all images of an image-gallery so they cover their photo box.
export function initImageGallery() {
  const images = $$('.photo-box img');
  if (!images.length) return;

  function resizeImages() {
    images.forEach((img) => {
      const link = img.parentElement;
      const box = link?.parentElement;
      if (!link || !box) return;
      const photoBoxWidth = box.offsetWidth;
      const photoBoxHeight = box.clientHeight;
      let imageWidth = img.offsetWidth;
      let imageHeight = img.offsetHeight;

      if (imageHeight < photoBoxHeight) {
        const ratio = imageWidth / imageHeight;
        const newWidth = photoBoxHeight * ratio;
        img.style.height = photoBoxHeight + 'px';
        img.style.width = newWidth + 'px';
        link.style.left = '-' + (newWidth / 2 - photoBoxWidth / 2) + 'px';
      }

      imageWidth = img.offsetWidth;
      imageHeight = img.offsetHeight;

      if (imageWidth < photoBoxWidth) {
        const ratio = imageHeight / imageWidth;
        const newHeight = photoBoxWidth * ratio;
        img.style.width = photoBoxWidth + 'px';
        img.style.height = newHeight + 'px';
        link.style.top = '-' + (imageHeight / 2 - photoBoxHeight / 2) + 'px';
      }

      if (imageHeight > photoBoxHeight) {
        link.style.top = '-' + (imageHeight / 2 - photoBoxHeight / 2) + 'px';
      }
    });
  }

  // Wait until images are loaded so dimensions are valid.
  const ready = images.map((img) =>
    img.complete ? Promise.resolve() : new Promise((res) => img.addEventListener('load', res, { once: true })),
  );
  Promise.all(ready).then(resizeImages);
  window.addEventListener('resize', debounce(resizeImages, 100));
}
