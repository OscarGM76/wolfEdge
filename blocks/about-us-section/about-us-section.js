import { decorateBlock } from '../../scripts/aem.js';

const getClassIdentifier = (texto) => {
  const regex = /classIdentifier\s*=\s*["“”'‘’]([^"“”'‘’]+)["“”'‘’]/;
  const match = texto.match(regex);
  return match ? match[1] : null;
};

export default function decorate(block) {
  try {
    block.querySelectorAll('div.about-us-section > div > div').forEach((item,i) => {
      const texts = item.querySelectorAll('div p');
      let identifireElement = null;
      texts.forEach((element) => {
        const isIdentifire = element.innerHTML.includes('classIdentifier');
        if (isIdentifire) {
          identifireElement = getClassIdentifier(element.innerHTML);
          element.remove();
        } else {
          element.classList.add(identifireElement);
        }
      });
      decorateBlock(item);
    });
  } catch (error) {
    throw new Error(error);
  }
}
