import { decorateBlock } from '../../scripts/aem.js';

export default function decorate(block) {
  try {
    block.querySelectorAll('div.hero-banner-content > div > div').forEach((item) => {
      const picture = item.querySelector('div > picture');
      const blockName = picture ? 'hero-banner-content-picture' : 'hero-banner-content-text';
      item.classList.add(blockName);
      decorateBlock(item);
    });
    const middleContentBanner = document.querySelector('#middleContentBanner');
    middleContentBanner.append(block);
  } catch (error) {
    console.log('error', error);
  }
}
