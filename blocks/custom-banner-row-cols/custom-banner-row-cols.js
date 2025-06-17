export default function decorate(block) {
  try {
    document.querySelectorAll('div.custom-banner-row-cols.block > div > div').forEach((element,i) => {
      element.classList.add(`custom-banner-row-${i + 1}`);
    });
  } catch (error) {
    console.log('error', error);
  }
}
