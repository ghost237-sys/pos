document.querySelectorAll('.qty, .unit-price').forEach(function(element) {
  element.addEventListener('input', function() {
    var row = this.closest('tr');
    var qty = parseFloat(row.querySelector('.qty').textContent);
    var unitPrice = parseFloat(row.querySelector('.unit-price').textContent);
    var totalPrice = qty * unitPrice;
    if (!isNaN(totalPrice)) {
      row.querySelector('.total-price').textContent = totalPrice.toFixed(2);
      updateTotalPrice(); // Update total price when any value is changed
    }
  });
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
      cell.innerHTML = '<button onclick="addItem(this)">Add</button> <button onclick="deleteItem(this)">Delete</button>';
    } else {
      text = '0.00';
    }
    if (i !== cells - 1) {
      cell.contentEditable = true;
      cell.textContent = text;
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
  document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}