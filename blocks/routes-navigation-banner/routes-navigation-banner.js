import { render, h } from '@dropins/tools/preact.js';
import ViewMoreButton from '../ViewMoreButton/viewMoreButton.js';
import DynamicBannerByRoute from '../dynamicBannerByRoute/dynamicBannerByRoute.js';

export default async function decorate() {
  try {
    const pathname = window?.location?.pathname?.split('/').pop();
    const listOfElemenst = document.querySelectorAll('.routes-navigation-banner.block > div');
    let sectionData = {};
    listOfElemenst.forEach((element) => {
      const divs = element.querySelectorAll('div');
      const firstDiv = Array.from(divs)?.slice(0)?.[0];
      const secondDiv = Array.from(divs)?.slice(-1)?.[0];
      const firstLink = firstDiv.querySelector('div a');
      const url = firstLink.getAttribute('href').split('/').pop();
      firstLink.remove();
      secondDiv.classList.add(url);
      const viewMoreContainer = secondDiv.querySelector('a');
      const secondLinkData = {};
      secondLinkData.href = viewMoreContainer.getAttribute('href');
      secondLinkData.text = viewMoreContainer.innerHTML;
      const newButtonContainer = document.createElement('div');
      render(h(ViewMoreButton, secondLinkData), newButtonContainer);
      viewMoreContainer.parentElement.replaceWith(newButtonContainer);
      sectionData = {
        ...sectionData,
        [url]: {
          content: secondDiv.innerHTML,
          linkText: firstLink.textContent,
        },
      };
    });
    const newContent = document.createElement('div');
    render(h(DynamicBannerByRoute, { pathname, content: sectionData }), newContent);
    document.querySelector('.routes-navigation-banner.block').replaceWith(newContent);
  } catch (error) {
    throw new Error(error);
  }
}
