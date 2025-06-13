import { h } from '@dropins/tools/preact.js';
import { useState, useMemo } from '@dropins/tools/preact-hooks.js';
import htm from 'htm';
import ViewMoreButton from '../ViewMoreButton/viewMoreButton.js';

const html = htm.bind(h);

const OurClients = (props) => {
  const { clients } = props;
  const clientsTypes = useMemo(() => Object.keys(clients), [clients]);

  // eslint-disable-next-line consistent-return
  const allImages = useMemo(() => {
    if (!clients) return [];
    return Object.keys(clients).map((key) => clients[key]).flat();
  }, [clients]);

  const [currentSelectedCleints, setCurrentSelectedCleints] = useState(allImages);
  const [currentTypeClient, setcurrentTypeClient] = useState('all');

  // eslint-disable-next-line consistent-return
  const handleChangeTypeClient = (value) => {
    setcurrentTypeClient(value);
    if (value === 'all') return setCurrentSelectedCleints(allImages);
    setCurrentSelectedCleints(clients[value]);
  };

  return html`
    <div class="ourClientsImagesContainer">
      <div class="ourClientsImages">
        ${currentSelectedCleints.map((img, i) => html`<div class="imageContainerOurClients" ><img src=${img} alt=${String(i)} /></div>`)}
      </div>
      <div class="ourClientsClientsTypes">
        <button 
        onClick=${() => handleChangeTypeClient('all')}
        class=${`ourClientsClientsTypesButton ${currentTypeClient === 'all' ? 'ourClientsClientsTypesButtonActive' : ''}`}>Todos</button>
        ${clientsTypes.map((client) => html`<button 
            onClick=${() => handleChangeTypeClient(client)}
            class=${`ourClientsClientsTypesButton ${currentTypeClient === client ? 'ourClientsClientsTypesButtonActive' : ''}`}>
                    <p>${client}</p>
                </button>`)}
      </div>
      <div class='ourClientsViewMoreButton'>
        ${(ViewMoreButton && currentTypeClient === 'all') && html`${ViewMoreButton({ text: 'Ver Todos Los Servicios', href: '/es/portafolio' })}`}
      </div>
    </div>
  `;
};

export default OurClients;
