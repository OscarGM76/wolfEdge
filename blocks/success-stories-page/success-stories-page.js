export default function decorate(block) {
  try {
    const arrayContainer = document.querySelectorAll(
      "div.success-stories-page-container > div > div"
    );

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

    if (arrayContainer?.length > 0) {
      addClass(arrayContainer);
    }
  } catch (error) {
    throw new Error(error);
  }
}
