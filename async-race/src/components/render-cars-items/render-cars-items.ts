import './render-cars-items.scss';
import { renderCar } from './car';
import { finishFlag } from './finish-flag';

interface IBUttonCollection {
  selectButton: HTMLButtonElement | null,
  removeButton: HTMLButtonElement | null,
  startButton: Element | null,
  stopButton: Element | null
}

export default function carsItems(carName: string, carColor: string, id: number): IBUttonCollection {
  const carsList = document.querySelector('.cars-list');
  const carsItemsElement = document.createElement('div');
  carsItemsElement.className = 'cars-items';
  carsItemsElement.setAttribute('id', `cars-items__${id}`);
  carsItemsElement.innerHTML = `
    <div class="cars-buttons">
    <input type="button" id="select_${id}" class="button button__blue" value="select">
    <input type="button" id="remove_${id}" class="button button__blue" value="remove">
    <h3 id="carName__${id}">${carName}</h3>
    </div>
    <div class="track">
    <div class="track-buttons">
      <input type="button" id="start_${id}" class="button button__track start-button" value="a">
      <input type="button" id="stop_${id}" class="button button__track stop-button" value="b">
    </div>
    <div class="car" id="car__${id}">
      ${renderCar(id, carColor)}
    </div>
    <div class="finish" id="finish__${id}">
      ${finishFlag}
    </div>
  `;
  carsList?.appendChild(carsItemsElement);
  const selectButton: HTMLButtonElement | null = document.querySelector(`#select_${id}`);
  const removeButton: HTMLButtonElement | null = document.querySelector(`#remove_${id}`);
  const startButton = document.querySelector(`#start_${id}`);
  const stopButton = document.querySelector(`#stop_${id}`);
  const buttonCollection = {
    selectButton, removeButton, startButton, stopButton,
  };
  return buttonCollection;
}
