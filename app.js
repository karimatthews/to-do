document.getElementById("newItem").focus();

var uniqueIdCounter = 0;

function createCheckbox() {
  var checkbox = document.createElement("input")
  checkbox.type = 'checkbox'
  checkbox.className = 'checkbox'
  checkbox.id = uniqueIdCounter + "checkboxid"
  checkbox.value = '1'

  var newlabel = document.createElement("label");
  newlabel.htmlFor = uniqueIdCounter + "checkboxid"


  var checkboxContainer = document.createElement("div")
  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(newlabel)
  checkboxContainer.className = 'checkbox-container'
  uniqueIdCounter++
  return checkboxContainer;
}



function createDeleteButton() {
  var deleteButton = document.createElement("button");
  deleteButton.type = 'button';
  deleteButton.className = "delete";
  deleteButton.appendChild(document.createTextNode('x'));

  deleteButton.addEventListener('click', function() {
    tasksContainer.removeChild(listItem);
  });

  return deleteButton;
}



function submitTodo() {
  var item = document.getElementById('newItem').value
  if (item == "") {
    return;
  }
  var tasksContainer = document.getElementById('tasks')
  var itemText = document.createElement("span")
  itemText.appendChild(document.createTextNode(item));
  var deleteButton = createDeleteButton()
  var checkbox = createCheckbox()

  var listItem = document.createElement("p")
  listItem.className = "list-item"

  listItem.appendChild(checkbox) // add checkbox to list element
  listItem.appendChild(itemText)  // Adds text to list element
  listItem.appendChild(deleteButton)  // Adds delete button to element
  tasksContainer.appendChild(listItem)   // Adds new item to the list

  document.getElementById('newItem').value = ""   // Clears the text input box
}

function checkForEnter(event) { // when we type into the textbox, submit the todo if we're hitting Enter
  if (event.keyCode == 13) {
    submitTodo()
  }
}

document.getElementById("newItem").focus();
