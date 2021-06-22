export const garagePage = `
  <section class="controls">
    <form>
      <div class="input-items">
        <input type="text" id="create-text" class="input-text" maxlength="20" minlength="1" required>
        <input type="color" class="input-color" id="createColor" name="createColor" value="#ffffff">
        <input type="button" id="create" class="button button__blue" value="create">
      </div>
      <div class="input-items">
        <input type="text" id="update-text" class="input-text" maxlength="20" minlength="1" required>
        <input type="color" id="updateColor" name="updateColor" value="#ffffff">
        <input type="button" id="update" class="button button__blue" value="update">
      </div>
      <div class="controls-buttons">
        <input type="button" id="race" class="button button__green" value="race">
        <input type="button" id="reset" class="button button__green" value="reset">
        <input type="button" id="generate" class="button button__blue" value="generate">
      </div>
    </form>
  </section>
  <section class="garage">
    <h2>Garage (<span id="carsCount"></span>)</h2>
    <div class="cars-pages">
      <h3>Page #<span id="garagePageNum">1</span></h3>
      <input type="button" id="prevGarage" class="button button__green" value="< prev">
      <input type="button" id="nextGarage" class="button button__green" value="next >">
    </div>
    <div id="carsList" class="cars-list"></div>
  </section>
`;
