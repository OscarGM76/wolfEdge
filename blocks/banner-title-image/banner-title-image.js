import { toBase64Image } from '../../scripts/utils/helpers.js';

export default async function decorate(block) {
  try {
    const backgroundContainer = document.querySelector('.section.banner-title-image-container');
    const background = Array.from(block.querySelectorAll('picture img')).pop();
    const bgBase64 = await toBase64Image(background);
    backgroundContainer.style.backgroundImage = `url(${bgBase64})`;
    backgroundContainer.style.backgroundRepeat = 'no-repeat';
    backgroundContainer.style.backgroundSize = 'contain';
    backgroundContainer.style.padding = '1rem';
    background.parentElement.remove();
  } catch (error) {
    throw new Error(error);
  }
}
