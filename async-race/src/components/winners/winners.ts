import './winners.scss';

export default function winners() {
  const main = document.querySelector('main')
  const pageWinners = document.createElement('div')
  pageWinners.classList.add('page-winners')
  pageWinners.classList.add('hidden')
  pageWinners.innerHTML= `
    <h2>Garage (<span id="carsCount">654984</span>)</h2>
      <div class="winners-pages">
        <h3>Page #<span id="WinnersPageNum">6</span></h3>
        <input type="button" id="prevWinners" class="button button__green" value="prev">
        <input type="button" id="nextWinners" class="button button__green" value="next">
      </div>
      <table id='sort' class='sort'>
        <thead>
          <tr>
            <th>number</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best time(sec)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <div class="table-car">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 307.75">
                <title>All-icons</title>
                <path class="car-color"
                  d="M489.8,189.85c-16.6-10.2-70.3-23.3-145.5-23.3l-39.8-46.4a44,44,0,0,0-33.5-15.4H152a52.8,52.8,0,0,0-34.5,12.8l-46.9,40.2-50,7.1A17.5,17.5,0,0,0,6,178.05l-6,23.8,132.4,61.8H503.2v-49.9A28,28,0,0,0,489.8,189.85Z"
                  fill="#f88" />
                <path class="car-color"
                  d="M503.2,219.45c0-17.7-26.5-35.3-150.1-35.3H8.8A8.8,8.8,0,0,0,0,193v53l167.7,26.5H503.1v-53h0.1Z"
                  fill="#ff6464" />
                <path class="car-color"
                  d="M503.2,254.85H89.2l-78.5-17.4A8.8,8.8,0,0,0,.2,244.14h0A8.7,8.7,0,0,0,6.69,254.6l0.21,0,79.5,17.6,1.9,0.2H503.2A8.8,8.8,0,0,0,503.2,254.85Z"
                  fill="#d2555a" />
                <circle cx="423.7" cy="254.75" r="44.1" fill="#ededee" />
                <path
                  d="M423.7,307.75a53,53,0,1,1,53-53h0A53.1,53.1,0,0,1,423.7,307.75Zm0-88.3a35.3,35.3,0,1,0,.1,0h-0.1Z"
                  fill="#504b5a" />
                <circle cx="423.7" cy="254.75" r="17.7" fill="#dcdbde" />
                <circle cx="88.3" cy="254.75" r="44.1" fill="#ededee" />
                <path
                  d="M88.3,307.75a53,53,0,1,1,53-53h0A53.1,53.1,0,0,1,88.3,307.75Zm0-88.3a35.3,35.3,0,1,0,35.3,35.3h0A35.3,35.3,0,0,0,88.3,219.45Z"
                  fill="#504b5a" />
                <circle cx="88.3" cy="254.75" r="17.7" fill="#dcdbde" />
                <path class="car-color"
                  d="M353.1,237.15H167.7a8.8,8.8,0,0,1-8.8-8.8h0a8.8,8.8,0,0,1,8.8-8.8H353.1a8.8,8.8,0,0,1,8.8,8.8h0A8.8,8.8,0,0,1,353.1,237.15Z"
                  fill="#d2555a" />
                <path class="car-color"
                  d="M503.2,237.15h-8.8a8.8,8.8,0,0,1-8.8-8.8h0a8.8,8.8,0,0,1,8.8-8.8h8.8a8.8,8.8,0,0,1,8.8,8.8h0A8.9,8.9,0,0,1,503.2,237.15Z"
                  fill="#d2555a" />
                <path class="car-color"
                  d="M70.6,157.65l46.9-40.2a53.1,53.1,0,0,1,34.5-12.8H271a44,44,0,0,1,33.5,15.4l39.8,46.4h-209a138.8,138.8,0,0,1-23.2-1.9Z"
                  fill="#ff6464" />
                <path
                  d="M261.3,120a17.8,17.8,0,0,0-13.6-6.4H166.2a17.7,17.7,0,0,0-12.5,5.2l-26.5,26.5a12.6,12.6,0,0,0-3.7,8.8h0a12.5,12.5,0,0,0,12.5,12.5H290.6a4.4,4.4,0,0,0,3.4-7.2Z"
                  fill="#625d6b" />
                <polygon points="185.4 166.55 158.9 166.55 176.6 113.55 194.2 113.55 185.4 166.55" fill="#504b5a" />
                <path d="M493.7,193.05h-8.2a8.8,8.8,0,0,0,0,17.6h17.3A27.5,27.5,0,0,0,493.7,193.05Z" fill="#ededee" />
                <path
                  d="M304.5,120.15a43.5,43.5,0,0,0-7-6.6H283.1a4.4,4.4,0,0,0-3.4,7.2l32.8,39.4a17.8,17.8,0,0,0,13.6,6.4h18.2Z"
                  fill="#625d6b" />
                <path class="car-color"
                  d="M0,193.05v8.8H17.7a8.8,8.8,0,0,0,0-17.6H8.8a8.7,8.7,0,0,0-8.8,8.6Q0,193,0,193.05Z"
                  fill="#d2555a" />
                </svg>
              </div>
            </td>
            <td>tesla</td>
            <td>1</td>
            <td>10</td>
          </tr>
          <tr>
            <td>2</td>
            <td>nolan</td>
            <td>lada</td>
            <td>10</td>
            <td>2.47</td>
          </tr>
          <tr>
            <td>3</td>
            <td>firto</td>
            <td>gaz</td>
            <td>2</td>
            <td>159</td>
          </tr>
        </tbody>
      </table>
  `
  main?.appendChild(pageWinners)
}
