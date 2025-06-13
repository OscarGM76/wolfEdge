import { decorateBlock } from '../../scripts/aem.js';


export default function decorate(block) {
  try {
    const heroBannerSecondColumn = document.querySelector('.heroBannerSecondColumn');
    const heroBannerFirstColumnText = document.querySelector('.heroBannerFirstColumnText');
    const parent = document.querySelector('.hero-banner-content-wrapper');
    const picture = block.querySelector('div.hero-banner-content > div > div > picture');
    picture.classList.add('hero-banner-content-picture');
    heroBannerSecondColumn.append(picture);
    block.querySelectorAll('div.hero-banner-content > div > div').forEach((item) => {
      const blockName = 'hero-banner-content-text';
      item.classList.add(blockName);
      decorateBlock(item);
    });
    heroBannerFirstColumnText.append(block);
    parent.remove();
  } catch (error) {
    console.log('error', error);
  }
}
