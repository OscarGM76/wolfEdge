import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { getLanguage } from '../../scripts/wolfsellers.js';
/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const language = getLanguage();
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : `/${language}/footer`;
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.classList.add('footer-container');
  footer.classList.add('footer-background');

  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  // Group icon pairs + text in the social footer
const socialParagraph = footer.querySelector(
  '.secondcolumn > div > div:nth-of-type(1) > p:nth-of-type(2)'
);

if (socialParagraph) {
  const links = [...socialParagraph.querySelectorAll('a')];
  socialParagraph.innerHTML = ''; // clean to reinsert

  for (let i = 0; i < links.length; i += 2) {
    const wrapper = document.createElement('span');
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '0.25rem';
    wrapper.style.marginRight = '0.5rem';
    wrapper.style.whiteSpace = 'nowrap';

    wrapper.appendChild(links[i]);
    if (links[i + 1]) wrapper.appendChild(links[i + 1]); // text
    socialParagraph.appendChild(wrapper);
  }
}
}
