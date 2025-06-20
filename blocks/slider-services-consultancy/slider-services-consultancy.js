/* eslint-disable indent */
import { render, h } from '@dropins/tools/preact.js';
import htm from 'htm';
import Slider from '../Slider/slider.js';

const html = htm.bind(h);

const structure = `
    <div>
        <div class="titleSliderBannerServices"></div>
        <div class="contentSliderBannerServices"></div>
    </div>
`;

export default async function decorate(block) {
    try {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = structure;
        const titleSliderBannerServices = wrapper.querySelector('.titleSliderBannerServices');
        const contentSliderBannerServices = wrapper.querySelector('.contentSliderBannerServices');
        const sliderItems = [];
        const sliderBannersServices = block.querySelectorAll(':scope > div');
        const sectionTitle = block.querySelector('h1');
        titleSliderBannerServices.append(sectionTitle);
        Array.from(sliderBannersServices).forEach((element, i) => {
            const picture = element.querySelector('picture');
            const img = picture?.querySelector('img');
            const title = element.querySelector('h2')?.innerHTML;
            const link = element.querySelector('a');
            const linkHref = link?.getAttribute('href');
            const linkText = link?.innerHTML;
            if (picture || title || link) {
                sliderItems.push(html`
                    <div class="item-slider-row-service">
                      <div class="item-slider-row-titles-service">
                        <p>0${i}</p>
                        <h2>${title || ''}</h2>
                      </div>
                      <div class="item-slider-row-picture-service">
                      ${img && html`<img src=${img.getAttribute('src')} alt=${img.getAttribute('alt')} />`}
                      </div>
                      <div class="item-slider-row-link-service">
                        <a href=${linkHref}>${linkText || ''}</a>
                      </div>
                    </div>
                  `);
            }
        });
        block.replaceChildren(wrapper);
        render(h(Slider, {
            items: sliderItems,
            showArrows: true,
            showDots: true,
            breakpoints: {
                '(min-width: 1024px)': {
                    loop: true, active: false, slidesToScroll: 4, dots: true, arrows: true,
                },
                '(min-width: 768px)': {
                    loop: true, active: true, slidesToScroll: 3, dots: true, arrows: true,
                },
            },
        }), contentSliderBannerServices);
    } catch (error) {
        console.log('error', error);
    }
}
