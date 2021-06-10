import carsItems from '../cars-items/cars-items'
const baseURL = 'http://127.0.0.1:3000/'
const garage = "garage/"
let currentPage = 1;

export const response = async (url: string, data?: object) => await fetch(url, data)

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
  const count = document.querySelector('#carsCount')
  const page = baseURL + garage + `?_page=1&_limit=7`
  const totalCarsNum = await fetch(page).then(response => response.headers.get('X-Total-Count')).catch(err => console.log(err))
  count!.innerHTML = `${totalCarsNum}`
}
