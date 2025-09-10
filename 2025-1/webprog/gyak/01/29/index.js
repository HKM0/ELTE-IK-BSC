const temps = [3.4, 1.2, -0.7, -2, 20, 6,]

//a
const fagy = temps.filter(t=>t<0)
//console.log(`${fagy} \tÖsszesen: ${fagy.length} darab van.`)

//b
const fagycelsius = temps.map(elem => `${elem} °C`);
//console.log(fagycelsius)

//c
const max = Math.max(...temps)
const max2 = temps.reduce((m, akt) => m > akt ? m : akt, temps[0]);
//console.log(max)
//console.log(max2)

//f
logical = temps.every(x => x > 0) ? "igen": "nem"
logical2 = temps.some(y => y <= 0) ? "nem":"igen"
//console.log(logical)
//console.log(logical2)



//d
const tmp = temps.filter(a => a < 20).length;
console.log(tmp)
//e
console.log(temps.some(x=>x>40)? "igen":"nem")
//g
console.log(temps.filter(x => x>10)[0])

