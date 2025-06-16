import { h } from '@dropins/tools/preact.js';
import htm from 'htm';
const html = htm.bind(h);

export const ChevronLeftIcon = (props) => html`
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="1.5"
  ...${props}
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M15.75 19.5 8.25 12l7.5-7.5"
  />
</svg>
`;

export const ChevronRigthIcon = (props) => html`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" ...${props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
`;
