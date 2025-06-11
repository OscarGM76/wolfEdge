/* eslint-disable indent */
import { toBase64Image } from '../../scripts/utils/helpers.js';
import OurClients from '../../@wolfsellers/OurClients/ourClients.js';
import { render, h } from '@dropins/tools/preact.js';

export default async function decorate(block) {
    try {
        console.log('block',block);
        
        const ourClientsSectionWrapper = document.querySelector('main .our-clients-section-wrapper');
        const ourClientsStructure = `
            <div class='ourClientsContainer'>
                <div class='our-clients-section-title-container'></div>
                <div class='our-clients-section-subtitle-container'></div>
                <div class='our-clients-section-conent'></div>
            </div>
        `;
        const paragraphs = block.querySelectorAll('.our-clients-section p');
        const target = Array.from(paragraphs).find(p => p.innerHTML.includes('classIdentifier=”background-section”'));
        const bgParent = target.parentElement;
        const imageBg = bgParent.querySelector('picture img');
        const bgBase64 = await toBase64Image(imageBg);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = ourClientsStructure;
        const title = block.querySelector('div.our-clients-section h1');
        const subtitle = block.querySelector('div.our-clients-section h2');
        title.classList.add('our-clients-section-title');
        subtitle.classList.add('our-clients-section-subtitle');
        const ourClientsContainer = wrapper.querySelector('.ourClientsContainer');
        ourClientsContainer.style.backgroundImage = `url(${bgBase64})`;
        const ourClientsSectionTitle = wrapper.querySelector('.our-clients-section-title-container');
        const ourClientsSectionSubitle = wrapper.querySelector('.our-clients-section-subtitle-container');
        ourClientsSectionTitle.append(title);
        ourClientsSectionSubitle.append(subtitle);

        const imagesList = {};
        await Promise.all(
            Array.from(block.querySelectorAll('div.our-clients-section > div > div')).map(async (item) => {
                const hasImages = item.querySelectorAll('p picture');
                if (!hasImages.length) {
                    const text = item?.querySelector('p')?.innerHTML;
                    if (text) {
                        imagesList[text] = [];
                        return { type: text, images: [] };
                    }
                }
                const previousItem = item.previousElementSibling;
                const typeText = previousItem?.querySelector('p')?.innerHTML;
                if (!typeText) return null;
                const promises = Array.from(hasImages).map(async (element) => {
                    const img = element?.querySelector('img');
                    if (img) {
                        const base64 = await toBase64Image(img);
                        return base64;
                    }
                });
                const imagesBase64 = (await Promise.all(promises)).filter(Boolean);
                if (!imagesList[typeText]) {
                    imagesList[typeText] = [];
                }
                imagesList[typeText].push(...imagesBase64);
                return { type: typeText, images: imagesBase64 };
            }),
        );
        const ourClientsSectionConent = wrapper.querySelector('.our-clients-section-conent');
        render(h(OurClients,{ clients: imagesList }), ourClientsSectionConent);
        ourClientsSectionWrapper.innerHTML = '';
        ourClientsSectionWrapper.append(wrapper);
    } catch (error) {
        console.log('error', error);
    }
}
