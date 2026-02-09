const seatingTable = document.querySelector('#seating')
const rowNum = 10
const colNum = 14

//                    0.   1.   2.   3.
const sectorCosts = [ 250, 350, 200, 100]
const seatsTaken  = [ 0,   0,   0,   0  ]

sectorCosts.forEach((price, index) => {
    document.querySelector(`#sector-${index}-cost`).innerText = price
})

for(let rowi = 0; rowi < rowNum; rowi++) {
    const row = document.createElement('tr')
    for(let coli = 0; coli < colNum; coli++) {
        const col = document.createElement('td')
        let sector = 3
        if(rowi < 3){
            sector = 1
        } else if(rowi < 6) {
            sector = 2
        }
        col.classList.add(`sector-${sector}`)
        col.addEventListener('click', e => {
            if(col.classList.contains('taken')) return
            modifySeat(sector, col.classList.toggle('selected'))
        })
        row.appendChild(col)
    }
    seatingTable.appendChild(row)
}

function delegate(parent, child, when, what){
    function eventHandlerFunction(event){
        let eventTarget  = event.target;
        let eventHandler = this;
        let closestChild = eventTarget.closest(child);

        if(eventHandler.contains(closestChild)){
            what(event, closestChild);
        }
    }

    parent.addEventListener(when, eventHandlerFunction);
}


function modifySeat(sector = 0, add = true) {
    setSeat(sector, seatsTaken[sector] + (add ? 1 : -1))
}

function setSeat(sector = 0, value = 0) {
    seatsTaken[sector] = value
    document.querySelector(`#sector-${sector}-amount`).innerText = seatsTaken[sector]
    document.querySelector(`#sector-${sector}-total`).innerText = seatsTaken[sector] * sectorCosts[sector]
    let sum = 0
    for(const sector in seatsTaken) {
        sum += seatsTaken[sector] * sectorCosts[sector]
    }
    document.querySelector(`#total`).innerText = sum
}

document.querySelector('#add-standing').addEventListener('click', e => modifySeat(0, true))
document.querySelector('#sub-standing').addEventListener('click', e => {
    if(seatsTaken[0] > 0) modifySeat(0, false)
})

document.querySelector('#purchase').addEventListener('click', e => {
    setSeat(0,0)
    setSeat(1,0)
    setSeat(2,0)
    setSeat(3,0)
    seatingTable.querySelectorAll('.selected').forEach(seat => {
        seat.classList.remove('selected')
        seat.classList.add('taken')
    })
})