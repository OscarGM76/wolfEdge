import { decorateBlock } from '../../scripts/aem.js';



export default function decorate(block) {
  try {
    block.querySelectorAll('div.hero > div > div').forEach(item => {
      const picture = item.querySelector('div > picture');
      const blockName = picture ? 'picture-hero' : 'text-hero';
      item.classList.add(blockName);
      decorateBlock(item);
    });
    const heroBanner = document.querySelector('main div.hero-wrapper');
    const heroBannerStructure = `
      <div id='heroBannerContainer'>
        <div id='topContentBanner'>
        </div>
        <div id='middleContentBanner'>
        </div>
        <div id='bottomContentBanner'>
        </div>
      </div>
    `;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = heroBannerStructure;
    wrapper.querySelector('#topContentBanner').append(block);
    heroBanner.append(wrapper);
  } catch (error) {
    throw new Error(error);
  }
}
