import { h } from '@dropins/tools/preact.js';
import htm from 'htm';

const html = htm.bind(h);

const SocialLinks = ({ links }) => (
  html`
  <div class="socialLinsList">
   ${links.map((link) => link)}
  </div>
`);

export default SocialLinks;
