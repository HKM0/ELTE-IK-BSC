// csuszkak
hue = document.querySelectorAll("input[type=range]")[0]
saturation = document.querySelectorAll("input[type=range]")[1]
brightness = document.querySelectorAll("input[type=range]")[2]

//funkcio gomb hogy hatteret valtoztasson
megjelenito_gomb=document.querySelector("button")

//input field ahova ki kell majd írni
hsl_kimenet = document.querySelector("input[type=text]")


function update_hsl(){
    hsl_string=`hsl(${hue.value}, ${saturation.value}%, ${brightness.value}%)`
    //console.log(hsl_string)

    document.body.style.background = hsl_string
    hsl_kimenet.value=hsl_string
}
//gomb nyomasra is megy
megjelenito_gomb.addEventListener("click", update_hsl)

//csuszkak frissitesere is megy
hue.addEventListener("input", update_hsl)
saturation.addEventListener("input", update_hsl)
brightness.addEventListener("input", update_hsl)