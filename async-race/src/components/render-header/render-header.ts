export default function header(): void {
  const body = document.querySelector('body');
  const headerElement = document.createElement('header');

  headerElement.innerHTML = `
    <div class="header-wrapper">
      <input type="button" id="toGarage" class="button button__green" value="to garage">
      <input type="button" id="toWinners" class="button button__green" value="to winners">
    </div>
  `;
  body?.prepend(headerElement);
}
