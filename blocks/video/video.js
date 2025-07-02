export default function decorate(block) {
  // eslint-disable-next-line no-console
 
  // Buscar el link en el primer div
  const paragraph = block.querySelector('p');

  console.log('Video link encontrado:', paragraph);
  // eslint-disable-next-line no-console

  const link = paragraph.innerHTML;

  console.log('test:', link);
  
  // Mostrar yen el bloque que se está cargando
  const testDiv = document.createElement('div');
  testDiv.innerHTML = `
    <iframe width="1166" height="680" src="${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `;
  
  block.innerHTML = '';
  block.appendChild(testDiv);
}