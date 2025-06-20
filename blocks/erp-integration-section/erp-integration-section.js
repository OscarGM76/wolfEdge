export default function decorate(block) {
  const elements = block.querySelectorAll("*");
 
  elements.forEach((el) => {
    let html = el.innerHTML.trim();
 
    // Buscar el classIdentifier aunque venga mal formateado
    const match = html.match(/classIdentifier="([^"]+)"/);
 
    if (match) {
      const className = match[1];
      el.classList.add(className);
 
      // Limpiar el atributo del contenido
      html = html.replace(`classIdentifier="${className}"`, "").trim();
 
      // Reemplazar el contenido limpio
      el.innerHTML = html;
    }
  });
}