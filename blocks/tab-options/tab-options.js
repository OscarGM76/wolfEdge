import { h, render } from "@dropins/tools/preact.js";
import { useState, useEffect, useRef } from "@dropins/tools/preact-hooks.js";
import htm from "htm";

const html = htm.bind(h);

const TabOptions = ({ listItems, tabIndex }) => {
  const [active, setActive] = useState(`${tabIndex}-0`);

  const containerRef = useRef(null);

  // Function to change option and add hash
  const handleOnClick = ({ index, tabIndex, item }) => {
    setActive(`${tabIndex}-${index}`);
    const hash = item?.toLowerCase()?.replace(/ /g, "-");
    history.pushState(null, "", `#${hash}`);
  };

  // Function to select the component to display
  useEffect(() => {
    if (!containerRef.current) return;

    const section = containerRef.current.closest("div.section");
    if (!section) return;

    section.classList.add("sectionTab");

    const options = section.querySelectorAll("div.tab-option-wrapper");
    options.forEach((option, index) => {
      const isActive = `${tabIndex}-${index}` === active;
      option.classList.toggle("tab-option-active", isActive);
    });
  }, [active]);

  return html`
    <div class="tab" ref=${containerRef}>
      ${listItems.map(
        (item, index) => html`
          <button
            class=${`btnTab btn_${index + 1} ${
              active === `${tabIndex}-${index}` ? "active" : ""
            }`}
            onClick=${() => handleOnClick({ index, tabIndex, item })}
          >
            ${item}
          </button>
        `
      )}
    </div>
  `;
};

export default function initTabOptions({ arrayTabs }) {
  if (!arrayTabs?.length) return;

  const filterTabs = Array.from(arrayTabs).filter((tab) =>
    Array.from(tab.classList).some(
      (cls) => cls.startsWith("tab-options") && !cls.endsWith("wrapper")
    )
  );

  filterTabs.forEach((tab, tabIndex) => {
    const listItems = Array.from(
      tab.querySelectorAll("div > div > ul > li")
    ).map((li) => li.textContent);

    // Create new container
    const container = document.createElement("div");
    container.className = "containerTabs";

    // Replace original tab with container
    tab.parentElement.replaceChild(container, tab);

    // Render component inside that container
    render(h(TabOptions, { listItems, tabIndex }), container);
  });
}
