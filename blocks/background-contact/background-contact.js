import { render, h } from "@dropins/tools/preact.js";
import ViewMoreButton from "../ViewMoreButton/viewMoreButton.js";

export default function decorate(block) {
  try {
    const arrayButton = block.querySelectorAll("a.button");

    const addClass = (content) => {
      const rowChildren = Array.from(content.children);
      rowChildren.forEach((row, rowIndex) => {
        const className = `rowClass_${rowIndex + 1}`;
        row.classList.add(className);

        const columnChildren = Array.from(row.children);
        columnChildren.forEach((column, columnIndex) => {
          const className = `columnClass_${columnIndex + 1}`;
          column.classList.add(className);
        });
      });
    };

    if (block) {
      addClass(block);
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
