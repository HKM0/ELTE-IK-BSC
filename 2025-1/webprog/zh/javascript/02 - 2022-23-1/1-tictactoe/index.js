const task1 = document.querySelector('#task1');
const task2 = document.querySelector('#task2');
const task3 = document.querySelector('#task3');
const task4 = document.querySelector('#task4');

const game = [
  "XXOO",
  "O OX",
  "OOO ",
];

//1. Minden sor ugyanolyan hosszú? (true/false)
task1.innerHTML= game.map(x=>x.length).reduce((mind_jo, kovetkezo) => kovetkezo === game[0].length && mind_jo==true ? true : false, true)
//console.log(task1.textContent)

//2. Az első sorban csak X vagy O karakter van? (true/false)
const num = game[0].split("").filter(x=>x==='X').length
task2.innerHTML= num===game[0].length || num === 0

//3. X és O karakterek száma:
const counts = game.join('').replace(" ","").split("").reduce((a,b) => {
  b==="X" ? a.x++ : a.o++
  return a     
}, {x:0, o:0})

task3.innerHTML = `'X': ${counts.x} 'O': ${counts.o}`;
console.log(counts);

//4. Egy olyan sor indexe, amelyben három O vagy három X van egymás mellett
//game.findIndex(x=>x.includes("OOO","XXX"))
const x=game.findIndex(x=>(x.includes("XXX")))
const y=game.findIndex(x=>(x.includes("OOO")))
if (x!=-1){
task4.innerHTML=x
}
else if (y!=-1){
  task4.innerHTML=y
}else{
  task4.innerHTML="Nincs ilyen"
}