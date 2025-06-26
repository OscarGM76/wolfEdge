import { loadFragment } from "../fragment/fragment.js";

export default async function decorate(block) {
  try {
    const contentFragment = document.querySelector(
      "div.carousel-container div.carousel.fragment"
    );
    const arraySectionLink = contentFragment.querySelectorAll("a");

    if (arraySectionLink?.length <= 0) return;

    arraySectionLink?.forEach(async (link) => {
      if (!link) return;
      const path = link
        ? link.getAttribute("href")
        : contentFragment.textContent.trim();

      const fragment = await loadFragment(path);
      if (fragment) {
        const fragmentSection = fragment.querySelector(":scope .section");
        if (fragmentSection) {
          link.closest(".section").classList.add(...fragmentSection.classList);
          link.closest(".button-container").replaceWith(...fragment.childNodes);
        }
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}
