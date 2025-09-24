document.addEventListener('click', kattintas)

function kattintas(e) {
    if (e.target.matches("a") && !e.target.href.includes("elte.hu")) { 
        e.preventDefault()
    } 
}

