
import {createCar, updateCar, changeGaragePage, generateCars } from '../response/response'

export default function listen() {
  const buttonInputs = document.querySelectorAll('input[type="button"]')
  const textInputs = document.querySelectorAll('input[type="text"]')
  const colorInputs = document.querySelectorAll('input[type="color"]')

  buttonInputs?.forEach(element => {
    element.addEventListener('click', ()=>buttonHandler(event))
  });
  textInputs?.forEach(element => {
    element.addEventListener('click', ()=>buttonHandler(event))
  });
  colorInputs?.forEach(element => {
    element.addEventListener('click', ()=>buttonHandler(event))
  });

}


const buttonHandler = (event: any) => {
  const id = event.target.id
  const garagePage = document.querySelector('.page-garage')
  const winnersPage = document.querySelector('.page-winners')


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
    default:
      break
  }
}


