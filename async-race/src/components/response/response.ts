import carsItems from '../cars-items/cars-items'
import { winnerModal } from '../winner-madal/winner-modal'
const baseURL = 'http://127.0.0.1:3000/'
const garage = "garage/"
const engine = "engine"
let currentPage = 1;
let winner = false;

export function winnerSwitcher(count: boolean) {
  winner = count;
}

//export const response = async (url: string, data?: object) => await fetch(url, data)
export async function response(url: string, data?: object){
  return await fetch(url, data)
}

export const createCar = async () => {
  const creatTetext: HTMLInputElement | null = document.querySelector('#create-text');
  const creatColor: HTMLInputElement | null = document.querySelector('#createColor');
  const car = {
    name: creatTetext?.value,
    color: creatColor?.value
  }
  const dataCar: object = {
    method: 'POST',
    body: JSON.stringify(car),
    headers: {'Content-Type': 'application/json'}
  }

  await response(baseURL + garage, dataCar)
  .then(response => {return response.json()})
  .then(data=>{carsItems(data.name, data.color, data.id)})
  creatTetext!.value = ''
  creatColor!.value = '#ffffff'
  carsCount()
}

class UpdateCar {
  carID: string = ''

  selectedCar(event: any) {
    let id = event.target!.id.slice(7)
    this.carID = id

  }

  async updateCar() {
    const updateTetext: HTMLInputElement | null = document.querySelector('#update-text');
    const updatetColor: HTMLInputElement | null = document.querySelector('#updateColor');
    const carColor = document.querySelectorAll(`#car-color__${this.carID}`)
    const carName: HTMLElement | null = document.querySelector(`#carName__${this.carID}`)
    const updateURL = `${baseURL}${garage}${this.carID}`
    //console.log(this.carID)
    const car = {
      name: updateTetext?.value,
      color: updatetColor?.value,
    }
    const dataCar: object = {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: {'Content-Type': 'application/json'}
    }

    await response(updateURL, dataCar).then(response => {return response.json()})
    .then(
      //carColor.forEach(element => element.style.fill = updatetColor.value)
      ()=>{

        for(let i = 0; i < carColor.length; i++){
          const element: any = carColor[i]
          element.style.fill = updatetColor!.value
        }
        if(carName){
          carName.innerHTML = updateTetext!.value
        }

      }

    )

  }
}

export const updateCar = new UpdateCar()


export const getPageGarage = async (pageNumber: string) => {
  const page = baseURL + garage + `?_page=${pageNumber}&_limit=7`
  await response(page)
  .then(response => {return response.json()})
  .then(data=>{
    //data.forEach(element => carsItems(element.name, element.color, element.id))
    for(let i = 0; i < data.length; i++){
      carsItems(data[i].name, data[i].color, data[i].id)
    }
  })
}



export const changeGaragePage = async (direction: number) => {
  console.log(currentPage)
  const page = baseURL + garage + `?_page=1&_limit=7`
  const carsList: HTMLElement | null = document.querySelector('.cars-list')
  const totalCarsNum = await fetch(page).then(response => response.headers.get('X-Total-Count')).catch(err => console.log(err))
  const maxItemsonPage = 7;
  const pageCount = Math.ceil(Number(totalCarsNum) / maxItemsonPage)
  carsList!.innerHTML = '';
  const pageNumber = document.querySelector('#garagePageNum')
  if(direction) {
    if(currentPage === 1) {
      currentPage = pageCount
      getPageGarage(`${currentPage}`)

    } else {
      currentPage--
      getPageGarage(`${currentPage}`)
    }
  } else {
    if(currentPage === pageCount) {
      currentPage = 1
      getPageGarage('1')

    } else {
      currentPage++
      getPageGarage(`${currentPage}`)

    }
  }

  pageNumber!.innerHTML = `${currentPage}`
}

export const deleteCar = async (event: any) => {
  let id = event.target!.id.slice(7)
  const url = `${baseURL}${garage}${id}`
  const elem = document.querySelector(`#cars-items__${id}`)
  const dataCar: object = {
    method: 'DELETE'
  }
  await response(url, dataCar).then(
    ()=>{ elem!.parentNode!.removeChild(elem!) }
  )
  carsCount()
}

export const carsCount = async () => {
  const count = document.querySelectorAll('#carsCount')
  const page = baseURL + garage + `?_page=1&_limit=7`
  const totalCarsNum = await fetch(page).then(response => response.headers.get('X-Total-Count')).catch(err => console.log(err))
  count!.forEach(elem => elem.innerHTML = `${totalCarsNum}`)
}

