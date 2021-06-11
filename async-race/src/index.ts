import './styles.scss';
import header from './components/header/header'
import garage from './components/garage/garage'
import winners from './components/winners/winners'
import listen from './components/listen/listen'
import { carsCount, getPageGarage} from './components/response/response'

const body = document.querySelector('body')
const main = document.createElement('main')
body?.appendChild(main)


garage()
winners()
header()
listen()
getPageGarage('1')
carsCount()




// const updateURL = 'http://127.0.0.1:3000/garage/'
//     const car = {
//       name: updateTetext?.value,
//       color: updatetColor?.value,
//     }
//     const dataCar: object = {
//       method: 'PUT',
//       body: JSON.stringify(car),
//       headers: {'Content-Type': 'application/json'}
//     }

//   response(updateURL, dataCar).then(response => {return response.json()}).then(




/*
const createCar = async () =>
await fetch(baseURL + 'garage', {
  method: 'POST',
  body: JSON.stringify({
    name: 'bolnaya corova',
    color: 'green'
  }),
  headers: {'Content-Type': 'application/json'}
})



createCar().then(response => {return response.json()}).then(data=>{renderTrack(data.name, data.color, data.id)})
const carURL = 'http://127.0.0.1:3000/garage/11'
const startURL = 'http://127.0.0.1:3000/engine?id=5&status=started'
const driveURL = 'http://127.0.0.1:3000/engine?id=5&status=drive'
const baseURL = 'http://127.0.0.1:3000/'
async function sendRequest(url, method = null, body = null) {
  let param = null;
  if(method) {
    param = {
      method: method,
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    }
  }
  try {
    let response = await fetch(url, param);
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    }
  } catch(err) {
    console.log(err);
  }
}
*/
