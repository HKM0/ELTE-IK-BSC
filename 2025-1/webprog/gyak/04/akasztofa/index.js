const MAX_WRONG_GUESSES = 9
let guesses = []
const buttons = "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz"
let theWord = wordList[random(0, wordList.length - 1)]

function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}
function playSound(frequency, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = frequency
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
    } catch (error) {
        console.log("Hangeffekt nem elérhető")
    }
}

function getWrongGuesses() {
    return guesses.filter(c => !theWord.includes(c))
}

function isLost() {
    return getWrongGuesses().length === MAX_WRONG_GUESSES
}

function isWon() {
    return theWord.split("").every(c => guesses.includes(c))
}

const divEnd = document.querySelector("#vege")
const divWord = document.querySelector("#szo")
const divButtons = document.querySelector("#betuk")
const divScore = document.querySelector("#eredmeny")
const buttonNewGame = document.querySelector("#ujrakezd")



function renderEnd() {
    const body = document.body
    body.classList.remove("nyer", "veszt")
    
    if (isWon()) {
        divEnd.innerHTML = "🎉 Nyertél! 🎉"
        body.classList.add("nyer")
        buttonNewGame.style.display = "inline-block"
    } else if (isLost()) {
        divEnd.innerHTML = `💀 Vesztettél! A szó: <strong>${theWord}</strong> 💀`
        body.classList.add("veszt")
        buttonNewGame.style.display = "inline-block"
    } else {
        divEnd.innerHTML = ""
        buttonNewGame.style.display = "none"
    }
}

function renderScore() {
    divScore.innerHTML = ` ${getWrongGuesses().length}  /  ${MAX_WRONG_GUESSES}  `
}

function renderButtons() {
    divButtons.innerHTML =
        buttons.split("").map(c => `<button ${guesses.includes(c) ? "disabled" : ""} >
        ${c}
      </button>`).join("")
}


function renderWord() {
    divWord.innerHTML =
        theWord.split("").map(c => `<span  class="${isLost() && !guesses.includes(c) ? "hianyzo" : ""} ">
        ${isLost() || guesses.includes(c) ? c : ""}
      </span>`).join("")
}

function updateSVG() {
    document.querySelectorAll("svg *").forEach(element => {
        element.classList.remove("rajzol")
    })
    
    for (let i = 1; i <= getWrongGuesses().length; i++) {
        const element = document.querySelector(`svg *:nth-child(${i})`)
        if (element) {
            element.classList.add("rajzol")
        }
    }
}

divButtons.addEventListener("click", function (e){
    if(!isWon() && !isLost() && e.target.matches("button")) {
        const clickedLetter = e.target.textContent.trim()
        guesses.push(clickedLetter)
        
        // hangeffekt
        if (theWord.includes(clickedLetter)) {
            // jó -> magas hang
            playSound(800, 0.1)
        } else {
            // rossz -> mély hang
            playSound(200, 0.2)
        }
        
        render()
    }
})

function render() {
    renderEnd()
    renderScore()
    renderButtons()
    renderWord()
    updateSVG()
}

function newGame() {
    guesses.length = 0
    theWord = wordList[random(0, wordList.length - 1)] 
    render()
}

buttonNewGame.addEventListener("click", newGame)

document.addEventListener("keydown", function(e) {
    const key = e.key.toLowerCase()
    if (!isWon() && !isLost() && buttons.includes(key) && !guesses.includes(key)) {
        guesses.push(key)
        
        // hang
        if (theWord.includes(key)) {
            playSound(800, 0.1)
        } else {
            playSound(200, 0.2)
        }
        
        render()
    }
    // Enter => ha vege uj jatek
    if ((isWon() || isLost()) && e.key === "Enter") {
        newGame()
    }
})

render()