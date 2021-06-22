import carsItems from '../render-cars-items/render-cars-items';
import { updateCar } from '../Update-Car/Update-car';
import { winnerModal } from '../render-winner-modal/render-winner-modal';
import { renderWinnersItems } from '../render-winners/render-winners';

const baseURL = 'http://127.0.0.1:3000/';
const garage = 'garage/';
const winners = 'winners/';
const engine = 'engine';
const COLOR_WHITE = '#ffffff';
let currentGaragePage = 1;
let currentWinnersPage = 1;
let winner = false;
let isRace = false;
let currentSortOrder = true;

interface Ibody {
  method: string,
  body: string,
  headers: any
}

export function winnerSwitcher(count: boolean) {
  winner = count;
}

export async function response(url: string, data?: any) {
  return fetch(url, data);
}

export const carsCount = async () => {
  const count = document.querySelectorAll('#carsCount');
  const page = `${baseURL + garage}?_page=1&_limit=7`;
  const totalCarsNum = await fetch(page)
    .then((resp) => resp.headers
    .get('X-Total-Count'))
    .catch((err) => console.log(err));
  count!.forEach((elem) => { elem.innerHTML = `${totalCarsNum}`; });
};

export const winnersCount = async () => {
  const count = document.querySelector('#winnersCount');
  const page = `${baseURL + winners}?_page=1&_limit=10&_sort=time`;

  const totalWinnersNum = await fetch(page)
    .then((resp) => resp.headers
      .get('X-Total-Count'))
    .catch((err) => console.log(err, 'winnersCount'));
  count!.innerHTML = `${totalWinnersNum}`;
};

async function deleteWinner(id: string | number) {
  const data = {
    method: 'DELETE',
  };
  await response(`${baseURL + winners}${id}`, data);
  winnersCount();
}

export const deleteCar = async (element: HTMLButtonElement | null) => {
  const slicedPartOfId = 7;
  const id = element!.id.slice(slicedPartOfId);
  const url = `${baseURL}${garage}${id}`;
  const elem = document.querySelector(`#cars-items__${id}`);
  const dataCar = {
    method: 'DELETE',
  };
  await response(url, dataCar).then(
    () => { elem!.parentNode!.removeChild(elem!); },
  );
  carsCount();
  deleteWinner(id);
};

export const generateCarsData = () => {
  const carsBrend = [
    'Audi', 'BMW', 'Chery', 'Chevrolet', 'Citroen', 'Daewoo', 'Ford',
    'Geely', 'Honda', 'Hyundai', 'Kia', 'LADA', 'Land Rover', 'Lexus',
    'Lifan', 'Mazda', 'Mercedes', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot',
    'Renault', 'Skoda', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo', 'УАЗ',
  ];
  const carsModels = [
    'A6', 'X6', 'Amulet', 'Cruse', 'C4', 'Nexia', 'Mustang', 'Emgrand', 'Civic', 'Solaris',
    'Sportage', 'Granta', 'Defender', 'IS250', 'Solano', 'MX-5', 'Maclaren', 'Colt', 'GT-R', 'Insignia',
    'Partner', 'Duster', 'Oktavia', 'Impresa', 'Vitara', 'Prius', 'Golf', 'XC-70', 'Patriot',
  ];
  const carsColors = [
    '#24B800', '#003C8A', '#F07714', '#F9F200', '#D6003B',
    '#89B802', '#05848A', '#F03A15', '#FABF14', '#8F00D6',
  ];

  function getRandom(type: string[], max: number) {
    return type[Math.floor(Math.random() * max)];
  }
  const carsData = {
    name: `${getRandom(carsBrend, 29)} ${getRandom(carsModels, 30)}`,
    color: `${getRandom(carsColors, 10)}`,
  };
  return carsData;
};

const getPosition = (e: HTMLElement | null) => {
  const coordinates = e!.getBoundingClientRect();
  return coordinates;
};

const getDistance = (a: HTMLElement | null, b: HTMLElement | null) => {
  const aCoordinates = getPosition(a);
  const bCoordinates = getPosition(b);
  const aPosition = aCoordinates.left + aCoordinates.width / 2;
  const bPosition = bCoordinates.left + bCoordinates.width / 2;
  const distance = bPosition - aPosition;
  return distance;
};

function winsCounter(data: any) {
  const winsCell = document.getElementById(`wins__${data.id}`);
  const newWinsCount = data.wins + 1;
  if (winsCell) {
    winsCell!.innerHTML = `${newWinsCount}`;
  }
  return newWinsCount;
}

function timesCompare(time: string, data: any) {
  const timeCell = document.getElementById(`time__${data.id}`);
  const oldTimeCount: any = data.time;
  const newTimeCount = Number(time);
  const minTime = String(Math.min(oldTimeCount, newTimeCount));
  if (timeCell) {
    timeCell!.innerHTML = minTime;
  }
  return minTime;
}

function winnerCheck(id: string | number) {
  const winnersItemsCount = document.querySelectorAll('.winners-row');

  for (let i = 0; i < winnersItemsCount.length; i++) {
    if (winnersItemsCount[i].id === `winners-row__${id}`) {
      return true;
    }
  }

  return false;
}

