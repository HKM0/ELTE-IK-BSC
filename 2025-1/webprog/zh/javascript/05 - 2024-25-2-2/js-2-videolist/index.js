const videoTable = document.querySelector('#video-table')
const videoTableBody = document.querySelector('#video-table tbody')
const viewInput = document.querySelector('#amount')
const btnAdd = document.querySelector('#btn-add')
const btnSub = document.querySelector('#btn-sub')
const sumSpan = document.querySelector('#sum')

//1. A #video-table táblázatba listázd a videókat a mintának megfelelően (év, cím, nézettség millió)!
for(let i = 0; i<data.length; i++){
    videoTable.innerHTML+=`<tr><td>${data[i].year}</td><td>${data[i].title}</td><td>${data[i].views} millió</td></tr>`
}
//2. A videókat (táblázat sorokat tr) lehessen kijelölni.
//      Ha rákattintunk egy videóra (táblázat sorra tr), alkalmazd rá a selected stílusosztályt!
//      Ha egy már kijelölt videóra (táblázat sorra tr) kattintunk, vedd le róla a selected stílusosztályt!
videoTable.addEventListener("click", (e)=>{
    const row = e.target.closest('tr')
    if(row && row.parentElement === videoTableBody){
        row.classList.toggle('selected')
        updateSum() // Frissítjük az összeget minden kijelöléskor
    }
})
//3. A #sum elembe írd ki a videók össz nézettségét.
function updateSum(){
    const selectedRows = videoTableBody.querySelectorAll('tr.selected')
    let sum = 0
    
    // 4. Ha van kijelölt videó, a #sum elemben csak a kijelölt videók össz nézettsége legyen (egyébként az összes videóé).
    if(selectedRows.length > 0){
        // Van kijelölt videó - csak azokat számoljuk
        selectedRows.forEach((row, index) => {
            // Megkeressük a kijelölt sorokhoz tartozó adatokat
            const allRows = videoTableBody.querySelectorAll('tr')
            const rowIndex = Array.from(allRows).indexOf(row)
            sum += data[rowIndex].views
        })
    } else {
        // Nincs kijelölt videó - mindet számoljuk
        sum = data.map(x => x.views).reduce((acc, a) => acc + a, 0)
    }
    
    sumSpan.innerHTML = sum
}

updateSum()


// 5. A #controls elemben lévő gombok működjenek értelemszerűen: a #btn-add megnyomására az összes kijelölt elemben növeld a nézettséget az #amount elem értékével; a #btn-sub pedig csökkentse őket, de az érték negatívra nem csökkenhet, helyette nullán marad.
btnAdd.addEventListener('click', () => {
    const selectedRows = videoTableBody.querySelectorAll('tr.selected')
    if(selectedRows.length === 0) return // Ha nincs kijelölve semmi, nem csinálunk semmit
    
    const amount = parseFloat(viewInput.value) || 0
    
    selectedRows.forEach(row => {
        const allRows = videoTableBody.querySelectorAll('tr')
        const rowIndex = Array.from(allRows).indexOf(row)
        data[rowIndex].views += amount
        row.cells[2].innerHTML = data[rowIndex].views + ' millió'
    })
    
    updateSum() // Frissítjük az összeget
})

btnSub.addEventListener('click', () => {
    const selectedRows = videoTableBody.querySelectorAll('tr.selected')
    if(selectedRows.length === 0) return // Ha nincs kijelölve semmi, nem csinálunk semmit
    
    const amount = parseFloat(viewInput.value) || 0
    
    selectedRows.forEach(row => {
        const allRows = videoTableBody.querySelectorAll('tr')
        const rowIndex = Array.from(allRows).indexOf(row)
        data[rowIndex].views -= amount
        // Nem mehet negatívra
        if(data[rowIndex].views < 0){
            data[rowIndex].views = 0
        }
        row.cells[2].innerHTML = data[rowIndex].views + ' millió'
    })
    
    updateSum() // Frissítjük az összeget
})


// 6. (4 pont) A fejléc cellákra kattintva rendezd a táblázatot a kattintott oszlop szerint csökkenően!
const tableHeader = videoTable.querySelector('thead')

tableHeader.addEventListener('click', (e) => {
    const th = e.target.closest('th')
    if(!th) return
    
    // Meghatározzuk melyik oszlopra kattintottak (0: év, 1: cím, 2: nézettség)
    const cells = tableHeader.querySelectorAll('th')
    const columnIndex = Array.from(cells).indexOf(th)
    
    // Rendezés az oszlop alapján csökkenően
    if(columnIndex === 0){
        // Év szerint
        data.sort((a, b) => b.year - a.year)
    } else if(columnIndex === 1){
        // Cím szerint (betűrendben, de csökkenően: Z-től A-ig)
        data.sort((a, b) => b.title.localeCompare(a.title))
    } else if(columnIndex === 2){
        // Nézettség szerint
        data.sort((a, b) => b.views - a.views)
    }
    
    // Táblázat újragenerálása
    videoTableBody.innerHTML = ''
    for(let i = 0; i < data.length; i++){
        videoTableBody.innerHTML += `<tr><td>${data[i].year}</td><td>${data[i].title}</td><td>${data[i].views} millió</td></tr>`
    }
    
    updateSum()
})