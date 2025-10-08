// Pixel Art Editor JavaScript

let selectedColor = '#000000';
let selectedColors = new Set();
let currentGrid = null;
let gridHistory = [];
let maxHistorySize = 50;

const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const generateButton = document.getElementById('btnGenerate');
const clearButton = document.getElementById('btnClear');
const exportButton = document.getElementById('btnExport');
const exportImageButton = document.getElementById('btnExportImage');
const colorInput = document.getElementById('color');
const colorShower = document.getElementById('color-shower');
const colorsDiv = document.getElementById('colors');
const editorDiv = document.getElementById('editor');

function init() {
    selectedColor = colorInput.value;
    updateColorShower();
    
    generateButton.addEventListener('click', generateGrid);
    clearButton.addEventListener('click', clearGrid);
    exportButton.addEventListener('click', exportAsJSON);
    exportImageButton.addEventListener('click', exportAsImage);
    colorInput.addEventListener('input', handleColorChange);
    
    generateGrid();
}

function handleColorChange() {
    selectedColor = colorInput.value;
    updateColorShower();
    addColorToSelected(selectedColor);
}

function updateColorShower() {
    colorShower.style.backgroundColor = selectedColor;
    colorShower.textContent = selectedColor.toUpperCase();
}

function addColorToSelected(color) {
    if (!selectedColors.has(color)) {
        selectedColors.add(color);
        
        const colorSwatch = document.createElement('div');
        colorSwatch.style.backgroundColor = color;
        colorSwatch.style.cursor = 'pointer';
        colorSwatch.title = color;
        colorSwatch.addEventListener('click', () => selectColor(color, colorSwatch));
        
        colorsDiv.appendChild(colorSwatch);
    }
}

function selectColor(color, swatchElement) {
    selectedColor = color;
    colorInput.value = color;
    updateColorShower();
    
    document.querySelectorAll('#colors div').forEach(swatch => {
        swatch.classList.remove('selected');
    });
    swatchElement.classList.add('selected');
}

function generateGrid() {
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    
    if (width < 1 || width > 100 || height < 1 || height > 100) {
        alert('Width and height must be between 1 and 100');
        return;
    }
    
    gridHistory = [];
    
    editorDiv.innerHTML = '';
    
    const table = document.createElement('table');
    table.className = 'edit';
    
    currentGrid = [];
    for (let row = 0; row < height; row++) {
        const tr = document.createElement('tr');
        const gridRow = [];
        
        for (let col = 0; col < width; col++) {
            const td = document.createElement('td');
            td.style.backgroundColor = 'white';
            td.dataset.row = row;
            td.dataset.col = col;
            
            td.addEventListener('click', () => paintCell(td));
            
            td.addEventListener('mousedown', (e) => {
                e.preventDefault();
                paintCell(td);
                td.dataset.painting = 'true';
            });
            
            td.addEventListener('mouseenter', () => {
                if (td.dataset.painting === 'true' || 
                    (document.querySelector('[data-painting="true"]') && 
                     event.buttons === 1)) {
                    paintCell(td);
                }
            });
            
            td.addEventListener('mouseup', () => {
                document.querySelectorAll('[data-painting]').forEach(cell => {
                    delete cell.dataset.painting;
                });
            });
            
            tr.appendChild(td);
            gridRow.push({
                element: td,
                color: 'white'
            });
        }
        
        table.appendChild(tr);
        currentGrid.push(gridRow);
    }
    
    editorDiv.appendChild(table);
    
    document.addEventListener('mouseup', () => {
        document.querySelectorAll('[data-painting]').forEach(cell => {
            delete cell.dataset.painting;
        });
    });
}

function paintCell(cell) {
    saveGridState();
    
    cell.style.backgroundColor = selectedColor;
    
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if (currentGrid && currentGrid[row] && currentGrid[row][col]) {
        currentGrid[row][col].color = selectedColor;
    }
    
    addColorToSelected(selectedColor);
}

function clearGrid() {
    if (currentGrid) {
        saveGridState();
        
        currentGrid.forEach(row => {
            row.forEach(cell => {
                cell.element.style.backgroundColor = 'white';
                cell.color = 'white';
            });
        });
    }
}

function saveGridState() {
    if (!currentGrid) return;
    
    const gridState = currentGrid.map(row => 
        row.map(cell => cell.color)
    );
    
    gridHistory.push(gridState);
    
    if (gridHistory.length > maxHistorySize) {
        gridHistory.shift();
    }
}

function undoLastAction() {
    if (gridHistory.length === 0 || !currentGrid) return;
    
    const lastState = gridHistory.pop();
    
    for (let row = 0; row < currentGrid.length; row++) {
        for (let col = 0; col < currentGrid[row].length; col++) {
            if (lastState[row] && lastState[row][col] !== undefined) {
                const color = lastState[row][col];
                currentGrid[row][col].color = color;
                currentGrid[row][col].element.style.backgroundColor = color;
            }
        }
    }
}

function exportGrid() {
    if (!currentGrid) return null;
    
    const gridData = currentGrid.map(row => 
        row.map(cell => cell.color)
    );
    
    return {
        width: currentGrid[0].length,
        height: currentGrid.length,
        data: gridData
    };
}

function exportAsJSON() {
    if (!currentGrid) {
        alert('Nincs mit exportálni...');
        return;
    }
    
    const gridData = exportGrid();
    console.log(gridData) //teszt
    const jsonString = JSON.stringify(gridData, null, 2);
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixelart_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
}

function exportAsImage() {
    if (!currentGrid) {
        alert('Nincs mit exportálni...');
        return;
    }
    
    const width = currentGrid[0].length;
    const height = currentGrid.length;
    const pixelSize = 20;
    
    const canvas = document.createElement('canvas');
    canvas.width = width * pixelSize;
    canvas.height = height * pixelSize;
    const ctx = canvas.getContext('2d');
    
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const color = currentGrid[row][col].color;
            ctx.fillStyle = color;
            ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
        }
    }
    
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `pixelart_${Date.now()}.png`
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }, 'image/png');
}

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        switch(e.key) {
            case 'z':
                e.preventDefault();
                undoLastAction();
                break;
            case 'c':
                e.preventDefault();
                clearGrid();
                break;
        }
    }
    if(e.key === 'Enter'){
        e.preventDefault();
        generateGrid();
    }
});