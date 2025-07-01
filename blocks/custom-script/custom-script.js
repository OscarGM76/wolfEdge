
import {trackPageView} from '../../scripts/tagEvents.js';
export default function decorate(block) {
  try {
    console.log('[custom-script] Iniciando procesamiento del bloque...');
    const rows = block.querySelectorAll('table tr');

    if (rows.length === 0) {
      console.warn('[custom-script] No se encontraron filas en la tabla.');
    }

    rows.forEach((row, index) => {
      console.log(`[custom-script] Procesando fila ${index + 1}...`);

      const cell = row.querySelector('td code');
      if (!cell) {
        console.warn(`[custom-script] No se encontró <code> en la fila ${index + 1}.`);
        return;
      }

      const rawScript = cell.textContent;
      console.log(`[custom-script] Contenido detectado:`, rawScript);

      if (rawScript.includes('<script')) {
        const temp = document.createElement('div');
        temp.innerHTML = rawScript;

        const script = temp.querySelector('script');
        if (script) {
          const newScript = document.createElement('script');
          if (script.src) {
            newScript.src = script.src;
            newScript.async = script.async ?? true;
            console.log(`[custom-script] Inyectando script externo: ${script.src}`);
            trackPageView();
          } else {
            newScript.textContent = script.textContent;
            console.log(`[custom-script] Inyectando script inline:`, script.textContent);
          }

          document.head.appendChild(newScript);
        } else {
          console.warn(`[custom-script] No se encontró <script> válido en fila ${index + 1}.`);
        }
      } else {
        console.warn(`[custom-script] El contenido de la fila ${index + 1} no contiene una etiqueta <script>.`);
      }
    });

    block.remove();
    console.log('[custom-script] Bloque eliminado del DOM.');

  } catch (e) {
    console.error('[custom-script] Error al cargar scripts desde custom-script:', e);
  }
}
