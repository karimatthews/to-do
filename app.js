document.getElementById("newItem").focus();

var uniqueIdCounter = 0;

function getIndexByValue(arr, value) {
  for (var i=0, iLen=arr.length; i<iLen; i++) {
    if (arr[i].text == value) return i;
  }
}

var tasksContainer = document.getElementById('tasks')

//initialise empty set in case local storage is empty
if (!localStorage.toDoItems) {
  localStorage.toDoItems = JSON.stringify([]);
}

// grab the strigified array out of localStorage
var toDoArrayString = localStorage.toDoItems
// Convert the string back to an array
var toDoArray = JSON.parse(toDoArrayString)

toDoArray.forEach(submitTodo);

function createToDoInLocalStorage(value) {
  // grab the strigified array out of localStorage
  var toDoArrayString = localStorage.toDoItems
  // Convert the string back to an array
  var toDoArray = JSON.parse(toDoArrayString)
  //Add value to the end of the array
  toDoArray.push({checked: null, text: value})
  //Turn the array back into a string
  toDoArrayString = JSON.stringify(toDoArray)
  //Put the string in local storage
  localStorage.toDoItems = toDoArrayString
  return {checked: null, text: value};
}



function createCheckbox(toDoFromLocalStorage) {
  var checkbox = document.createElement("input")
  checkbox.type = 'checkbox'
  checkbox.className = 'checkbox'
  checkbox.id = uniqueIdCounter + "checkboxid"

  if (toDoFromLocalStorage) {
    checkbox.checked = toDoFromLocalStorage.checked
  }


  var newlabel = document.createElement("label");
  newlabel.htmlFor = uniqueIdCounter + "checkboxid"

  var checkboxContainer = document.createElement("div")
  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(newlabel)
  checkboxContainer.className = 'checkbox-container'

  checkbox.addEventListener('click', function() {
    // Grab the strigified array of objects object out of local storage e.g. "[{checked: t/f, text: "string"}, {checked: t/f, text: "string"}, ...]"
    var toDoArrayString = localStorage.toDoItems
    // Convert the string back to an array
    var toDoArray = JSON.parse(toDoArrayString)
    // Find the index of the object the checkbox associated with
    var index = getIndexByValue(toDoArray, toDoFromLocalStorage.text)
    //Set the checked value to true or false
    if (checkbox.checked) {
      toDoArray[index].checked = "checked"
    } else {
      toDoArray[index].checked = null
    }

    //stringify the array
    toDoArrayString = JSON.stringify(toDoArray)
    //Put the stringified array back in local storage
    localStorage.toDoItems = toDoArrayString
  });

  uniqueIdCounter++
  return checkboxContainer;
}



function createDeleteButton(element, toDoFromLocalStorage) {
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

    var index = getIndexByValue(toDoArray, toDoFromLocalStorage.text);
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
    var item = toDoFromLocalStorage.text
  } else {
    var item = document.getElementById('newItem').value
    var toDoFromLocalStorage = createToDoInLocalStorage(item)
  }

  if (item == "") {
    return;
  }

  var itemText = document.createElement("span")
  itemText.appendChild(document.createTextNode(item));
  var checkbox = createCheckbox(toDoFromLocalStorage)
  var listItem = document.createElement("p")
  // Store


  var deleteButton = createDeleteButton(listItem, toDoFromLocalStorage)
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
