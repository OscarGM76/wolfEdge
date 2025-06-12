import { h } from '@dropins/tools/preact.js';
import htm from 'htm';

const html = htm.bind(h);

const ViewMoreButton = (props) => {
  const { text } = props || {};
  return html`
    <div class="viewMoreContainerButton">
        <button class="viewMoreButton">
        ${text || ''}
        </button>
    </div>
  `;
};

export default ViewMoreButton;
