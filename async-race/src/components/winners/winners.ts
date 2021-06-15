import { renderCar } from '../car/car';
import './winners.scss';

export default function winners() {
  const main = document.querySelector('main');
  const pageWinners = document.createElement('div');
  pageWinners.classList.add('page-winners');
  pageWinners.classList.add('hidden');
  pageWinners.innerHTML = `
    <h2>Winners (<span id="winnersCount">1</span>)</h2>
      <div class="winners-pages">
        <h3>Page #<span id="winnersPageNum"></span></h3>
        <input type="button" id="prevWinners" class="button button__green" value="prev">
        <input type="button" id="nextWinners" class="button button__green" value="next">
      </div>
      <table id='sort' class='sort'>
        <thead>
          <tr>
            <th>Car</th>
            <th>Name</th>
            <th class="sortType" id="winsSort">Wins <span id="winsArrow">&#8593</span></th>
            <th class="sortType" id="bestTimeSort">Best time(sec)<span id="timeArrow">&#8593</span></th>
          </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
      </table>
  `;
  main?.appendChild(pageWinners);
}

export async function renderWinnersItems(winnersData: any) {
  const carData = await fetch(`http://127.0.0.1:3000/garage/${winnersData.id}`)
  .then((response) => response.json())
  .then((data) => data)
  const tableBody = document.querySelector('#tableBody');
  const winnersRow = document.createElement('tr');
  winnersRow.classList.add('winners-row');
  winnersRow.setAttribute('id', `winners-row__${winnersData.id}`);
  winnersRow.innerHTML = `
    <tr>
      <td>
        <div class="table-car">
          ${renderCar(winnersData.id, carData.color)}
        </div>
      </td>
      <td>${carData.name}</td>
      <td id='wins__${winnersData.id}'>${winnersData.wins}</td>
      <td id="time__${winnersData.id}">${winnersData.time}</td>
    </tr>
  `;
  tableBody?.appendChild(winnersRow);
}
