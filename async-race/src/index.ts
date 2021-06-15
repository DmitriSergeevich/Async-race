import './styles.scss';
import header from './components/header/header';
import garage from './components/garage/garage';
import winners from './components/winners/winners';
import listen from './components/listen/listen';
import {
  carsCount, getPageGarage, upLoadWinnersList, winnersCount
} from './components/response/response';

const body = document.querySelector('body');
const main = document.createElement('main');
body?.appendChild(main);

garage();
winners();
upLoadWinnersList();
header();
listen();
getPageGarage('1');
carsCount();
winnersCount();
