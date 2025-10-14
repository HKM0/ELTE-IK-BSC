const urlInput = document.getElementById('imageUrl');
const loadButton = document.getElementById('loadButton');
const imageContainer = document.getElementById('imageContainer');
loadButton.addEventListener('click', function() {
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Add meg itt a kép URL-jét!');
        return;
    }
    imageContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.alt = 'Betöltött kép';
    img.onerror = function() {
        imageContainer.innerHTML = '<p style="color: red;">Hiba: Ajj ajj, nem töltött be a kép!</p>';
    };
    imageContainer.appendChild(img);
});
//kényelmesebb enterrel xD
urlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loadButton.click();
    }
});
