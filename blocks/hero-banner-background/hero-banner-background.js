import { decorateBlock } from '../../scripts/aem.js';

function toBase64Image(imgElement) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };

    img.onerror = function () {
      reject('Error loading image');
    };
  
    img.src = imgElement.src;
  });
}

export default function decorate(block) {
  try {
    const heroContainer = document.querySelector('#heroBannerContainer');
    const picture = block.querySelector('div.hero-banner-background > div > div > picture');
    const img = picture?.querySelector('img');
    toBase64Image(img).then((base64) => {
      heroContainer.style.backgroundImage = `url(${base64})`;
    }).catch(console.error);
    block.remove();
  } catch (error) {
    console.log('error', error);
  }
}
