function veletlenKozott(alja, teteje) {
  return Math.floor(Math.random() * (teteje - alja) + alja);
}

const tablazatsor = document.querySelector("table tr");
const cellak = document.querySelector("#cellak");
const hatar = document.querySelector("#hatar");
const abrazolGomb = document.querySelector("#abrazol");
const szamolGomb = document.querySelector("#szamol");

// ========================================================

