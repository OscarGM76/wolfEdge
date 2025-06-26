import { decorateBlock } from "../../scripts/aem.js";
import ViewMoreButton from "../ViewMoreButton/viewMoreButton.js";
import { render, h } from "@dropins/tools/preact.js";

const getClassIdentifier = (texto) => {
  const regex = /classIdentifier\s*=\s*["“”'‘’]([^"“”'‘’]+)["“”'‘’]/;
  const match = texto.match(regex);
  return match ? match[1] : null;
};

export default function decorate(block) {
  try {
    const container = block.querySelectorAll(
      "div.about-us-section  > div > div"
    );
    const arrayButton = block.querySelectorAll("div.about-us-section a.button");

    container.forEach((item, i) => {
      const texts = item.querySelectorAll("div p");
      let identifireElement = null;
      texts.forEach((element) => {
        const isIdentifire = element.innerHTML.includes("classIdentifier");
        if (isIdentifire) {
          identifireElement = getClassIdentifier(element.innerHTML);
          element.remove();
        } else {
          element.classList.add(identifireElement);
        }
      });
      decorateBlock(item);
    });

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
