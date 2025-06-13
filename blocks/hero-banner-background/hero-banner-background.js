import { toBase64Image } from '../../scripts/utils/helpers.js';

export default function decorate(block) {
  try {
    const heroContainer = document.querySelector('.section.hero-container');
    const picture = block.querySelector('div.hero-banner-background > div > div > picture');
    const img = picture?.querySelector('img');
    toBase64Image(img).then((base64) => {
      heroContainer.style.backgroundImage = `url(${base64})`;
      heroContainer.style.backgroundRepeat = 'no-repeat';
      heroContainer.style.backgroundSize = 'contain';
      heroContainer.style.padding = '1rem';
    }).catch(console.error);
    block.remove();
  } catch (error) {
    console.log('error', error);
  }
}
