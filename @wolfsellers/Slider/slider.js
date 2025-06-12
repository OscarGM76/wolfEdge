import { h } from '@dropins/tools/preact.js';
import { useEffect, useMemo, useRef, useState } from '@dropins/tools/preact-hooks.js';
import htm from 'htm';
import { loadEmblaScriptEmblaCarousel } from '../../scripts/utils/helpers.js';
import useWindowSize from '../../scripts/hooks/useWindowsSize.js';

const html = htm.bind(h);

const Slider = (props) => {
  const { items, showRows, showDots, breakpoints } = props;
  const emblaRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const dotsWrapperRef = useRef(null);
  const [emblaInstanceRef, setEmblaInstanceRef] = useState(null);
  const [currentSlidesToScroll, setSlidesToScroll] = useState(1);

  const { size } = useWindowSize();

  const showDotsAndArrows = useMemo(() => {
    if (size.width >= 1024) return false;
    return true;
  }, [size]);

  const options = useMemo(() => {
    const configurableOptions = {
      slidesToScroll: 1,
      loop: true,
      breakpoints,
    };
    if (!breakpoints) {
      configurableOptions.breakpoints = {
        '(min-width: 1024px)': { loop: false, active: false, slidesToScroll: 4 },
        '(min-width: 768px)': { loop: true, active: true, slidesToScroll: 3 },
      };
    } else {
      configurableOptions.breakpoints = breakpoints;
    }
    return configurableOptions;
  }, [breakpoints, emblaRef]);

  const getBreakPointSize = (breakpoint) => {
    const match = breakpoint.match(/\(min-width:\s*(\d+)px\)/);
    const pixels = parseInt(match[1], 10);
    return pixels;
  };

  useEffect(() => {
    const slideElements = emblaRef.current?.querySelectorAll('.embla__slide');
    if (!slideElements) return;
    const { width } = size;
    const breakpoints = Object.entries(options.breakpoints || {});
    let selected = null;
    let maxMatched = 0;
    for (const [breakpoint, data] of breakpoints) {
      const bpSize = getBreakPointSize(breakpoint);
      if (width > bpSize && bpSize > maxMatched) {
        selected = data;
        maxMatched = bpSize;
      }
    }
    if (selected) {
      const flexBasis = (100 / selected.slidesToScroll).toFixed(2);
      slideElements.forEach((slide) => {
        slide.style.flex = `0 0 ${flexBasis}%`;
      });
      setSlidesToScroll(selected.slidesToScroll);
    } else {
      slideElements.forEach((slide) => {
        slide.style.flex = '0 0 100%';
      });
      setSlidesToScroll(1);
    }
  }, [emblaRef.current, size, options]);

  useEffect(() => {
    if (emblaInstanceRef) {
      const slidesCount = emblaInstanceRef.slideNodes().length;
      const numberOfDots = Math.ceil(slidesCount / currentSlidesToScroll);
      if (dotsWrapperRef.current) {
        dotsWrapperRef.current.innerHTML = '';
        for (let i = 0; i < numberOfDots; i++) {
          const dot = document.createElement('button');
          dot.className = 'dot';
          dot.dataset.index = i;
          dot.addEventListener('click', () => emblaInstanceRef.scrollTo(i));
          dotsWrapperRef.current.appendChild(dot);
        }
      }

      emblaInstanceRef.on('select', () => {
        const selectedIndex = emblaInstanceRef.selectedScrollSnap();
        if (dotsWrapperRef.current) {
          const dots = dotsWrapperRef.current.querySelectorAll('.dot');
          dots.forEach((dot, i) => {
            dot.classList.toggle('is-selected', i === selectedIndex);
          });
        }
      });
      emblaInstanceRef.emit('select');
    }
  }, [emblaInstanceRef, currentSlidesToScroll]);

  useEffect(() => {
    loadEmblaScriptEmblaCarousel().then((EmblaCarousel) => {
      if (!emblaRef.current) return;
      const embla = EmblaCarousel(emblaRef.current, options);
      setEmblaInstanceRef(embla);
      if (prevBtnRef.current) {
        prevBtnRef.current.addEventListener('click', () => embla.scrollPrev());
      }
      if (nextBtnRef.current) {
        nextBtnRef.current.addEventListener('click', () => embla.scrollNext());
      }
    });
  }, [emblaRef, options]);

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
