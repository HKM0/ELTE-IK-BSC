// ========= Utility functions =========
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// ========= Selected elements =========
const inputGuess = document.querySelector("#inputGuess");
const form = document.querySelector("form");
const tableGuesses = document.querySelector("#guesses");
const divTheWord = document.querySelector("details > div");
const spanError = document.querySelector("#error");
const btnGuess = document.querySelector("form > button");
const divEndOfGame = document.querySelector("#end-of-game");
const btnRestart = document.querySelector("#restart");

// ========= Solution =========
//1.  Válassz egy véletlen szót a wordList tömbből, és jelenítsd meg a details elemen belüli div-ben (divTheWord)! (Ezt használhatod később a megoldás megtekintéséhez.)
selected_word = wordList[random(0,wordList.length-1)]
divTheWord.innerHTML=selected_word

//2. Jelenleg a beviteli mezőben ENTER-t nyomva vagy a gombra kattintva az űrlap elküldésre kerül. Akadályozd meg ezt a viselkedést JavaScript segítségével! Az űrlap elküldésekor a tényleges küldés helyett jelöld ki az beviteli mezőben lévő szöveget és töröld az űrlapon belüli span elem tartalmát!
form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputGuess.select();
  spanError.innerHTML = "";

  //3. Az űrlap elküldésekor ellenőrizd, hogy a beírt szó pontosan 5 karakterből áll-e, és ha nem, akkor jelezd ezt az űrlapon belüli span elemben ("The length of the word is not 5!")!
  if (inputGuess.value.length !== 5) {
    spanError.innerHTML = "The length of the word is not 5!";
    return;
  }

  //4. Az űrlap elküldésekor ellenőrizd, hogy a beírt szó szerepel-e a wordList tömbben, és ha nem, akkor jelezd ezt az űrlapon belüli span elemben ("The word is not considered acceptable!")!
  if (!wordList.includes(inputGuess.value)) {
    spanError.innerHTML = "The word is not considered acceptable!";
    return;
  }

  //5. Számold meg, hogy a kitalált és a tippelt szóban hány karakter szerepel ugyanazon a helyen, majd írd ki ezt a számot konzolra!
  const tipplet = inputGuess.value.split("");
  const kitalalt = selected_word.split("");

  let count = 0;
  for (let i = 0; i < 5; i++) {
    if (tipplet[i] === kitalalt[i]) {
      count++;
    }
  }

  console.log(count);

  //6. A táblázat első soraként szúrd be a tippelt szót és a hozzá tartozó egyezőségi számot!
  const newRow = `<tr><td>${tipplet.join("")}</td><td>${count}</td></tr>`;
  tableGuesses.innerHTML = newRow + tableGuesses.innerHTML;

  //7. Ha kitaláltuk a szót, akkor azt jelezzük a táblázatsorban a correct stílusosztállyal, és jelenítsük meg az end-of-game azonosítójú div-et!
  if (count === 5) {
    divEndOfGame.style.display = "block";
  }
});
