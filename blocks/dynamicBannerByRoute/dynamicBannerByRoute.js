/* eslint-disable import/no-unresolved */
import { h } from '@dropins/tools/preact.js';
import { useMemo } from '@dropins/tools/preact-hooks.js';
import htm from 'htm';
import { PlayIcon } from '../icons/icons.js';

const html = htm.bind(h);

const DynamicBannerByRoute = (props) => {
  const { content, pathname } = props;
  const lang = localStorage.getItem('language') || 'es';
  const routes = useMemo(() => Object.keys(content), [content]);
  const currentContent = useMemo(() => content[pathname]?.content, [content, pathname]);
  const showIcon = (route) => pathname === route;
  return html`
    <div class="routes-navigation-banner-container">
      <div class="routes-navigation-banner-link-route">
        ${routes.map((route) => {
    const isShowIcon = showIcon(route);
    return html`<a class=${!isShowIcon ? 'emptyIcon' : ''} href=${`/${lang}/${route}`}> ${isShowIcon && html`<${PlayIcon} class='link-route-icon' />`} ${content[route].linkText}</a>`
  })}
      </div>
        ${html`<div class="routes-navigation-banner-content-route ${pathname}" dangerouslySetInnerHTML=${{ __html: currentContent }}></div>`}
    </div>
  `;
};

export default DynamicBannerByRoute;
