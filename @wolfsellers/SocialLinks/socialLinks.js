import { h } from '@dropins/tools/preact.js';
import { useState } from '@dropins/tools/preact-hooks.js';
import htm from 'htm';

const html = htm.bind(h);

const SocialLinks = () => {
  const [first, setfirst] = useState(null);
  return html`
  <div>
    <div>
    linkedin
    </div>
  </div>
`;
};

export default SocialLinks;
