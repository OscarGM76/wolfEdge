import ViewMoreButton from '../../@wolfsellers/ViewMoreButton/viewMoreButton.js';
import { render, h } from '@dropins/tools/preact.js';

export default function decorate() {
  try {
    const childs = document.querySelectorAll('div.about-of-aec-banner.block > div > div');
    const firstCol = childs[0];
    const secondtCol = childs[1];

    firstCol.classList.add('about-of-aec-banner-picture-first-col');
    Array.from(secondtCol.children).forEach((element) => {
      if (element.tagName === 'H2') {
        element.classList.add('about-of-aec-banner-title-second-col');
      }
      const picture = element.querySelector('picture');
      if (picture) {
        picture.classList.add('about-of-aec-banner-picture-second-col');
      }
      if (element.tagName === 'P' && !element.querySelector('picture') && !element.querySelector('a')) {
        element.classList.add('about-of-aec-banner-text-second-col');
      }
      const link = element.querySelector('a');
      if (link) {
        const newContainer = document.createElement('div');
        const linkHref = link?.getAttribute('href');
        const linkText = link?.innerHTML;
        link.parentElement.replaceChildren(newContainer);
        render(h(ViewMoreButton, {
          text: linkText,
        }), newContainer);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}
