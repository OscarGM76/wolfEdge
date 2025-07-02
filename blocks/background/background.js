export default function decorate(block) {
  let backgroundProperties = {
    'backgroundColor' : null,
    'backgroundImage' : null,
    'backgroundPosition' : null,
    'backgroundRepeat' : null,
    'backgroundSize' : null,
  };
  const classList = block.classList;
  classList.remove('background', 'block');
  const selector = document.querySelector("."+block.classList[0]);
  if(selector) {
    const options = block.querySelectorAll(':scope > div');
    options.forEach((element) => {
      const index = element.querySelectorAll(':scope > div:first-child p')[0]?.innerHTML;
      let value = element.querySelectorAll(':scope > div:last-child p')[0]?.innerHTML;
      if (backgroundProperties.hasOwnProperty(index)) {
        if (index === "backgroundImage") {
          value = element.querySelectorAll(':scope > div:last-child img')[0].getAttribute("src");
        }
        backgroundProperties[index] = index === "backgroundImage" ? `url(${value})` : value
      }
    });
    Object.assign(selector.style, backgroundProperties);
  }
  else {
    console.warn("Background Component: Class selector not found!");
  }
  block.parentElement.remove();
}