async function updateWinner(id: string, time : string, wins: string) {
  const winnerUpdate = {
    wins: Number(wins),
    time: Number(time),
  };
  const data: Ibody = {
    method: 'PUT',
    body: JSON.stringify(winnerUpdate),
    headers: { 'Content-Type': 'application/json' },
  };
  await response(`${baseURL + winners}${id}`, data)
    .catch((err) => console.log('err in updateWinner'));
}

async function addWinner(id: string, time: string) {
  const winnersItemsCount = document.querySelectorAll('.winners-row');
  const winnerInfo = {
    id: Number(id),
    wins: 1,
    time: Number(time),
  };
  const data: Ibody = {
    method: 'POST',
    body: JSON.stringify(winnerInfo),
    headers: { 'Content-Type': 'application/json' },
  };

  await response(`${baseURL}${winners}`, data)
    .then(() => {
      if (winnersItemsCount.length <= 6) {
        renderWinnersItems(winnerInfo);
      }
    })
    .catch((err) => console.log('err in addWinner'));

  winnersCount();
}

export class MoveCar {
  animationID: number;

  id: string;

  step: number| null;

  trekLength: number;

  element: HTMLElement | null;

  per: number;

  finish: HTMLElement | null;

  startButton: any;

  raceButton: any;

  constructor(id: string) {
    this.id = id;
    this.animationID = 0;
    this.element = document.getElementById(`car__${this.id}`);
    this.finish = document.getElementById(`finish__${id}`);
    this.trekLength = getDistance(this.element, this.finish) + 320;
    this.step = 0;
    this.per = 5;
    this.startButton = document.getElementById(`start_${this.id}`);
    this.raceButton = document.getElementById('race');
  }

  carRunAnimation() {
    this.startButton!.disabled = true;
    this.raceButton!.disabled = true;

    const animation = async () => {
      this.step! += this.per;
      this.element!.style.transform = `translateX(${this.step}px)`;
      if (this.step! < this.trekLength - 250) {
        this.animationID = window.requestAnimationFrame(animation);
      } else if (!winner && isRace) {
        isRace = false;
        winner = true;
        const time = String(((this.trekLength / this.per) / 60).toFixed(2));
        let winnerData: any;

        await response(`${baseURL}${garage}${this.id}`)
          .then((resp) => resp.json())
          .then((data) => winnerModal(data.name, time))
          .then(() => winnerSwitcher(false));
          // ЕСЛИ СЛОМАНО ВЕРНУТЬ ВЫКЛЮЧАТЕЛЬ В МОДАЛКУ

        if (winnerCheck(this.id)) {
          await response(`${baseURL + winners}${this.id}`)
            .then((resp) => resp.json())
            .then((data) => { winnerData = data; })
            .catch((err) => { console.log(err); });
          const newTime: string = timesCompare(time, winnerData);
          const newWinsCount = winsCounter(winnerData);
          updateWinner(this.id, newTime, newWinsCount);
        } else {
          addWinner(this.id, time);
        }
      }
    };
    return () => requestAnimationFrame(animation);
  }

  stopCar() {
    cancelAnimationFrame(this.animationID);
  }

  startEngine = async () => {
    const urlStart = `${baseURL}${engine}?id=${this.id}&status=started`;
    const urlDrive = `${baseURL}${engine}?id=${this.id}&status=drive`;
    await response(urlStart)
      .then((resp) => resp.json())
      .then((data) => {
        this.per = Math.floor(data.velocity / 10);
      })
      .then(this.carRunAnimation());
    await response(urlDrive)
      .then((resp) => {
        if (resp.status === 500) {
          this.stopCar();
        }
      });
  };

  returnCar = () => {
    cancelAnimationFrame(this.animationID);
    const element = document.getElementById(`car__${this.id}`);
    element!.style.transform = 'translateX(0px)';
    this.step! = 0;
    this.startButton!.disabled = false;
    this.raceButton!.disabled = false;
  };
}

const renderCarsItems = (carName: string, carColor: string, id: number) => {
  const carsItemsCount = document.querySelectorAll('.cars-items');
  if (carsItemsCount.length <= 6) {
    const carButtons = carsItems(carName, carColor, id);
    // selectButton?.addEventListener('click', () => { updateCar.selectedCar(selectButton); });
    // removeButton?.addEventListener('click', () => { deleteCar(removeButton); });
    // startButton?.addEventListener('click', () => { moveCar.startEngine(); });
    // stopButton?.addEventListener('click', () => { moveCar.returnCar(); });
    const moveCar = new MoveCar(`${id}`);
    carButtons!.selectButton!.addEventListener('click', () => { updateCar.selectedCar(carButtons!.selectButton); });
    carButtons!.removeButton!.addEventListener('click', () => { deleteCar(carButtons!.removeButton); });
    carButtons!.startButton!.addEventListener('click', () => { moveCar.startEngine(); });
    carButtons!.stopButton!.addEventListener('click', () => { moveCar.returnCar(); });
  }
};

