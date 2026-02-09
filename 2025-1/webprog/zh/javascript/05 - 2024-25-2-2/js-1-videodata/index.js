const taskA = document.querySelector('#taskA')
const taskB = document.querySelector('#taskB')
const taskC = document.querySelector('#taskC')
const taskD = document.querySelector('#taskD')
const taskE = document.querySelector('#taskE')

//1. A taskA azonosítójú elembe írd ki egy 2000 előtti videó címét. Feltételezheted, hogy létezik ilyen.
taskA.innerHTML=data.filter(x=>x.year<2000)[0].title

//2. A taskB azonosítójú elembe sorold fel, hogy mely videók szereztek 100 milliónál több megtekintést!
taskB.innerHTML=data.filter(x=>x.views>100).map(x=>x.title).join(", ")

//3. A taskC azonosítójú elembe írd ki, hogy hány videó címében szerepel a Love szó! Feltételezheted, hogy mindegyikben pontosan így szerepel (nagy L, kis ove).
taskC.innerHTML=data.filter(x=>x.title.includes("Love")).length

//4. A taskD azonosítójú elembe írd ki, átlagosan hány megtekintése van a 2024-es videóknak! Az eredményt kerekítsd két tizedes pontosságra!
//  Feltételezheted, hogy nem 0 db ilyen van.
//  Részpontért: Kerekítés nélkül.
ketezer_huszon_negyesek=data.filter(x=>x.year===2024)
megtekintesek_ossz=ketezer_huszon_negyesek.map(x=>x.views).reduce((sum, a)=>sum+a)
taskD.innerHTML=Math.round(megtekintesek_ossz/(ketezer_huszon_negyesek.length))

//5.  A taskE azonosítójú elembe írd ki, hogy van-e olyan zeneszám, aminek a címében szerepel számjegy.
// Nem a videó teljes címe a kérdés, hanem a videó címében a kötőjel utáni "Zene Címe" rész.
// A válasz lehet Igen / Nem, true / false, 0 / 1 vagy hasonló, logikus és beszédes eredmény.
// Ne ragadj le ennél a részfeladatnál, ha nem jön az ötlet, inkább lépj tovább a következő feladatra.
szamok=["0","1","2","3","4","5","6","7","8","9"]
video_kotojel_utan=data.map(x=>x.title.split("-")[1].replace(" ","").split(""))
a = video_kotojel_utan.filter(x=>x.filter(y=>szamok.includes(y)===true).length>=1).length===0
taskE.innerHTML=a