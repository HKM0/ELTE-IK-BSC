
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

function getBooksByYear(ev) {
    return library.filter(b => b.ev === ev);
}
const form = document.querySelector('form')
const lista = document.querySelector('#lista')
const evszam = document.querySelector('#evszam')

form.addEventListener('submit', onSubmit)

function onSubmit(e) {
    console.log(e);
e.preventDefault(); // az alapértelmezett műveletet akadályozza meg, pl submit estén az elküldés, stb.

const ev=Number(evszam.value)

if(isNaN(ev)){

    lista.innerHTML="Kérlek, érvényes...."
    return
    }
else{
    const talalatok=getBooksByYear(ev)
    lista.innerHTML = talalatok.length ? `<ul>${talalatok.map(konyv => `<li>${konyv.cim}</li>`).join('')}</ul>` : 'Nincs találat.';
    }
}














//+feladat két egymásbaágyazott tömbfüggvényre:
//A 1990 után megjelent könyvek címei nagybetűsen consol-ra kiírva
const eredmeny2 = library
  .filter(konyv => konyv.ev > 1990)
  .map(konyv => konyv.cim.toUpperCase());
/*ha egyenként írja ki a konzolra: .filter(k => k.ev > 1990)              // 1990 utáni könyvek
.map(k => k.cim.toUpperCase())         // címek nagybetűsen
.forEach(cim => console.log(cim));     // egyesével kiíratva*/

//console.log(eredmeny2);
//Van-e olyan könyv, aminek a címe 10 karakternél hosszabb, és „9”-essel kezdődik az ISBN-je?
const eredmeny3 = library
  .some(k => k.cim.length > 10 && k.isbn.startsWith("9"));

//console.log(eredmeny3);