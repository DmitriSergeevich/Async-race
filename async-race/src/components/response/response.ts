import carsItems from '../cars-items/cars-items'
const baseURL = 'http://127.0.0.1:3000/'
const garage = "garage"

export const response = async (url: string, data?: object) => await fetch(url, data)

export const createCar = () => {
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

  response(baseURL + garage, dataCar).then(response => {return response.json()}).then(data=>{carsItems(data.name, data.color, data.id)})
  creatTetext!.value = ''
  creatColor!.value = ''
}

