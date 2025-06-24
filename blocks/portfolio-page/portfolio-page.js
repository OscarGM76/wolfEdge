import ViewMoreButton from "../ViewMoreButton/viewMoreButton.js";
import { render, h } from "@dropins/tools/preact.js";

export default function decorate(block) {
  try {
    const arrayContainer = document.querySelectorAll(
      "div.portfolio-page-container > div > div"
    );
    const arrayButton = document.querySelectorAll("div.carousel-container a");

    const addClass = (array) => {
      array.forEach((block, indexBlock) => {
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

    if (arrayContainer?.length > 0) {
      addClass(arrayContainer);
    }

    if (arrayButton?.length > 0) {
      arrayButton.forEach((btn, index) => {
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
