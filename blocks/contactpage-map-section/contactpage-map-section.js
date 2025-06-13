export default function decorate(block) {
  const elements = block.querySelectorAll("*");

  // Define función una sola vez
  const setIframeWidth = (iframe) => {
    if (window.innerWidth < 1400) {
      iframe.style.width = "100%";
    } else {
      iframe.style.width = "960px";
    }
  };

  // Solo un listener global
  window.addEventListener("resize", () => {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach(setIframeWidth);
  });

  elements.forEach((el) => {
    let html = el.innerHTML.trim();

    // Extrae el classIdentifier aunque venga mal formateado
    const match = html.match(/classIdentifier="([^"]+)"/);

    if (match) {
      const className = match[1];
      el.classList.add(className);

      // Limpia el classIdentifier del contenido
      html = html.replace(`classIdentifier="${className}"`, "").trim();

      // Para casos sin etiquetas HTML, como: classIdentifier="mapa-dinamico" https://...
      if (className === "mapa-dinamico") {
        const urlMatch = html.match(/https:\/\/www\.google\.com\/maps\/embed[^<\s"]+/);

        if (urlMatch) {
          const url = urlMatch[0];

          const iframe = document.createElement("iframe");
          iframe.src = url;

          setIframeWidth(iframe); // Establece el ancho en función de la pantalla

          iframe.style.minHeight = "520px";
          iframe.height = "100%";
          iframe.style.border = "0";
          iframe.setAttribute("allowfullscreen", "");
          iframe.setAttribute("loading", "lazy");
          iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");

          el.replaceWith(iframe);
        }
      } else {
        // Para otros bloques, simplemente actualiza el HTML limpio
        el.innerHTML = html;
      }
    }
  });
}