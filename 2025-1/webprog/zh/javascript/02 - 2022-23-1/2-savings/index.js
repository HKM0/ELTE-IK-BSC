const form = document.querySelector("form");
const divContainer = document.querySelector(".container");

function update(){
//1. Számold ki a tavalyi év összfogyasztását (M) és írd ki a konzolra! Ehhez vedd az összes inputot, olvasd ki a data-consumption értékeket számként, majd add össze!
    const szelektorok = document.querySelectorAll("input[type=range]")
    var M = 0
    szelektorok.forEach(elem => {
        M= M + parseInt(elem.dataset.consumption) //az <input ... data-consumption="60"...> részből adatok
    });
    console.log(M)

//2. Minden input esetén számold ki az aktuális fogyasztását (ci) és írd ki a konzolra! Ehhez olvasd ki az input aktuális értékét (value), oszd el a maximális értékkel (max attribútuma az inputnak) és szorozd meg a data-consumption értékével! (ci=(value/max)*consumption) Megjegyzés: az oldal betöltésekor a ci értéke megegyezik a data-consumption értékével, mivel mindegyik csúszka maximumon áll.

    ci_ertekek=[]
    for (i=0; i<szelektorok.length; i++){
        const e=szelektorok[i]
        ci_ertekek[i] = (e.value/e.max)*Number(e.dataset.consumption)
    }
    //console.log(ci_ertekek)

//3. Minden inputhoz tartozik egy label elem az űrlap alatti diagramon. A label elem for attribútuma mutatja, hogy melyik id-jú inputhoz tartozik. Minden input esetén állítsd be a hozzá tartozó label elem szélesség stílustulajdonságát ci / M * 100 százalékra (pl. 65%)!
    for (i=0; i<szelektorok.length; i++){
        const e=szelektorok[i]

        /*
          <div class="container">
            <label for="fe">FE</label>
            ...
        */
        divContainer.querySelector(`label[for=${e.id}]`).style.width=`${ci_ertekek[i]/M*100}%`
    }
}
//4. Ha bármely csúszka értékét változtatjuk (input esemény), akkor aktualizáljuk a diagramot! (Azaz az első három pontot újra és újra hajtsuk végre!) Technikai segítség: elég az űrlap szintjén figyelni az input eseményeket, és akkor újraszámolni az értékeket.
update()
form.addEventListener("input",update)
