/* eslint-disable indent */
import Slider from '../Slider/slider.js';
import { render, h } from '@dropins/tools/preact.js';
import htm from 'htm';

const html = htm.bind(h);

const structure = `
    <div class="sliderImagesContainerHome">
    </div>
`;

export default async function decorate(block) {
    try {
        const sliderImagesWrapper = document.querySelector('.slider-images-wrapper');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = structure;
        const sliderImagesContainerHome = wrapper.querySelector('.sliderImagesContainerHome');
        const sliderItems = [];
        const sliderBannersHome = block.querySelectorAll('div.slider-images.block > div');
        Array.from(sliderBannersHome).forEach((element) => {
            const picture = element.querySelector('picture');
            const source = picture?.querySelector('source');
            const img = picture?.querySelector('img');
            if (picture) {
                sliderItems.push(html`
                    <div class="item-slider-row-picture">
                        <picture>
                            ${source && html`<source srcset=${source.getAttribute('srcset')} type=${source.getAttribute('type')} />`}
                            ${img && html`<img src=${img.getAttribute('src')} alt=${img.getAttribute('alt')} />`}
                        </picture>
                      </div>
                  `);
            }
        });
        sliderImagesWrapper.replaceChildren(wrapper);
        render(h(Slider, {
            items: sliderItems,
            showArrows: false,
            showDots: true,
        }), sliderImagesContainerHome);
    } catch (error) {
        console.log('error', error);
    }
}
