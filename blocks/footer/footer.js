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

  // thi is function add tel 
  const contentLink = block.querySelectorAll('div a')
  contentLink.forEach((link, index) => {
    if(!link) return
    const linkValidation = link.getAttribute('href')

      const linkValidationSocialNetwork = link.getAttribute('title')
    console.log(linkValidationSocialNetwork, 'linkValidationSocialNetwork');
    
    const match = linkValidation.match(/\+(\d+)/)

    const matchEmail = linkValidation.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)

    const socialMatch = linkValidationSocialNetwork.match(/facebook|linkedin|twitter|instagram|tiktok/i)
    

    if(matchEmail){
      const getEmail = matchEmail[1]
      const href = `mailto:${getEmail}`
      console.log(href, "href");
      link.setAttribute('href', href)
      link.removeAttribute('target')
    }

    if(match){
      const getNumber = match[1]
      const href = `tel:${getNumber}`
      console.log(href, "href");
      link.setAttribute('href', href)
      link.removeAttribute('target')
    }

    if (socialMatch) {
    const platform = socialMatch[0].toLowerCase()
    let href = ''

    switch (platform) {
      case 'facebook':
        href = 'https://www.facebook.com/wolfsellers/'
        break
      case 'instagram':
        href = 'https://www.instagram.com/wolfsellers'
        break
      case 'linkedin':
        href = 'https://mx.linkedin.com/company/wolf-sellers'
        break
      case 'twitter':
        href = 'https://twitter.com/wolf_sellers'
        break
      case 'tiktok':
        href = 'https://www.tiktok.com/@wolf.sellers'
        break
    }

    if (href) {
      link.setAttribute('href', href)
      link.removeAttribute('target')
    }
  }
    
  })

  console.log(block, "block");

   console.log(contentLink, "contenLink");
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
