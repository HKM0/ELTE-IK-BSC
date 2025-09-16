const gomba = document.querySelector('#gomb')
const ide = document.querySelector('#outhere')
gomba.addEventListener('click', kattintas)
const bemegy = document.querySelector('#bemenet')
function kerulet(r){
    return 2*r*Math.PI
}
function kiir(a){
    ide.innerHTML = `${a}`;
}
function kattintas(){
    bemegy.classList.toggle("hibas",isNaN(bemegy.value))
    const value = Number(bemegy.value);
    isNaN(value) ? kiir("Csak számot adj meg!"): 
    bemegy.value.trim()==="" ? kiir("Nem adtál meg értéket!"):
    kiir(kerulet(value));
}

