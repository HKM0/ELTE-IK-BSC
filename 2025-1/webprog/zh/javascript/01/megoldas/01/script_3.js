/*Adott az oldalon egy kontaklista az alábbi HTML szerkezetben. Minden kontaktnál van három gomb, amelyek a megfelelő információt fedik fel a kontakt adataiból. Egyetlen elem egyetlen eseménykezelő függvényével oldd meg az alábbi feladatokat!*/

// Egyetlen eseménykezelő függvény az összes feladathoz
document.querySelector("#contacts").addEventListener("click", function(event) {
    // Ellenőrizzük, hogy gombra kattintottunk-e
    if (event.target.matches("button")) {
        const button = event.target;
        
        // 1. Írd ki a konzolra a kattintott gomb feliratát és data-toggle értékét! (1 pont)
        console.log("Gomb felirata:", button.textContent);
        console.log("data-toggle értéke:", button.dataset.toggle);
        
        // 2. A gombra kattintva írd ki a konzolra a kontakt nevét! (1 pont)
        const section = button.closest("section");
        const name = section.querySelector(".name").textContent;
        console.log("Kontakt neve:", name);
        
        // 3. Bármelyik gombra kattintva tedd láthatóvá az adott kontakt email mezőjét! (1 pont)
        const emailField = section.querySelector(".email");
        emailField.hidden = false;
        
        // 4. Egy gombra kattintva tedd láthatóvá azt a mezőt, amely a gomb data-toggle értékében van megadva! (1 pont)
        const toggleClass = button.dataset.toggle;
        const fieldToToggle = section.querySelector(`.${toggleClass}`);
        if (fieldToToggle) {
            fieldToToggle.hidden = false;
        }
    }
});