export const generateCars = async () => {
  for (let i = 0; i < 100; i++) {
    const dataCar: Ibody = {
      method: 'POST',
      body: JSON.stringify(generateCarsData()),
      headers: { 'Content-Type': 'application/json' },
    };

    await response(baseURL + garage, dataCar) // eslint-disable-line
      .then((resp) => resp.json())
      .then((data) => { renderCarsItems(data.name, data.color, data.id); });
  }
  carsCount();
};
export const getPageGarage = async (pageNumber: string) => {
  const page = `${baseURL + garage}?_page=${pageNumber}&_limit=7`;
  await response(page)
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        renderCarsItems(data[i].name, data[i].color, data[i].id);
      }
    });
};

export const changeGaragePage = async (direction: number) => {
  const page = `${baseURL + garage}?_page=1&_limit=7`;
  const carsList: HTMLElement | null = document.querySelector('.cars-list');
  const totalCarsNum = await fetch(page)
    .then((resp) => resp.headers
      .get('X-Total-Count'))
    .catch((err) => console.log(err));
  const maxItemsonPage = 7;
  const pageCount = Math.ceil(Number(totalCarsNum) / maxItemsonPage);
  carsList!.innerHTML = '';
  const pageNumber = document.querySelector('#garagePageNum');

  if (direction) {
    if (currentGaragePage === 1) {
      currentGaragePage = pageCount;
      getPageGarage(`${currentGaragePage}`);
    } else {
      currentGaragePage -= 1;
      getPageGarage(`${currentGaragePage}`);
    }
  } else if (currentGaragePage === pageCount) {
    currentGaragePage = 1;
    getPageGarage('1');
  } else {
    currentGaragePage += 1;
    getPageGarage(`${currentGaragePage}`);
  }
  pageNumber!.innerHTML = `${currentGaragePage}`;
};

export const createCar = async () => {
  const createText: HTMLInputElement | null = document.querySelector('#create-text');
  const creatColor: HTMLInputElement | null = document.querySelector('#createColor');
  const car = {
    name: createText?.value,
    color: creatColor?.value,
  };
  const dataCar: Ibody = {
    method: 'POST',
    body: JSON.stringify(car),
    headers: { 'Content-Type': 'application/json' },
  };

  await response(baseURL + garage, dataCar)
    .then((resp) => resp.json())
    .then((data) => { renderCarsItems(data.name, data.color, data.id); });
  createText!.value = '';
  creatColor!.value = COLOR_WHITE;
  carsCount();
};

export const raceMode = () => {
  isRace = true;
  const carsFromPage: any = document.querySelectorAll('.start-button');
  for (let i = 0; i < carsFromPage.length; i++) {
    carsFromPage[i].click();
  }
};

export const reset = () => {
  const carsFromPage: any = document.querySelectorAll('.stop-button');
  for (let i = 0; i < carsFromPage.length; i++) {
    carsFromPage[i].click();
  }
};

export async function upLoadWinnersList() {
  await response(`${baseURL}${winners}?_page=1&_limit=10&_sort=time&_order=ASC`)
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        renderWinnersItems(data[i]);
      }
    });
}

export const getPageWinners = async (pageNumber: string | number, sort = 'time', order = 'ASC') => {
  const page = `${baseURL + winners}?_page=${pageNumber}&_limit=10&_sort=${sort}&_order=${order}`;

  await response(page)
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        renderWinnersItems(data[i]);
      }
    });
};

export const changeWinnersPage = async (direction: number) => {
  const page = `${baseURL + winners}?_page=1&_limit=10&_sort=time`;
  const winnersList: HTMLElement | null = document.querySelector('#tableBody');
  const totalCarsNum = await fetch(page)
    .then((resp) => resp.headers
    .get('X-Total-Count'));
  const maxItemsonPage = 10;
  const pageCount = Math.ceil(Number(totalCarsNum) / maxItemsonPage);
  winnersList!.innerHTML = '';
  const pageNumber = document.querySelector('#winnersPageNum');

  if (direction) {
    if (currentWinnersPage === 1) {
      currentWinnersPage = pageCount;
      getPageWinners(`${currentWinnersPage}`);
    } else {
      currentWinnersPage -= 1;
      getPageWinners(`${currentWinnersPage}`);
    }
  } else if (currentWinnersPage === pageCount) {
    currentWinnersPage = 1;
    getPageWinners('1');
  } else {
    currentWinnersPage += 1;
    getPageWinners(`${currentWinnersPage}`);
  }
  pageNumber!.innerHTML = `${currentWinnersPage}`;
};

export async function sortWinners(type: string) {
  const winnersList: HTMLElement | null = document.querySelector('#tableBody');
  winnersList!.innerHTML = '';
  let sortOrder;
  const sortArrow = document.querySelector(`#${type}Arrow`);

  if (currentSortOrder) {
    sortOrder = 'DESC';
    currentSortOrder = false;
    sortArrow?.classList.add('rotated-arrow');
  } else {
    sortOrder = 'ASC';
    currentSortOrder = true;
    sortArrow?.classList.remove('rotated-arrow');
  }

  await getPageWinners(currentWinnersPage, type, sortOrder);
}
