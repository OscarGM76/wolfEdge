export default function decorate(block) {
  let selector = null;
  let backgroundProperties = {
    'backgroundColor' : null,
    'backgroundImage' : null,
    'backgroundPosition' : null,
    'backgroundRepeat' : null,
    'backgroundSize' : null,
  };
  console.log("block", block);
  const options = block.querySelectorAll(':scope > div');
  console.log("options", options);
  options.forEach((element) => {
    console.log("element", element);
    const index = element.querySelectorAll(':scope > div:first-child p')[0]?.innerHTML;
    let value = element.querySelectorAll(':scope > div:last-child p')[0]?.innerHTML;
    console.log("index", index);
    console.log("value", value);
    if (index === "Class") {
      selector = document.querySelector("." + value);
    }
    if (index === "backgroundColor") {
      backgroundProperties.backgroundColor = value;
    }
    if (index === "backgroundImage") {
      value = element.querySelectorAll(':scope > div:last-child img')[0].getAttribute("src");
      backgroundProperties.backgroundImage = `url(${value})`;
    }
    if (index === "backgroundPosition") {
      backgroundProperties.backgroundPosition = value;
    }
    if (index === "backgroundRepeat") {
      backgroundProperties.backgroundRepeat = value;
    }
    if (index === "backgroundSize") {
      backgroundProperties.backgroundSize = value;
    }
    console.table(backgroundProperties);
  });
  Object.assign(selector.style, backgroundProperties);
  selector.classList.add("bg-test");
  block.remove();
}
