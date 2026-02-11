// Megkeressük a legördülő listát és a gombot
const select = document.querySelector('select[name="language"]')
const button = document.querySelector('.load-details')
const resultDiv = document.querySelector('.result')

// Gombra kattintva indul az AJAX kérés
button.addEventListener('click', () => {
  // Kiválasztott nyelv kódja (js / php / py)
  const code = select.value

  // Összerakjuk az URL-t a query paraméterrel
  const url = `language.php?code=${encodeURIComponent(code)}`

  // AJAX kérés fetch segítségével. Elküldi a kérést a szerver felé a háttérben, újratöltés nélkül → ez maga az AJAX kérés.
  fetch(url)
    // A választ JSON-ként kérjük (PHP JSON-t ad vissza). A szerver válaszát (PHP → JSON) a böngésző feldolgozható JavaScript objektummá alakítja.
    .then(response => response.json())
    .then(data => {
      // A feldolgozott adat megérkezett a szervertől. A data egy objektum: { name, first_release, typing, description }

      // Összerakunk egy  HTML-t sablon stringgel
      const html = `
        <p><strong>Név:</strong> ${data.name}</p>
        <p><strong>Első megjelenés éve:</strong> ${data.first_release}</p>
        <p><strong>Típusrendszer:</strong> ${data.typing}</p>
        <p><strong>Leírás:</strong> ${data.description}</p>
      `

      // Ezt beírjuk az eredmény div-be. Az oldal frissítése újratöltés nélkül!
      resultDiv.innerHTML = html
    })
})
