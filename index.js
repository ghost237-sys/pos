document.querySelector('table').addEventListener('input', function(event) {
  var target = event.target;
  if (target.classList.contains('qty') || target.classList.contains('unit-price')) {
    var row = target.closest('tr');
    var qty = parseFloat(row.querySelector('.qty').textContent);
    var unitPrice = parseFloat(row.querySelector('.unit-price').textContent);
    var totalPrice = qty * unitPrice;
    if (!isNaN(totalPrice)) {
      row.querySelector('.total-price').textContent = totalPrice.toFixed(2);
      updateTotalPrice(); // Update total price when any value is changed
    }
  }
});

function addItem() {
  var table = document.getElementById('item-table').getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.rows.length);
  var cells = document.getElementById('item-table').rows[0].cells.length;

  for (var i = 0; i < cells; i++) {
    var cell = newRow.insertCell(i);
    var text = '';
    if (i === 0) {
      text = '1';
    } else if (i === 1) {
      text = 'Item ' + (table.rows.length);
    } else if (i === cells - 1) {
      cell.innerHTML = '<td class="action-buttons" style="padding: 5px 10px;">' +
      '<button style="cursor: pointer; transition: background-color 0.3s ease; padding: 5px 10px; margin-right: 5px; background-color: #f0f0f0;" onmouseover="this.style.backgroundColor=\'#ddd\'" onmouseout="this.style.backgroundColor=\'#f0f0f0\'" onclick="addItem(this)">Add</button>' +
      '<button style="cursor: pointer; transition: background-color 0.3s ease; padding: 5px 10px; background-color: #f0f0f0;" onmouseover="this.style.backgroundColor=\'#ddd\'" onmouseout="this.style.backgroundColor=\'#f0f0f0\'" onclick="deleteItem(this)">Delete</button>' +
  '</td>';
  
      text = '0.00';
    }
    if (i !== cells - 1) {
      cell.contentEditable = true;
      cell.textContent = text;
      cell.classList.add(['qty', 'description', 'amt', 'unit-price','total-price'][i]); 
    }
  }
  updateTotalPrice();
}

function deleteItem(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  updateTotalPrice();
}



function deleteLastCharacter() {
  var activeElement = document.activeElement;
  activeElement.textContent = activeElement.textContent.slice(0, -1);
  updateTotalPrice();
}


function updateCellValue(value) {
  var activeElement = document.activeElement;
  if (activeElement && activeElement.tagName === "TD") {
    if (!isNaN(value) || value === '0') {
      activeElement.textContent += value;
    }
  }
  updateTotalPrice();
}


function updateTotalPrice() {
  var totalPrice = 0;
  var totalCell = document.querySelectorAll('#item-table tbody tr td.total-price');
  totalCell.forEach(function(cell) {
    totalPrice += parseFloat(cell.textContent);
  });
  document.getElementById('total').textContent = totalPrice.toFixed(2);
}