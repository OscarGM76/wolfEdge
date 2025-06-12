export default function decorate(block) {
  try {
    block.querySelectorAll('.cloud-body > div').forEach((item, index) => {
      item.classList.add('cloud-layout');
      if(index === 0) {
        item.classList.add('banner');
      }
    });
    document.getElementById("descubre-el-inmenso-potencial").parentElement.classList.add('cloud-test');

  } catch (error) {
    throw new Error(error);
  }
}
