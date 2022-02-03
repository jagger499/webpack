import Template from '@template/Template.js';
// al añadir el minificador de css hay que eliminar
// la parte de html donde se importa y agregarla acá
import '@styles/main.css';
import '@styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
