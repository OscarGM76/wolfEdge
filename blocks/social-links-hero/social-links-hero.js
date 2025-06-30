import SocialLinks from './SocialLinks/socialLinks.js';
import { render, h } from '@dropins/tools/preact.js';
import htm from 'htm';

const html = htm.bind(h)

export default function decorate(block) {
  try {
    const socialLinksList = [];
    const heroBannerFirstColumnSocialLinks = document.querySelector('.heroBannerFirstColumnSocialLinks');
    const socialLinksHero = block.querySelectorAll('div.social-links-hero.block > div');
    Array.from(socialLinksHero).forEach((element) => {
      const link = element.querySelector('p')?.textContent?.trim();
      const picture = element.querySelector('picture');
      const img = picture?.querySelector('img');

      const altText = img?.getAttribute('alt')?.trim();
      const label = altText && altText.length > 0 ? altText : 'Enlace a red social';
      socialLinksList.push(html`
        <div>
            <a href=${link} aria-label=${label}>
                ${img && html`<img src=${img?.getAttribute('src')} alt=${label} />`}
            </a>
        </div>
    `);
    });
    render(h(SocialLinks, { links: socialLinksList }), heroBannerFirstColumnSocialLinks);
    block.remove();
  } catch (error) {
    throw new Error(error);
  }
}
