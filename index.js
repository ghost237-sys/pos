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
      '<button class="btn btn-outline-primary" style="cursor: pointer;  padding: 5px 10px; margin-right: 5px; "  onclick="addItem(this)">Add</button>' +
      '<button class="btn btn-outline-danger" style="cursor: pointer;  padding: 5px 10px; "  onclick="deleteItem(this)">Delete</button>' +
  '</td>';
    }else{
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

var activeCell = null;

document.getElementById('item-table').addEventListener('click', function(event) {
  var target = event.target;
  if (target.tagName === 'TD' && target.contentEditable === 'true') {
      activeCell = target;
  }
});

function updateActiveCell(value) {
  if (activeCell) {
      if (!isNaN(value) || value === '0') {
          activeCell.textContent += value;
      }
  }
}


function deleteLastCharacter() {
  if (activeCell) {
      activeCell.textContent = activeCell.textContent.slice(0, -1);
  }
}



var keypadButtons = document.querySelectorAll('#keypad .key');
keypadButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var value = this.textContent;
        if (value === 'DEL') {
            deleteLastCharacter();
        } else {
            updateActiveCell(value);
        }
    });
});


function updateTotalPrice() {
  var totalPrice = 0;
  var totalCell = document.querySelectorAll('#item-table tbody tr td.total-price');
  totalCell.forEach(function(cell) {
    totalPrice += parseFloat(cell.textContent);
  });
  document.getElementById('total').textContent = totalPrice.toFixed(2);
}



function moveActiveCell(direction) {
  if (activeCell) {
      var currentRowIndex = activeCell.parentNode.rowIndex;
      var currentCellIndex = activeCell.cellIndex;
      var newRow, newCell;
      
      switch (direction) {
          case 'up':
              newRow = currentRowIndex - 1;
              newCell = activeCell.parentNode.parentNode.rows[newRow].cells[currentCellIndex];
              break;
          case 'down':
              newRow = currentRowIndex + 1;
              newCell = activeCell.parentNode.parentNode.rows[newRow].cells[currentCellIndex];
              break;
          case 'left':
              newCell = activeCell.parentNode.cells[currentCellIndex - 1];
              break;
          case 'right':
              newCell = activeCell.parentNode.cells[currentCellIndex + 1];
              break;
      }
      
      if (newCell && newCell.contentEditable === 'true') {
          activeCell = newCell;
      }
  }
}

var arrowButtons = document.querySelectorAll('#keypad .arrow');
arrowButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var direction = this.dataset.direction;
        moveActiveCell(direction);
    });
});



