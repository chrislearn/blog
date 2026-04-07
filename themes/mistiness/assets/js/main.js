import { ready } from './utils.js';
import { initSidebar } from './sidebar.js';
import { initHeader } from './header.js';
import { initPostBottomBar } from './post-bottom-bar.js';
import { initShareOptions } from './share-options.js';
import { initCodeBlockResizer } from './codeblock-resizer.js';
import { initTabbedCodeBlocks } from './tabbed-codeblocks.js';
import { initImageGallery } from './image-gallery.js';
import { initZoom } from './zoom.js';
import { initAboutCard } from './about.js';
import { initArchivesFilter } from './archives-filter.js';
import { initCategoriesFilter } from './categories-filter.js';
import { initTagsFilter } from './tags-filter.js';

ready(() => {
  initSidebar();
  initHeader();
  initPostBottomBar();
  initShareOptions();
  initCodeBlockResizer();
  initTabbedCodeBlocks();
  initImageGallery();
  initZoom();
  initAboutCard();
  initArchivesFilter();
  initCategoriesFilter();
  initTagsFilter();
});
