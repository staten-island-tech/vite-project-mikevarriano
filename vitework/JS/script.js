import { GS } from "./cars.js";
let GrandSelection = GS;
import { Theme } from "./themes.js";
//constant (object)
const DOM = {
  root: document.documentElement,
  TM: document.getElementById("ThemeMenu"),
  mommy: document.getElementById("mommy"),
  forSaleCheck: document.getElementById("forSaleCheck"),
  cheapCheck: document.getElementById("cheapCheck"),
  bluebutton: document.getElementById("blue"),
  greybutton: document.getElementById("grey"),
  pinkbutton: document.getElementById("pink")
};

let currentTheme = Theme[0];//current theme is a variable and I am setting it to an object (Blue Theme)

function changeTheme(theme) {
  currentTheme = theme;
  Object.keys(theme).forEach(function (key) {//foreach(for every name of the property in the theme) creates array of keys
    DOM.root.style.setProperty(key, theme[key]);//setProperty overrides my stylecss code by setting the property to the same key value pair
  });
}//key(theme) gets the value from the key

changeTheme(currentTheme);//theme will always match the current theme
DOM.bluebutton.addEventListener("click", function(){
  changeTheme(Theme[0])
})
DOM.greybutton.addEventListener("click", function(){
  changeTheme(Theme[2])
})
DOM.pinkbutton.addEventListener("click", function(){
  changeTheme(Theme[1])
})
function boolToForSale(boolean) {//if for sale is true return good if for sale is false return bad
  if (boolean) {
    return '<span class="good">Up for Sale. </span>';
  }
  return '<span class="bad">Not Purchasable </span>';
}
let filterByCheap = false;
let filterByForSale = false;

function loadCards() {
  
  DOM.mommy.innerHTML = "";

  GrandSelection.filter(card=> {
    let good = true
    if(filterByCheap&&card.price>20000){
      good=false
    }
    if(filterByForSale&&card.forSale== false){
      good=false
    }
   return good
  }).forEach((card) =>
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
  filterByForSale = !filterByForSale;//reverses checkbox
  loadCards();
}
function toggleCheapFilter() {
  filterByCheap = !filterByCheap;
  loadCards();
}

DOM.forSaleCheck.addEventListener("click", toggleForSaleFilter);
DOM.cheapCheck.addEventListener("click", toggleCheapFilter);
