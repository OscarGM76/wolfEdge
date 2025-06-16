import ViewMoreButton from '../ViewMoreButton/viewMoreButton.js';
import { render, h } from '@dropins/tools/preact.js';

export default function decorate() {
  try {
    const childs = document.querySelectorAll('div.experiences-banner-home.block > div > div');
    const titelCol = childs[0];
    const firstCol = childs[1];
    const secondtCol = childs[2];

    titelCol.classList.add('experiences-banner-home-titelCol-col');
    firstCol.classList.add('experiences-banner-home-first-col');
    secondtCol.classList.add('experiences-banner-home-second-col');

    Array.from(firstCol.children).forEach((element) => {
      if (element.tagName === 'H2') {
        element.classList.add('experiences-banner-home-title-first-col');
      }
      if (element.tagName === 'H3') {
        element.classList.add('experiences-banner-home-subtitle-first-col');
      }
      const picture = element.querySelector('picture');
      if (picture) {
        picture.classList.add('experiences-banner-home-picture-first-col');
      }
      if (element.tagName === 'P' && !element.querySelector('picture') && !element.querySelector('a')) {
        element.classList.add('experiences-banner-home-text-first-col');
      }
      const link = element.querySelector('a');
      if (link) {
        const newContainer = document.createElement('div');
        const linkHref = link?.getAttribute('href');
        const linkText = link?.innerHTML;
        link.parentElement.replaceChildren(newContainer);
        render(h(ViewMoreButton, {
          text: linkText,
          href: linkHref,
        }), newContainer);
      }
    });

    Array.from(secondtCol.children).forEach((element) => {
      if (element.tagName === 'H2') {
        element.classList.add('experiences-banner-home-title-second-col');
      }
      const picture = element.querySelector('picture');
      if (picture) {
        picture.parentElement.classList.add('experiences-banner-home-picture-second-col');
      }
      if (element.tagName === 'P' && !element.querySelector('picture') && !element.querySelector('a')) {
        element.classList.add('experiences-banner-home-text-second-col');
      }
      const link = element.querySelector('a');
      if (link) {
        element.classList.add('experiences-banner-home-link-second-col');
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}
