const URL = 'http://127.0.0.1:3000/garage/';
interface Ibody {
  method: string,
  body: string,
  headers: any
}

class UpdateCar {
  carID = '';

  selectedCar(element: HTMLButtonElement | null) {
    const id = element!.id.slice(7);
    this.carID = id;
  }

  async updateCar() {
    const updateTetext: HTMLInputElement | null = document.querySelector('#update-text');
    const updatetColor: HTMLInputElement | null = document.querySelector('#updateColor');
    const carColor = document.querySelectorAll(`#car-color__${this.carID}`);
    const carName: HTMLElement | null = document.querySelector(`#carName__${this.carID}`);
    const updateURL = `${URL}${this.carID}`;
    const car = {
      name: updateTetext?.value,
      color: updatetColor?.value,
    };
    const dataCar: Ibody = {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: { 'Content-Type': 'application/json' },
    };

    await fetch(updateURL, dataCar).then((resp) => resp.json())
      .then(
        () => {
          for (let i = 0; i < carColor.length; i++) {
            const element: any = carColor[i];
            element.style.fill = updatetColor!.value;
          }
          if (carName) {
            carName.innerHTML = updateTetext!.value;
          }
        },
      );
    this.carID = '';
  }
}

export const updateCar = new UpdateCar();
