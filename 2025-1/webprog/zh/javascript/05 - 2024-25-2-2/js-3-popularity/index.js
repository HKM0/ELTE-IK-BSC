const canvasColumnChart = document.querySelector('#column-chart')
const contextColumnChart = canvasColumnChart.getContext('2d')
function drawColumn(video, index, columnWidth) {
    // ide dolgozz (a., b., c.)
}

const canvasPieChart = document.querySelector('#pie-chart')
const contextPieChart = canvasPieChart.getContext('2d')
let startAngle = 0
function drawCircleSector(video, totalViews, centerX, centerY, radius) {
    const sliceAngle = (video.views / totalViews) * 2 * Math.PI

    // ide dolgozz (d., e.)

    startAngle += sliceAngle
}







//////////////////////////////////////////////////////
// 🛑 INNNETŐL LEFELE SEMMIHEZ NEM KELL NYÚLNOD 🛑 //
//////////////////////////////////////////////////////































const data = {
    "6fb178a2": { selected: true, "id": "6fb178a2", "yt": "L_dWvTCdDQ4", "title": "Little Big - Uno", "year": 2020, "views": 295, "nation": "" },
    "56c12e67": { selected: true, "id": "56c12e67", "yt": "RVH5dn1cxAQ", "title": "Måneskin - Zitti E Buoni", "year": 2021, "views": 113, "nation": "" },
    "0573ddf4": { selected: true, "id": "0573ddf4", "yt": "WXwgZL4zx9o", "title": "Alexander Rybak - Fairytale", "year": 2009, "views": 105, "nation": "" },
    "069687d6": { selected: true, "id": "069687d6", "yt": "Pfo-8z86x80", "title": "Loreen - Euphoria", "year": 2012, "views": 69, "nation": "" },
    "a9db35a0": { selected: true, "id": "a9db35a0", "yt": "hfjHJneVonE", "title": "Verka Serduchka - Dancing Lasha Tumbai", "year": 2007, "views": 58, "nation": "" },
    "e0701ae3": { selected: true, "id": "e0701ae3", "yt": "gAh9NRGNhUU", "title": "Lordi - Hard Rock Hallelujah", "year": 2006, "views": 56, "nation": "" },
    "9350ed07": { selected: true, "id": "9350ed07", "yt": "5sGOwFVUU0I", "title": "Måns Zelmerlöw - Heroes", "year": 2015, "views": 55, "nation": "" },
    "c74d1bcd": { selected: true, "id": "c74d1bcd", "yt": "84LBjXaeKk4", "title": "Netta - Toy", "year": 2018, "views": 54, "nation": "" },
    "5f96af67": { selected: true, "id": "5f96af67", "yt": "jSQYTt4xg3I", "title": "Chanel - SloMo", "year": 2022, "views": 46, "nation": "" },
    "d2fa5d22": { selected: true, "id": "d2fa5d22", "yt": "l6rS8Dv5g-8", "title": "Käärijä - Cha Cha Cha", "year": 2023, "views": 44, "nation": "" },
    "6b447408": { selected: true, "id": "6b447408", "yt": "IiHFnmI8pxg", "title": "Joost Klein - Europapa", "year": 2024, "views": 43, "nation": "" },
    "c10cd2e8": { selected: true, "id": "c10cd2e8", "yt": "YIBjarAiAVc", "title": "Baby Lasagna - Rim Tim Tagi Dim", "year": 2024, "views": 41, "nation": "" },
    "f6b33937": { selected: true, "id": "f6b33937", "yt": "CO_qJf-nW0k", "title": "Nemo - The Code", "year": 2024, "views": 41, "nation": "" },
    "a2901c3f": { selected: true, "id": "a2901c3f", "yt": "pHXDMe6QV-U", "title": "Sunstroke Project & Olia Tira - Run Away", "year": 2010, "views": 38, "nation": "" },
    "3d8d0e8d": { selected: true, "id": "3d8d0e8d", "yt": "BE2Fj0W4jP4", "title": "Loreen - Tattoo", "year": 2023, "views": 29, "nation": "" },
    "3591afee": { selected: true, "id": "3591afee", "yt": "-XyLecY2JyE", "title": "Slimane - Mon Amour", "year": 2024, "views": 26, "nation": "" },
    "61b3731a": { selected: true, "id": "61b3731a", "yt": "QRUIava4WRM", "title": "Conchita Wurst - Rise Like a Phoenix", "year": 2014, "views": 15, "nation": "" },
    "e0c8b1b9": { selected: true, "id": "e0c8b1b9", "yt": "MtMHBXO_n48", "title": "Ivi Adamou - La La Love", "year": 2012, "views": 14, "nation": "" },
    "62860074": { selected: true, "id": "62860074", "yt": "9b9Z5HSCXOI", "title": "Tommy Cash - Espresso Macchiato", "year": 2025, "views": 12, "nation": "" },
    "938a4a4d": { selected: true, "id": "938a4a4d", "yt": "UMq8ofCstMQ", "title": "Bambie Thug - Doomsday Blue", "year": 2024, "views": 12, "nation": "" },
    "b0c6c269": { selected: true, "id": "b0c6c269", "yt": "adCU2rQyDeY", "title": "Subwoolfer - Give That Wolf A Banana", "year": 2022, "views": 11, "nation": "" },
    "9921812f": { selected: true, "id": "9921812f", "yt": "7nidDtyS0Wo", "title": "Windows95man - No Rules!", "year": 2024, "views": 10, "nation": "" },
    "1479a2fe": { selected: true, "id": "1479a2fe", "yt": "onOex2WXjbA", "title": "JJ - Wasted Love", "year": 2025, "views": 9.5, "nation": "" },
    "846882bd": { selected: true, "id": "846882bd", "yt": "FOMoQoHG5aU", "title": "Nebulossa - ZORRA", "year": 2024, "views": 6.6, "nation": "" },
    "70621e6b": { selected: true, "id": "70621e6b", "yt": "fn8DzOcpQas", "title": "Basim - Cliché Love Song", "year": 2014, "views": 3.9, "nation": "" },
    "d7e6f881": { selected: true, "id": "d7e6f881", "yt": "hqM0AkP7zcI", "title": "Joci Pápai - Origo", "year": 2018, "views": 3.9, "nation": "" },
    "74cfa0d1": { selected: true, "id": "74cfa0d1", "yt": "4XJBNJ2wq0Y", "title": "ABBA - Waterloo", "year": 1974, "views": 3.2, "nation": "" },
    "31fb4561": { selected: true, "id": "31fb4561", "yt": "p6e1TmYb33w", "title": "AWS - Viszlát Nyár", "year": 2018, "views": 2.6, "nation": "" },
    "685f4943": { selected: true, "id": "685f4943", "yt": "mBg3coarF_8", "title": "Dino Merlin - Love In Rewind", "year": 2011, "views": 1.5, "nation": "" },
    "fddc8c5d": { selected: true, "id": "fddc8c5d", "yt": "3MB628Kanzo", "title": "EMMY - Laika Party", "year": 2025, "views": 1, "nation": "" },
    "4cc18091": { selected: true, "id": "4cc18091", "yt": "povnGP6k0sI", "title": "Miriana Conte - SERVING", "year": 2025, "views": 0.6, "nation": "" },
    "42232d21": { selected: true, "id": "42232d21", "yt": "JF8fkHK0AWs", "title": "Olsen Brothers - Fly On The Wings of Love", "year": 2000, "views": 0.1, "nation": "" },
    
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

const checkboxes = document.querySelector('#video-checkboxes')

let htmlstring = ''
for(const vidID in data){
    const vid = data[vidID]
    htmlstring += `<label style="color:#${vidID.substring(0, 6)}"> <input type="checkbox" value="${vidID}" checked> ${vid.title} </label>`
}
checkboxes.innerHTML = htmlstring

delegate(checkboxes, 'input', 'input', (event, elem) => {
    data[elem.value].selected = elem.checked
    drawAll()
})

function drawColumnCharts(filteredData) {
    contextColumnChart.clearRect(0,0,800,400)
    const colWidth = 800/filteredData.length


    filteredData.forEach((vid, i) => {
        drawColumn(vid, i, colWidth)
    })
}

function drawPieCharts(filteredData) {
    contextPieChart.clearRect(0,0,800,400)
    
    const totalViews = filteredData.reduce((sum, vid) => sum + vid.views, 0)
    
    startAngle = 0
    const centerX = canvasPieChart.width / 2
    const centerY = canvasPieChart.height / 2
    const radius = Math.min(centerX, centerY) - 10
    
    filteredData.forEach((vid) => {
        drawCircleSector(vid, totalViews, centerX, centerY, radius)

        /*
        const sliceAngle = (vid.views / totalViews) * 2 * Math.PI

        contextPieChart.beginPath()
        contextPieChart.moveTo(centerX, centerY)
        contextPieChart.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
        contextPieChart.closePath()

        contextPieChart.fillStyle = `#${vid.id.substring(0, 6)}`
        contextPieChart.fill()

        startAngle += sliceAngle
        */
    })
}


function drawAll(){
    const filtered = []
    for(const vidID in data){
        if(data[vidID].selected) filtered.push(data[vidID])
    }
    drawColumnCharts(filtered)
    drawPieCharts(filtered)
}

drawAll()