export const generateCarsData = () => {
  const carsBrend = ['Audi', 'BMW', 'Chery', 'Chevrolet', 'Citroen', 'Daewoo', 'Ford', 'Geely', 'Honda', 'Hyundai', 'Kia', 'LADA', 'Land Rover', 'Lexus', 'Lifan', 'Mazda', 'Mercedes',
    'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Renault', 'Skoda', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo', 'УАЗ']
  const carsModels = ['A6', 'X6', 'Amulet', 'Cruse', 'C4', 'Nexia', 'Mustang', 'Emgrand', 'Civic', 'Solaris', 'Sportage', 'Granta', 'Defender', 'IS250', 'Solano', 'MX-5', 'Maclaren',
  'Colt', 'GT-R', 'Insignia', 'Partner', 'Duster', 'Oktavia', 'Impresa', 'Vitara', 'Prius', 'Golf', 'XC-70', 'Patriot']
  const carsColors = ['#24B800','#003C8A','#F07714','#F9F200','#D6003B','#89B802','#05848A','#F03A15','#FABF14','#8F00D6']

  function getRundom(type: String[], max: number ){
    return type[Math.floor(Math.random() * max)]
  }
  const carsData = {
    name: `${getRundom(carsBrend, 29)} ${getRundom(carsModels, 30)}`,
    color: `${getRundom(carsColors, 10)}`
  }
  return carsData;

}

export const generateCars = async () => {
  for(let i = 0; i<100; i++) {
    const dataCar: object = {
    method: 'POST',
    body: JSON.stringify(generateCarsData()),
    headers: {'Content-Type': 'application/json'}
    }

    await response(baseURL + garage, dataCar)
    .then(response => {return response.json()})
    .then(data=>{carsItems(data.name, data.color, data.id)})

  }
  carsCount()
}

const getPosition = (e: HTMLElement | null) => {
  const coordinates = e!.getBoundingClientRect()
  return coordinates
}
const getDistance = (a: HTMLElement | null, b: HTMLElement | null) => {
  const aCoordinates = getPosition(a);
  const bCoordinates = getPosition(b);
  const aPosition = aCoordinates.left + aCoordinates.width / 2;
  const bPosition = bCoordinates.left + bCoordinates.width / 2;
  const distance = bPosition - aPosition;
  return distance
}




export  class MoveCar {
  animationID: number
  id: string
  step: number| null;
  trekLength: number;
  element: HTMLElement | null
  per: number
  finish: HTMLElement | null

  constructor(id: string){
    this.id = id
    this.animationID = 0
    //this.trekLength = document.documentElement.clientWidth
    this.element = document.getElementById(`car__${this.id}`)
    this.finish = document.getElementById(`finish__${id}`)
    this.trekLength = getDistance(this.element, this.finish) + 320;
    this.step = 0
    this.per = 5
  }

  carRunAnimation(){
    const animation = async () => {
      this.step!+=this.per
      this.element!.style.transform = 'translateX(' + this.step + 'px)';
      if (this.step! < this.trekLength - 250) {
        this.animationID = window.requestAnimationFrame(animation);
      } else {
        if(!winner){
          winner = true;
          const time = String(((this.trekLength / this.per) / 60).toFixed(2))
          await response(`${baseURL}${garage}${this.id}`)
          .then(response => response.json())
          .then(data => winnerModal(data.name, time))

        }

      }
    }
    return ()=>requestAnimationFrame(animation)
  }

  stopCar(){
    cancelAnimationFrame(this.animationID)
    //const element = document.getElementById(`car__${this.id}`);
    //element!.style.transform = `translateX(0px)`
  }


  startEngine = async () => {
    //let id = event.target!.id.slice(6)
    const urlStart = `${baseURL}${engine}?id=${this.id}&status=started`
    const urlDrive = `${baseURL}${engine}?id=${this.id}&status=drive`
    //const elem = document.querySelector(`#cars-items__${this.id}`)
    let params
    await response(urlStart)
    .then(response => response.json())
    //.then(this.carRunAnimation())
    .then(data => {
      this.per = Math.floor(data.velocity / 10)
    })
    .then(this.carRunAnimation())

    await response(urlDrive)
    .then(response => {
      if (response.status === 500){
      this.stopCar()
      }
    })
  }

  returnCar = () => {
    cancelAnimationFrame(this.animationID)
    const element = document.getElementById(`car__${this.id}`);
    element!.style.transform = `translateX(0px)`
    this.step! = 0
  }
}

const winners = () => {

}

export const raceMode = () => {
  const carsFromPage: any = document.querySelectorAll('.start-button')
  for (let i = 0; i < carsFromPage.length; i++) {
    carsFromPage[i].click()
  }
}
export const reset = () => {
  const carsFromPage: any = document.querySelectorAll('.stop-button')
  for (let i = 0; i < carsFromPage.length; i++) {
    carsFromPage[i].click()
  }
}



/*
export const startEngine = async (event: any) => {
  let id = event.target!.id.slice(6)
  const urlStart = `${baseURL}${engine}?id=${id}&status=started`
  const urlDrive = `${baseURL}${engine}?id=${id}&status=drive`
  const elem = document.querySelector(`#cars-items__${id}`)
  let params
  await response(urlStart)
  .then(response => response.json())
  .then(data => params = data)
  await response(urlDrive).then().catch()
  carsCount()
}
*/
