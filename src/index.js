import App from './App.svelte';

/* --------------------------------- STYLE'S -------------------------------- */
import './styles/buttons.scss';
import './styles/materialdesignicons.css';
import './styles/index.scss';
// import './styles/progress-circular.scss';
import './styles/inputs.scss';
import './styles/mdi.scss';
import './styles/sidenav.scss';
import './styles/table.scss';

const app = new App({
  target: document.body,
});

// console.log(moment([2007, 0, 29]).fromNow());
// moment.locale('id');

export default app;
