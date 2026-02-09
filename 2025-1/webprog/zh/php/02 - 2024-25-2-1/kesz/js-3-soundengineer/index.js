const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const backgroundImage = new Image()
backgroundImage.src = 'background.png'
backgroundImage.addEventListener('load', drawScene)

// Ezt a változót csak a g. feladatnál állítsd át true-ra, máskülönben bonyolítani fogja az életedet.
let simpleMode = false


// Ezt a függvényt minden input eseményre meghívja az összes oldalsó range slider.
function xdrawScene() {
    drawAllSpeakers() // Ezt ne nevezd át, ez nem az eggyel lentebbi drawSpeaker függvény.
}

// Ezt a függvényt a drawAllSpeakers fogja meghívogatni.
function xdrawSpeaker(x, y, range, cone, rotation, type) {
}

function drawScene() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(backgroundImage, 0, 0)
    drawAllSpeakers()
}


function drawSpeaker(x, y, range, cone, rotation, type) {
    const start = ((rotation - cone / 2) * Math.PI) / 180
    const end = ((rotation + cone / 2) * Math.PI) / 180

    context.beginPath()
    context.moveTo(x, y)
    context.arc(x, y, range, start, end)
    context.closePath()

    const color = {
        subwoofer: 'rgba(255, 100, 100, 0.3)',
        midrange: 'rgba(100, 255, 100, 0.3)',
        tweeter: 'rgba(100, 100, 255, 0.3)'
    } [type]

    context.fillStyle = color
    context.fill()

    context.beginPath()
    context.arc(x, y, 5, 0, Math.PI * 2)
    context.fillStyle = 'black'
    context.fill()
}








//////////////////////////////////////////////////////
// 🛑 INNNETŐL LEFELE SEMMIHEZ NEM KELL NYÚLNOD 🛑 //
//////////////////////////////////////////////////////




















const speakerTypes = {
    subwoofer: {
        cone: 50,
        range: 350
    },
    midrange: {
        cone: 80,
        range: 280
    },
    tweeter: {
        cone: 110,
        range: 200
    }
}

const speakers = []
let id = 0
for (const [type, props] of Object.entries(speakerTypes)) {
    let amountOfEachSpeaker = 3
    if (simpleMode) {
        if (type != 'subwoofer') continue
        amountOfEachSpeaker = 1
    }
    for (let i = 0; i < amountOfEachSpeaker; i++) {
        speakers.push({
            id: `${type}-${i + 1}`,
            type,
            ...props,
            x: 100 + i * 80,
            y: 100 + Object.keys(speakerTypes).indexOf(type) * 100,
            rotation: 0
        })
    }
}

const controlsContainer = document.getElementById('controls-container')

speakers.forEach(speaker => {
    const group = document.createElement('div')
    group.className = 'control-group'
    group.innerHTML = `<strong>${speaker.id}</strong>`;

    ['x', 'y', 'rotation'].forEach(prop => {
        const min = prop === 'rotation' ? 0 : 0
        const max = prop === 'rotation' ? 360 : (prop === 'x' ? 515 : 520)
        const label = document.createElement('label')
        label.className = 'slider-label'
        label.innerHTML = `
            ${prop.toUpperCase()}:
            <input type="range" min="${min}" max="${max}" value="${speaker[prop]}" data-id="${speaker.id}" data-prop="${prop}">
            <span class="value-display">${speaker[prop]}</span>
        `
        group.appendChild(label)
    })

    controlsContainer.appendChild(group)
})

function drawAllSpeakers() {
    speakers.forEach(speaker => drawSpeaker(
        speaker.x,
        speaker.y,
        speaker.range,
        speaker.cone,
        speaker.rotation,
        speaker.type
    ))
}

controlsContainer.addEventListener('input', (event) => {
    const input = event.target
    if (input.type !== 'range') return

    const speaker = speakers.find(s => s.id === input.dataset.id)
    const prop = input.dataset.prop
    speaker[prop] = Number(input.value)

    // Update the displayed number
    const valueDisplay = input.nextElementSibling
    if (valueDisplay) valueDisplay.textContent = input.value

    drawScene()
})