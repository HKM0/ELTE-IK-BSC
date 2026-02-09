function delegal(szulo, esemeny, szelektor, esemenykezelo) {
    szulo.addEventListener(esemeny, function (event) {
        const targetElement = event.target.closest(szelektor)

        if (this.contains(targetElement)) {
            esemenykezelo.call(targetElement, event)
        }
    })
}

const graf = document.querySelector("svg")
const pontok = document.querySelectorAll("ellipse")
const hibaBekezdes = document.querySelector("p")

// Megoldás innentől

