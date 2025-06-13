import { h } from '@dropins/tools/preact.js';
import htm from 'htm';

const html = htm.bind(h);

const ViewMoreButton = (props) => {
  const { text, href = '#' } = props || {};
  return html`
    <div class="viewMoreContainerButton">
          <a href=${href}>
            <button class="viewMoreButton">
            ${text || ''}
            </button>
          </a>
    </div>
  `;
};

export default ViewMoreButton;
