const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const madar = {
    x: 10,
    y: canvas.height / 2 - 30,
    width: 50,
    height: 30, 
    ay: 300, // y irányú gyorsulás, 
    vy: -300 // y irányú sebesség
};

// kep helyettesites logika
const kepek = {
    hatter: new Image(),
    madar: new Image(),
    oszlop: new Image()
};
kepek.hatter.src = "bg.png";
kepek.madar.src = "bird.png";
kepek.oszlop.src = "column.png";




let elozoIdo = 0;
const oszlopok = [];
//mekkora rést (átrepülő nyílást) hagyunk a két oszlop között, amin a madár átrepülhet
const RES = 150; // px
const OSZLOP_TAVOLSAG = 300; // px
const OSZLOP_SEBESSEG = -200; // px
let vege = false;

// Start  
function jatekciklus(most = 0) {
    if (!vege) {
        //requestAnimationFrame megkéri a böngészőt, hogy következő újrarajzolás előtt hívja meg újra ezt a függvényt, automatikusan átad neki egy paramétert: az aktuális időbélyeget (timestamp), ezredmásodpercben mérve a dokumentum betöltése óta
        requestAnimationFrame(jatekciklus);
        const dt = (most - elozoIdo) / 1000; // ms->s
        //kb 16-17 msecként (=1/60mp) nőnek, mert a böngésző ennyi idő után rajzol új képkockát
        //console.log(most)
        elozoIdo = most;

        //console.log(dt);
        //frame független lesz a mozgás, mert minden dt-től függ
        valtoztat(dt);
        rajzol();
    }
}

function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function utkozikE(a, b) {
    // a és b téglalap ütközik-e?
    return !(
        //b teljesen a fölött
        b.y + b.height < a.y ||
        //a teljesen b bal oldalán
        a.x + a.width < b.x ||
        //a teljesen b fölött
        a.y + a.height < b.y ||
        //b teljesen a bal oldalán
        b.x + b.width < a.x
    );
}

function valtoztat(dt) {
    //itt frissitek
    // madár változtatása
    //a madár folyamatosan gyorsul lefelé (gravitáció miatt),és a pozíciója minden frame-ben ehhez igazodik,
    // ha kattintasz , akkor vy negatív irányba változik — ettől „ugrik”.
    // a = v/t, v = a*t, dv = a*dt
    // v = s/t, s = v*t, ds = v*dt
    //madar függőleges sebessége = függőleges gyorsulása * előző képkocka óta eltelt idő
    madar.vy += madar.ay * dt;
    //madar függőleges pozíciója= függőleges sebesség * eltelt idő (pozitív: esik, negatív: felfele repül)
    madar.y += madar.vy * dt;

    // régi oszlopok eldobása  a tömbből a memória és sebesség miatt, kettő törlök egyszerre, mert párban érkeznek
    if (oszlopok.length > 20) {
        oszlopok.shift();
        oszlopok.shift();
    }
    // oszlopok hozzáadása
    const utolso = oszlopok[oszlopok.length - 1];
    //üres a tömb, vagy a rés az utolsó oszlop és a képernyő jobb széle között>oszlop_tavolsag, azaz 
    // az utolsó oszlop már elég messze van a vászon jobb szélétől akkor hozz létre új oszlopokat
    if (!utolso || canvas.width - utolso.x > OSZLOP_TAVOLSAG) {
        // felső oszlop magassága + RES + alsó oszlop mag = canvas.height
        const felsoOszlopMagassaga = random(10, 300);

        oszlopok.push(
            {
                //felső oszlop
                x: canvas.width,
                y: 0,
                width: 50,
                height: felsoOszlopMagassaga
            },
            {
                //alsó oszlop
                x: canvas.width,
                y: felsoOszlopMagassaga + RES,
                width: 50,
                height: canvas.height - RES - felsoOszlopMagassaga
            }
        );
    }

    // oszlopok mozgatasa
    for (const oszlop of oszlopok) {
        oszlop.x += OSZLOP_SEBESSEG * dt;
        if (utkozikE(madar, oszlop)) {
            vege = true;
        }
    }
}
function rajzol() {
    //itt megjelenítek
    // háttér
    ctx.drawImage(kepek.hatter, 0, 0, canvas.width, canvas.height);

    // madár
    ctx.drawImage(kepek.madar, madar.x, madar.y, madar.width, madar.height);

    // oszlopok
    oszlopok.forEach((oszlop) => {
        ctx.drawImage(kepek.oszlop, oszlop.x, oszlop.y, oszlop.width, oszlop.height);
    });
    
    // vége  
    if (vege) {
        ctx.fillStyle = "red";
        ctx.font = "100px serif";
        /*ctx.textAlign = "center";
ctx.textBaseline = "middle";*/
        ctx.fillText("Vége", canvas.width / 2, canvas.height / 2);
    }
}
jatekciklus();
        

document.addEventListener("keydown", bill);
function bill(e) {
    madar.vy += -200;
    //tetejen megy tul
    if (madar.y < 0) {
        madar.y = 0;
    }
    // aljan megy tul
    if (madar.y + madar.height >= canvas.height) {
        madar.y = canvas.height - madar.height;
        madar.vy = 0;
    }
}

