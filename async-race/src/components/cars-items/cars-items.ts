import './cars-items.scss';
import { deleteCar, updateCar, MoveCar } from '../response/response';
import { renderCar } from '../car/car';

export default function carsItems(carName: string, carColor: string, id: number) {
  const carsItemsCount = document.querySelectorAll('.cars-items');
  if (carsItemsCount.length <= 6) {
    const carsList = document.querySelector('.cars-list');
    const carsItems = document.createElement('div');
    carsItems.className = 'cars-items';
    carsItems.setAttribute('id', `cars-items__${id}`);

    const finishFlag = `
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
    style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <g>
      <path style="fill:#ffffff;"
        d="M496,16c-8.836,0-16,7.164-16,16v16H32V32c0-8.836-7.164-16-16-16S0,23.164,0,32v32v192v224
        c0,8.836,7.164,16,16,16s16-7.164,16-16V272h448v208c0,8.836,7.164,16,16,16s16-7.164,16-16V256V64V32
        C512,23.164,504.836,16,496,16z M416,240v-80h-80v80h-80v-80h-80v80H96v-80H32V80h64v80h80V80h80v80h80V80h80v80h64v80H416z" />
      <g>
        <rect x="256" y="160" style="fill:#000000;" width="80" height="80" />
        <rect x="32" y="80" style="fill:#000000;" width="64" height="80" />
        <rect x="96" y="160" style="fill:#000000;" width="80" height="80" />
        <rect x="416" y="160" style="fill:#000000;" width="64" height="80" />
        <rect x="336" y="80" style="fill:#000000;" width="80" height="80" />
        <rect x="176" y="80" style="fill:#000000;" width="80" height="80" />
      </g>
    </g>
  </svg>
    `;
    carsItems.innerHTML = `
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
    carsList?.appendChild(carsItems);
    const selectButton = document.querySelector(`#select_${id}`);
    const removeButton = document.querySelector(`#remove_${id}`);
    const startButton = document.querySelector(`#start_${id}`);
    const stopButton = document.querySelector(`#stop_${id}`);
    const moveCar = new MoveCar(`${id}`);
    selectButton?.addEventListener('click', (event) => { updateCar.selectedCar(event) });
    removeButton?.addEventListener('click', (event) => { deleteCar(event) });
    startButton?.addEventListener('click', () => { moveCar.startEngine() });
    stopButton?.addEventListener('click', () => { moveCar.returnCar() });
  };
}
