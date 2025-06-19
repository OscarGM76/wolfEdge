import { render, h } from "@dropins/tools/preact.js";
import ViewMoreButton from "../ViewMoreButton/viewMoreButton.js";
import TabOptions from "../tab-options/tab-options.js";

export default function decorate(block) {
  try {
    const arraySectionHead = document.querySelectorAll(
      "div.consultoria-ecommerce-container > div > div"
    );
    const arraySectionTab = document.querySelectorAll(
      "div.tab-option-container > div > div"
    );
    const arrayTabs = Array.from(
      document.querySelectorAll(".tab-option-container")
    )
      .map((container) => {
        return container.querySelector(
          'div[class^="tab-options-"][class$="-wrapper"] > .block'
        );
      })
      .filter(Boolean);
    const arrayButton = document.querySelectorAll("div.section a.button");

    const addClass = (array) => {
      array.forEach((block) => {
        const rowChildren = Array.from(block.children);
        rowChildren.forEach((row, rowIndex) => {
          const className = `rowClass_${rowIndex + 1}`;
          row.classList.add(className);

          const columnChildren = Array.from(row.children);
          columnChildren.forEach((column, columnIndex) => {
            const className = `columnClass_${columnIndex + 1}`;
            column.classList.add(className);
          });
        });
      });
    };

    if (arraySectionHead?.length > 0) {
      addClass(arraySectionHead);
    }

    if (arraySectionTab?.length > 0) {
      addClass(arraySectionTab);
    }

    if (arrayTabs?.length > 0) {
      TabOptions({ arrayTabs });
    }

    if (arrayButton?.length > 0) {
      arrayButton.forEach((btn) => {
        const newContainer = document.createElement("div");
        const linkHref = btn?.getAttribute("href");
        const linkText = btn?.innerHTML;
        btn.parentElement.replaceChildren(newContainer);
        render(
          h(ViewMoreButton, {
            text: linkText,
            href: linkHref,
          }),
          newContainer
        );
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}
