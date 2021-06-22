import { garagePage } from './garage-page';
import './render-garage.scss';

export default function garage(): void {
  const main = document.querySelector('main');
  const pageGarage = document.createElement('div');
  pageGarage.classList.add('page-garage');
  pageGarage.innerHTML = garagePage;
  main?.appendChild(pageGarage);
}
