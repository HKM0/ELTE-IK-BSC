const tehenek = [
  {
      "fajta" : "Holstein-fríz",
      "szin" : "fekete-fehér",
      "nem" : "bika",
      "kor": 3
  },
  {
      "fajta" : "Magyar tarka",
      "szin" : "barna-fehér",
      "nem" : "tehén",
      "kor": 5
  },
  {
      "fajta" : "Angus marha",
      "szin" : "barna",
      "nem" : "tehén",
      "kor": 10
  },
  {
      "fajta" : "Angus marha",
      "szin" : "barna",
      "nem" : "bika",
      "kor": 2
  },
  {
      "fajta" : "Holstein-fríz",
      "szin" : "fekete-fehér",
      "nem" : "bika",
      "kor": 12
  },
  {
      "fajta" : "Holstein-fríz",
      "szin" : "fekete",
      "nem" : "tehén",
      "kor": 4
  },
  {
      "fajta" : "Magyar tarka",
      "szin" : "barna",
      "nem" : "bika",
      "kor": 13
  },
  {
      "fajta" : "Angus marha",
      "szin" : "barna",
      "nem" : "bika",
      "kor": 11
  },
  {
      "fajta" : "Angus marha",
      "szin" : "barna",
      "nem" : "bika",
      "kor": 1
  }
]

const task1 = document.querySelector('#task1')
const task2 = document.querySelector('#task2')
const task3 = document.querySelector('#task3')
const task4 = document.querySelector('#task4')

// Megoldás innen
//1. A task1 azonosítójú elembe írd ki, hogy igaz-e a következő állítás: Az összes tehén idősebb, mint 2 éves.
task1.innerHTML=tehenek.filter(x=>parseInt(x["kor"])).every(x=>x>2)

//2. A task2 azonosítójú elembe írd ki, hogy hány Holstein-fríz-et látott az adatokat rögzítő hallgató!
task2.innerHTML=tehenek.filter(x=>x["fajta"]==="Holstein-fríz").length

//3. A task3 azonosítójú elembe írd ki, hogy mennyi idős a legöregebb boci!
task3.innerHTML= tehenek.map(x=>x["kor"]).reduce((acc, a)=> a>acc? acc=a: acc, 0)

//4. A task4 azonosítójú elembe írd ki, hogy egy fekete-fehér bika tud-e magának találni egy ugyanolyan színű tehenet?
task4.innerHTML= tehenek.some(x=>x["szin"]==="fekete-fehér"&&x["nem"]==="bika") && tehenek.some(x=>x["szin"]==="fekete-fehér"&&x["nem"]==="tehén")

