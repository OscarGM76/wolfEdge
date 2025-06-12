import { h } from '@dropins/tools/preact.js';
import { useEffect, useMemo, useRef } from '@dropins/tools/preact-hooks.js';
import htm from 'htm';
import { loadEmblaScriptEmblaCarousel } from '../../scripts/utils/helpers.js';
import useWindowSize from '../../scripts/hooks/useWindowsSize.js';

const html = htm.bind(h);

const Slider = (props) => {
  const { items, showRows, showDots } = props;
  const emblaRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const dotsWrapperRef = useRef(null);
  const emblaInstanceRef = useRef(null);

  const { size } = useWindowSize();

  const showDotsAndArrows = useMemo(() => {
    if (size.width >= 1024) return false;
    return true;
  }, [size]);

  useEffect(() => {
    loadEmblaScriptEmblaCarousel().then((EmblaCarousel) => {
      if (!emblaRef.current) return;

      const embla = EmblaCarousel(emblaRef.current, {
        loop: true,
        breakpoints: {
          '(min-width: 1024px)': { loop: false, active: false },
          '(min-width: 700px)': { loop: true, active: true, slidesToScroll: 1 },
          '(min-width: 480px)': { loop: true, active: true, slidesToScroll: 2 },
        },
      });
      emblaInstanceRef.current = embla;

      const slidesCount = embla.slideNodes().length;

      if (dotsWrapperRef.current) {
        dotsWrapperRef.current.innerHTML = '';
        for (let i = 0; i < slidesCount; i++) {
          const dot = document.createElement('button');
          dot.className = 'dot';
          dot.dataset.index = i;
          dot.addEventListener('click', () => embla.scrollTo(i));
          dotsWrapperRef.current.appendChild(dot);
        }
      }
      if (prevBtnRef.current) {
        prevBtnRef.current.addEventListener('click', () => embla.scrollPrev());
      }
      if (nextBtnRef.current) {
        nextBtnRef.current.addEventListener('click', () => embla.scrollNext());
      }

      embla.on('select', () => {
        const selectedIndex = embla.selectedScrollSnap();
        if (dotsWrapperRef.current) {
          const dots = dotsWrapperRef.current.querySelectorAll('.dot');
          dots.forEach((dot, i) => {
            dot.classList.toggle('is-selected', i === selectedIndex);
          });
        }
      });
      embla.emit('select');
    });
  }, [emblaRef]);

  return html`
    <div class="embla">
    <div class="embla__viewport" ref=${emblaRef}>
        <div class="embla__container">
        ${items.map((item) => html`<div class="embla__slide">${item}</div>`)}
        </div>
    </div>
    <button ref=${prevBtnRef} class=${`embla__button embla__button--prev ${showDotsAndArrows && showRows ? '' : 'hide_items_slider'}`}>‹</button>
    <button ref=${nextBtnRef} class=${`embla__button embla__button--next ${showDotsAndArrows && showRows ? '' : 'hide_items_slider'}`}>›</button>
    <div ref=${dotsWrapperRef} class=${`embla__dots ${showDotsAndArrows && showDots ? '' : 'hide_items_slider'}`}></div>
    </div>
    `;
};

export default Slider;
