import SocialLinks from '../../@wolfsellers/SocialLinks/socialLinks.js';
import { render, h } from '@dropins/tools/preact.js';
import htm from 'htm';

const html = htm.bind(h)

export default function decorate(block) {
  try {
    const socialLinksList = [];
    const heroBannerFirstColumnSocialLinks = document.querySelector('.heroBannerFirstColumnSocialLinks');
    const socialLinksHero = block.querySelectorAll('div.social-links-hero.block > div');
    Array.from(socialLinksHero).forEach((element) => {
      const link = element.querySelector('p').innerHTML;
      const picture = element?.querySelector('picture');
      const img = picture?.querySelector('img');
      socialLinksList.push(html`
        <div>
            <a href=${link}>
                ${img && html`<img src=${img.getAttribute('src')} alt=${img.getAttribute('alt')} />`}
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
