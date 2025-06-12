/* eslint-disable indent */
import Slider from '../../@wolfsellers/Slider/slider.js';
import ViewMoreButton from '../../@wolfsellers/ViewMoreButton/viewMoreButton.js';
import { render, h } from '@dropins/tools/preact.js';
import htm from 'htm';

const html = htm.bind(h);

const structure = `
    <div>
        <div class="titleSliderBannerHome"></div>
        <div class="contentSliderBannerHome"></div>
        <div class="viewMoreSliderBannerHome"></div>
    </div>
`;

export default async function decorate(block) {
    try {
        const sliderBannerHomeWrapper = document.querySelector('.slider-banners-home-wrapper');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = structure;
        const titleSliderBannerHome = wrapper.querySelector('.titleSliderBannerHome');
        const contentSliderBannerHome = wrapper.querySelector('.contentSliderBannerHome');
        const viewMoreSliderBannerHome = wrapper.querySelector('.viewMoreSliderBannerHome');
        const sliderItems = [];
        const sliderBannersHome = block.querySelectorAll('div.slider-banners-home.block > div');
        const sectionTitle = block.querySelector('div.slider-banners-home.block h1');
        const links = block.querySelectorAll('div.slider-banners-home.block a');
        const viewMoreButton = links[links.length - 1];
        titleSliderBannerHome.append(sectionTitle);
        render(h(ViewMoreButton, {
            text: viewMoreButton?.innerHTML,
        }), viewMoreSliderBannerHome);
        Array.from(sliderBannersHome).slice(1, sliderBannersHome.length - 1).forEach((element) => {
            const picture = element.querySelector('picture');
            const source = picture?.querySelector('source');
            const img = picture?.querySelector('img');
            const title = element.querySelector('h2')?.innerHTML;
            const subtitle = element.querySelector('h3')?.innerHTML;
            const description = element.querySelector('p')?.innerHTML;
            const link = element.querySelector('a');
            const linkHref = link?.getAttribute('href');
            const linkText = link?.innerHTML;
            if (picture || title || link || subtitle) {
                sliderItems.push(html`
                    <div class="item-slider-row">
                      <div class="item-slider-row-titles">
                        <h2>${title || ''}</h2>
                        <h3>${subtitle || ''}</h3>
                      </div>
                      <div class="item-slider-row-text">
                        <p>${description || ''}</p>
                      </div>
                      <div class="item-slider-row-picture">
                        <picture class="picture-slider-baner">
                            ${source && html`<source srcset=${source.getAttribute('srcset')} type=${source.getAttribute('type')} />`}
                            ${img && html`<img src=${img.getAttribute('src')} alt=${img.getAttribute('alt')} />`}
                        </picture>
                      </div>
                      <div class="item-slider-row-link">
                        <a href=${linkHref}>${linkText || ''}</a>
                      </div>
                    </div>
                  `);
            }
        });
        sliderBannerHomeWrapper.replaceChildren(wrapper);
        render(h(Slider, {
            items: sliderItems,
            showRows: false,
            showDots: true,
        }), contentSliderBannerHome);
    } catch (error) {
        console.log('error', error);
    }
}
