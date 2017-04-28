

function submitTodo() {
  var item = document.getElementById('newItem').value
  if (item == "") {
    return;
    }
  var tasksContainer = document.getElementById('tasks')
  var nodeItem = document.createTextNode(item)
  // create checkbox for list element
  var checkbox = document.createElement("input")
  checkbox.type = 'checkbox'
  //create delete button for list item
  var deleteButton = document.createElement("button")
  deleteButton.type = 'button'
  // deleteButton.onclick("deleteItem()") // maybe triggers deleting the item???
  var listItem = document.createElement("p")
  listItem.appendChild(checkbox) // add checkbox to list element
  listItem.appendChild(nodeItem)  // Adds text to list element
  listItem.appendChild(deleteButton)  // Adds delete button to element
  tasksContainer.appendChild(listItem)   // Adds new item to the list

  document.getElementById('newItem').value = ""   // Clears the text input box

  deleteButton.addEventListener('click', function(event) {
          tasksContainer.removeChild(listItem);
      });
}

function checkForEnter(event) { // when we type into the textbox, submit the todo if we're hitting Enter
  if (event.keyCode == 13) {
    submitTodo()
  }
}
