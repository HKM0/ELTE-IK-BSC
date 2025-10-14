document.getElementById('addButton').addEventListener('click', function() {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = input1.value;
    newRow.insertCell(1).textContent = input2.value;
    newRow.insertCell(2).textContent = input3.value;
    
    input1.value = '';
    input2.value = '';
    input3.value = '';
});
