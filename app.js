document.getElementById("newItem").focus();

var uniqueIdCounter = 0;

var tasksContainer = document.getElementById('tasks')

if (!localStorage.toDoItems) {
  localStorage.toDoItems = JSON.stringify([]);
}

// grab the strigified array out of localStorage
var toDoArrayString = localStorage.toDoItems
// Convert the strig back to an array
var toDoArray = JSON.parse(toDoArrayString)

toDoArray.forEach(submitTodo);

function setLocalStorage(value) {
  // grab the strigified array out of localStorage
  var toDoArrayString = localStorage.toDoItems
  // Convert the strig back to an array
  var toDoArray = JSON.parse(toDoArrayString)
  //Add value to the end of the array
  toDoArray.push(value)
  //Turn the array back into a string
  toDoArrayString = JSON.stringify(toDoArray)
  //Put the string in local storage
  localStorage.toDoItems = toDoArrayString
}



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



function createDeleteButton(element, text) {
  var deleteButton = document.createElement("button");
  deleteButton.type = 'button';
  deleteButton.className = "delete";
  deleteButton.appendChild(document.createTextNode('x'));



  deleteButton.addEventListener('click', function() {
    tasksContainer.removeChild(element);

    // grab the strigified array out of localStorage
    var toDoArrayString = localStorage.toDoItems
    // Convert the strig back to an array
    var toDoArray = JSON.parse(toDoArrayString)

    var index = toDoArray.indexOf(text);
    if (index > -1) {
      toDoArray.splice(index, 1);
    }
    //Turn the array back into a string
    toDoArrayString = JSON.stringify(toDoArray)
    //Put the string in local storage
    localStorage.toDoItems = toDoArrayString
  });

  return deleteButton;
}



function submitTodo(toDoFromLocalStorage) {
  if (toDoFromLocalStorage) {
    var item = toDoFromLocalStorage
  } else {
    var item = document.getElementById('newItem').value
    setLocalStorage(item)
  }

  if (item == "") {
    return;
  }

  var itemText = document.createElement("span")
  itemText.appendChild(document.createTextNode(item));
  var checkbox = createCheckbox()
  var listItem = document.createElement("p")
  // Store


  var deleteButton = createDeleteButton(listItem, item)
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


// document.getElementById("newItem").focus();
