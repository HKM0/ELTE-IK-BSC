const gomba = document.querySelector('#gomb')
const ide = document.querySelector('#outhere')
gomba.addEventListener('click', koszont)
const valaszok = ["tejet", "gothokat", "altereket", "haskell-t"];
function koszont() {
    const randomValasz = valaszok[Math.floor(Math.random() * valaszok.length)];
    ide.innerHTML = `${randomValasz}`;
}
