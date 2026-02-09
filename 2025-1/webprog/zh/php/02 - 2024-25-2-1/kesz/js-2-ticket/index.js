const seatingTable = document.querySelector('#seating')
const rowNum = 10
const colNum = 14

//                    0.   1.   2.   3.
const sectorCosts = [250, 350, 200, 100]
let seatsTaken = [0, 0, 0, 0]

sectorCosts.forEach((price, index) => {
    document.querySelector(`#sector-${index}-cost`).innerText = price
})

for (let rowi = 0; rowi < rowNum; rowi++) {
    const row = document.createElement('tr')
    for (let coli = 0; coli < colNum; coli++) {
        
        let sector = 3
        if (rowi < 3) sector = 1
        else if (rowi < 6) sector = 2

        const col = document.createElement('td')
        col.classList.add(`sector-${sector}`, 'seat')
        col.dataset.sector = sector
        row.appendChild(col)
    }
    seatingTable.appendChild(row)
}

// Az elegáns megoldás egy szép paraméteres modifySeat függvény lenne, ld. index2.js
function updateTable() {
    sectorCosts.forEach((price, index) => {
        document.querySelector(`#sector-${index}-amount`).innerText = seatsTaken[index]
        document.querySelector(`#sector-${index}-total`).innerText = seatsTaken[index] * price
    })
    let sum = 0
    for (const sector in seatsTaken) {
        sum += seatsTaken[sector] * sectorCosts[sector]
    }
    document.querySelector(`#total`).innerText = sum
}

document.querySelector('#add-standing').addEventListener('click', e => {
    seatsTaken[0]++
    updateTable()
})
document.querySelector('#sub-standing').addEventListener('click', e => {
    if(seatsTaken[0] == 0) return
    seatsTaken[0]--
    updateTable()
})

document.querySelector('#purchase').addEventListener('click', e => {
    seatingTable.querySelectorAll('.selected').forEach(seat => {
        seat.classList.remove('selected')
        seat.classList.add('taken')
    })
    seatsTaken = [0, 0, 0, 0]
    updateTable()
})

// Delegálás nélkül is lehet, ld. index2.js
delegate(seatingTable, '.seat', 'click', (event, seat) => {
    if (seat.classList.contains('taken')) return
    const num = seat.classList.toggle('selected') ? 1 : -1 // Bár inkább if(contains selected){műveletek, classlist.remove}else{műveletek, classlist.add} szokott a jellemző lenni.
    const sector = parseInt(seat.dataset.sector)
    seatsTaken[sector] += num
    updateTable()
})

function delegate(parent, child, when, what) {
    function eventHandlerFunction(event) {
        let eventTarget = event.target;
        let eventHandler = this;
        let closestChild = eventTarget.closest(child);

        if (eventHandler.contains(closestChild)) {
            what(event, closestChild);
        }
    }

    parent.addEventListener(when, eventHandlerFunction);
}