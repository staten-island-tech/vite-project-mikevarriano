import { GS } from "./cars.js";
let GrandSelection = GS;
import { Theme } from "./themes.js";
const DOM = {
  root: document.documentElement,
  TM: document.getElementById("ThemeMenu"),
  mommy: document.getElementById("mommy"),
  forSaleCheck: document.getElementById("forSaleCheck"),
  cheapCheck: document.getElementById("cheapCheck"),
};

let currentTheme = Theme["Blue Theme"];

function changeTheme(theme) {
  currentTheme = theme;
  Object.keys(theme).forEach(function (key) {
    DOM.root.style.setProperty(key, theme[key]);
  });
}

changeTheme(currentTheme);

function loadThemeButtons() {
  Object.keys(Theme).forEach((key) => {
    let newDIV = document.createElement("button");
    newDIV.className = "themeBu";
    newDIV.onclick = function () {
      changeTheme(Theme[key]);
    };
    newDIV.innerHTML = key;
    DOM.TM.appendChild(newDIV);
  });
}
loadThemeButtons();
function boolToForSale(boolean) {
  if (boolean) {
    return '<span class="good">Up for Sale. </span>';
  }
  return '<span class="bad">Not Purchasable </span>';
}
let filterByCheap = false;
let filterByForSale = false;

function loadCards() {
  let filterBy = function (element) {
    return (
      (!filterByCheap || element.price < 20000) &&
      (!filterByForSale || element.forSale)
    );
  };
  DOM.mommy.innerHTML = "";

  GrandSelection.filter(filterBy).forEach((card) =>
    DOM.mommy.insertAdjacentHTML(
      "beforeend",
      `
  <div class="TC">
    <h3>${card.name} ${card.model}</h3>
    <div class="stats">
      <div class="image" style="background-image:${card.img}"></div>
      <div class="text">
        <p>Price: $${card.price}</p>
        <p>Horsepower: ${card.horsepower}</p>
        <p>${boolToForSale(card.forSale)}</p>
        <p>${card.bio}</p>
      </div>
    </div>
  </div>
  `
    )
  );
}
loadCards();
function toggleForSaleFilter() {
  filterByForSale = !filterByForSale;
  loadCards();
}
function toggleCheapFilter() {
  filterByCheap = !filterByCheap;
  loadCards();
}

DOM.forSaleCheck.addEventListener("click", toggleForSaleFilter);
DOM.cheapCheck.addEventListener("click", toggleCheapFilter);
