function trackPageView() {

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'page_view',
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
    });
    console.log('[GA4] Evento page_view enviado (via dataLayer)');
  } else {
    console.warn('[GA4] dataLayer no está disponible aún');
    setTimeout(trackPageView, 3000);
  }
}

window.addEventListener('load', trackPageView);


export {
  trackPageView
}