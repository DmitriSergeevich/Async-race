import {
  createCar, updateCar, changeGaragePage, generateCars, raceMode, reset, changeWinnersPage, sortWinners
 } from '../response/response';

export default function listen() {
  const buttonInputs = document.querySelectorAll('input[type="button"]');
  const textInputs = document.querySelectorAll('input[type="text"]');
  const colorInputs = document.querySelectorAll('input[type="color"]');
  const sortType = document.querySelectorAll('.sortType');

  buttonInputs?.forEach(element => {
    element.addEventListener('click', ()=>buttonHandler(event))
  });
  textInputs?.forEach(element => {
    element.addEventListener('click', ()=>buttonHandler(event))
  });
  colorInputs?.forEach(element => {
    element.addEventListener('click', ()=>buttonHandler(event))
  });
  sortType?.forEach(element => {
    element.addEventListener('click', ()=>buttonHandler(event))
  });
}

const buttonHandler = (event: any) => {
  const id = event.target.id;
  const garagePage = document.querySelector('.page-garage');
  const winnersPage = document.querySelector('.page-winners');

  switch (id) {
    case 'toGarage': winnersPage?.classList.add('hidden');
                     garagePage?.classList.remove('hidden');
    break;
    case 'toWinners': winnersPage?.classList.remove('hidden');
                      garagePage?.classList.add('hidden');
    break;
    case 'create' : createCar()
    break;
    case 'update': updateCar.updateCar();
    break;
    case 'prevGarage': changeGaragePage(1);
    break;
    case 'nextGarage': changeGaragePage(0);
    break;
    case 'generate' : generateCars();
    break;
    case 'race' : raceMode();
    break;
    case 'reset' : reset();
    break;
    case 'prevWinners': changeWinnersPage(1);
    break;
    case 'nextWinners': changeWinnersPage(0);
    break;
    case 'bestTimeSort': sortWinners('time');
    break;
    case 'winsSort': sortWinners('wins');
    break;
    default:
    break;
  }
}
