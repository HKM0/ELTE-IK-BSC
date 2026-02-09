// Jó munkát!

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}

function drawLottery(n){
    const limits = {5 : 90, 6 : 45, 7 : 35}
    if (!limits.hasOwnProperty(n)) return [];
    const limit = limits[n]
    let draw = []
    while (draw.length < n){
        let rand = Math.floor(Math.random() * limit) + 1
        if (!draw.includes(rand)) draw.push(rand)
    }
    return draw.sort((u, v) => u - v)
}
