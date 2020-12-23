import App from './App.svelte';
import moment from 'moment';
import momentID from './libs/momen-id';

/* --------------------------------- STYLE'S -------------------------------- */
import './styles/buttons.scss';
import './styles/materialdesignicons.css';
import './styles/index.scss';
// import './styles/progress-circular.scss';
import './styles/inputs.scss';
import './styles/mdi.scss';
import './styles/sidenav.scss';
import './styles/table.scss';
import './styles/animations.scss';

const app = new App({
  target: document.body,
});

moment.defineLocale('id', momentID);
moment.locale('ID');

export default app;
