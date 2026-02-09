const taskA = document.querySelector('#taskA')
const taskB = document.querySelector('#taskB')
const taskC = document.querySelector('#taskC')
const taskE = document.querySelector('#taskD')
const taskF = document.querySelector('#taskE')


taskA.innerText = participants.filter(p => p.nation == 'CHE').length
taskB.innerText = participants.some(p => p.nation === 'HUN')
taskC.innerText = participants.find(p =>  p.type = 'band' && (p.name.split(' ').length >= 3)).name

// 4. és 5. feladatot gyorsabb lehet procedurálisan megoldani, főleg a Prog ismeretekre építve.
// (de persze tömbfüggvényekkel funkcionálisan is lehet, ha valaki biztos a dolgában, főleg a reduce-t és a map-et okosan kihasználva gyorsan megírható)
// Ide próbáltam középutas megoldást írni, amihez hasonlókat látni szoktam ZH-kon.

const taskEnations = []
for(const participant of participants) {
    if(!taskEnations.includes(participant.nation)) taskEnations.push(participant.nation) // +1 pont szűrni az egyedieket
}
taskE.innerText = taskEnations
    .map(code => nations[code]) // +1 pont a kódból országnevet csinálni
    .join()


const max = { num: -Infinity, nation: '' }
for(const nation of taskEnations) {
    const num = participants.filter(p => p.nation == nation).length
    if(max.num < num){
        max.num = num
        max.nation = nation
    }
}
taskF.innerText = nations[max.nation] // +1 pont a kódból országnevet csinálni