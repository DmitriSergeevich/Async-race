import { winnerSwitcher } from '../response/response'
import './winner-modal.scss'

export function winnerModal(name: string, time: string) {
  const garagePage = document.querySelector('.page-garage')
  //const body = document.querySelector('body')
  const receWinner = document.createElement('div')
  receWinner.classList.add('receWinner')
  receWinner.innerHTML = `
    <span>Race winner:</span><br>
    <span>${name}</span><br>
    <br>
    <span>Its time:</span><br>
    <span>${time} sek</span>
  `
  garagePage?.append(receWinner)
  receWinner?.addEventListener('click', () => {
    garagePage!.removeChild(receWinner)
    winnerSwitcher(false)
  })
}
