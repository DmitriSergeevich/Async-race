import './header.scss';

export default function header() {
  const body = document.querySelector('body')
  const header = document.createElement('header')

  header.innerHTML= `
    <div class="header-wrapper">
      <input type="button" id="toGarage" class="button button__green" value="to garage">
      <input type="button" id="toWinners" class="button button__green" value="to winners">
    </div>
  `
  body?.prepend(header)
}
