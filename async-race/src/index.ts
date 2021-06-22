import './styles.scss';
import header from './components/render-header/render-header';
import garage from './components/render-garage/render-garage';
import renderWinners from './components/render-winners/render-winners';
import listen from './components/listeners/listeners';
import {
  carsCount, getPageGarage, upLoadWinnersList, winnersCount,
} from './components/response/response';

const body = document.querySelector('body');
const main = document.createElement('main');
body?.appendChild(main);
const firsPage = '1';

function initPage() {
  garage();
  renderWinners();
  upLoadWinnersList();
  header();
  listen();
  getPageGarage(firsPage);
  carsCount();
  winnersCount();
}

initPage();
