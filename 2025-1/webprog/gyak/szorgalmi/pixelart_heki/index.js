/*
a színválasztó palettán tudjak különböző színeket választani, és azokkal tudjak a rácson megfelelő színű négyzeteket "rajzolni" kattintással. 
Amennyiben színt választok, az mindig jelenjen meg az „Actual color” sávon is.
*/
// Állapottér
let pixels = [];
let color = "#ffffffff";

//initPixels(w, h) létrehoz egy h × w üres (színkód nélküli) 2D tömböt:
function initPixels(w, h) {
  pixels = [];
  for (let i = 0; i < h; i++) {
    const row = [];
    for (let j = 0; j < w; j++) {
      row.push("");
    }
    pixels.push(row);
  }
}

function select(x, y, color) {
  pixels[y][x] = color;
}
//kattintott cellára:
function xyCoord(td) {
  //cellIndex beépített tulajdonság megadja, hanyadik oszlopban van a cella       
  const x = td.cellIndex;
  //cella közvetlen szülője a sor
  const tr = td.parentNode;
  //tr elem beépített tulajdonsága, hanyadik sor a táblázatban
  const y = tr.sectionRowIndex;
  return { x, y };
}

// UI elements
const btnGenerate = document.querySelector("#btnGenerate");
const inputWidth = document.querySelector("#width");
const inputHeight = document.querySelector("#height");
const editor = document.querySelector("#editor");
const colorPicker = document.querySelector("#color");
const colorShower = document.querySelector("#color-shower");

// HTML generálók
//HTML-táblázatot (<table>…</table>) épít össze szövegként.
//Minden row-ból készít egy <tr>…</tr> sort.
//Végigmegy az adott sor minden elemén (oszlop), minden elem helyére egy üres cellát  rak.
function genTable() {
  return `
    <table class="edit">
      ${pixels.map((row) =>
    `<tr>
          ${row.map(() => `<td></td>`).join("")}
        </tr>`
  )
      .join("")}
    </table>
  `;
}

//Event Handler
//A Generate teljesen új rácsot hoz létre a megadott mérettel (initPixels).
//újratölti az #editor tartalmát a friss táblával (genTable).
btnGenerate.addEventListener("click", onGenerate);
function onGenerate(e) {
  //valueAsNumber számként adja vissza az értéket (nem stringként).
  const w = inputWidth.valueAsNumber;
  const h = inputHeight.valueAsNumber;

  initPixels(w, h);

  editor.innerHTML = genTable();
}

editor.addEventListener("click", onCellClick);
function onCellClick(e) {
  if (e.target.matches("td")) {
    console.log(e.target);

    const { x, y } = xyCoord(e.target); // kattintott cella koordinátáit lekérem
    select(x, y, color);                 // állapot mentése a mátrixba   
    e.target.style.backgroundColor = color; //vizuálisan is megjelenítjük
  }
}

function updateColorDisplay(newColor) {
  color = newColor;
  colorShower.style.backgroundColor = newColor;
}

function updateSelectedColor(selectedColor) {
  color = selectedColor;
  colorShower.style.backgroundColor = selectedColor;
}

colorPicker.addEventListener("input", onColorChange);
function onColorChange(e) {
  updateColorDisplay(e.target.value);
}

//updateColorDisplay(colorPicker.target.valuet); // vagy vagy