import ViewMoreButton from "../ViewMoreButton/viewMoreButton.js";
import { render, h } from '@dropins/tools/preact.js';

/* eslint-disable indent */
export default function decorate() {
    try {
      document.querySelectorAll('div.custom-banner-row-cols-full-screen.block > div > div').forEach((element,i) => {
        element.classList.add(`custom-banner-row-full-screen-${i + 1}`);
        element.querySelectorAll('a').forEach((link) => {
            const href = link.getAttribute('href');
            const linkText = link.innerHTML;
            link.innerHTML = '';
            render(h(ViewMoreButton, {
                text: linkText,
                href,
              }), link.parentElement);
              link.remove();
        });
      });
    } catch (error) {
      console.log('error', error);
    }
  }
