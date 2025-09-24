
const library = [
    {
        szerzo: "J. K. Rowling",
        cim: "Harry Potter és a bölcsek köve",
        ev: 1997,
        kiado: "Bloomsbury",
        isbn: "978-963-07-3456-0"
    },
    {
        szerzo: "George Orwell",
        cim: "1984",
        ev: 1949,
        kiado: "Secker & Warburg",
        isbn: "978-0-452-28423-4"
    },
   {
    szerzo: "Neil Gaiman",
    cim: "Neverwhere",
    ev: 1997,
    kiado: "BBC Books",
    isbn: "978-0-7475-3270-8"
}
];

function getBooksByYear(a) {
    const year = Number(a);
    return library.filter(x => x.ev === year).map(x => x.cim);
}

function kiir(a) {
    ide.innerHTML = a.length ? `<ul>${a.map(cim => `<li>${cim}</li>`).join('')}</ul>` : 'Nincs találat.';
}

const szam = document.querySelector("#evszam");
const gomba = document.querySelector('#listazz');
const ide = document.querySelector('#lista');
gomba.addEventListener('click', kattintas);

function kattintas() {
    kiir(getBooksByYear(szam.value));
}












function released_after_1990(){
    console.log(library.filter(x => x.ev > 1990).map(x => x.cim.toUpperCase()).join(', '))
}
function isbnfilter()
{
    console.log(library.filter(x=>x.cim.length>10 &&x.isbn.charAt(0)==9).length ? "Van":"Nincs")
}
isbnfilter()
released_after_1990()
//+feladatok
//A 1990 után megjelent könyvek címei nagybetűsen consol-ra kiírva
//Van-e olyan könyv, aminek a címe 10 karakternél hosszabb, és „9”-essel kezdődik az ISBN-je?
