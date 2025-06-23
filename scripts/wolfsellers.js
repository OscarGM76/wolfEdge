async function applyTranslations(lang) {
  const res = await fetch(`/translations/${lang}.json`);
  const translations = await res.json();

  document.documentElement.lang = lang;

  // Traducir elementos normales con data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  // Traducir atributos comunes
  const attrMap = {
    'data-i18n-placeholder': 'placeholder',
    'data-i18n-title': 'title',
    'data-i18n-alt': 'alt',
    'data-i18n': 'translated',
  };

  Object.entries(attrMap).forEach(([dataAttr, htmlAttr]) => {
    document.querySelectorAll(`[${dataAttr}]`).forEach((el) => {
      const key = el.getAttribute(dataAttr);
      if (translations[key]) {
        el.setAttribute(htmlAttr, translations[key]);
      }
    });
  });

  // Detectar nodos con contenido de comentario como texto renderizado (ej: &lt;!-- data-i18n="..." --&gt;)
  document.querySelectorAll('h1, h2, h3, p, div, span').forEach((el) => {
    const match = el.textContent.trim().match(/^<!--\s*data-i18n="(.+?)"\s*-->$/);
    if (match) {
      const key = match[1];
      console.log(`🧩 Found inline comment as text: key="${key}"`);
      if (translations[key]) {
        el.textContent = translations[key];
        console.log(`✅ Translated inline to: "${translations[key]}"`);
      } else {
        console.warn(`⚠️ No translation found for key="${key}"`);
      }
    }
  });
}
async function setLanguage() {
  const lang = localStorage.getItem('language') || 'es';

  localStorage.setItem('language', lang);

  if (!window.location.pathname.startsWith(`/${lang}/`)) {
    const cleanPath = window.location.pathname.replace(/^\/(es|en)\//, '');
    window.location.replace(`/${lang}${cleanPath}`);
  }

  if (window.location.pathname === '/') {
    window.location.replace(`/${lang}/`);
  }

  // document.addEventListener('DOMContentLoaded', () => {
  //   applyTranslations(lang).catch((err) => {
  //     console.error('❌ Error applying translations:', err);
  //   });
  // });
}
async function applyUrlToButtons(param) {
  const lang = localStorage.getItem('language') || 'es';

  // Extraer solo el path, ignorando dominio
  const url = new URL(param.href);
  const path = url.pathname.replace(/^\/(es|en)\//, ''); // limpia si ya incluye idioma

  return `/${lang}/${path.replace(/^\/+/, '')}`; // garantiza que no haya doble slash
}

function getLanguage() {
  return localStorage.getItem('language') || 'es';
}
export {
  setLanguage,
  applyUrlToButtons,
  getLanguage
};
