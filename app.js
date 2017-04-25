
//console.log("I love Sean");

//alert("hello woofer");


function submitTodo() {
  var item = document.getElementById('newItem').value
  var tasks = document.getElementById('tasks')
  var nodeItem = document.createTextNode(item)
  var listItem = document.createElement("li")
  listItem.appendChild(nodeItem)
  tasks.appendChild(listItem)   // Adds new item to the list
  document.getElementById('newItem').value = ""   // Clears the text input box
}


function checkForEnter(event) {
  if (event.keyCode == 13) {
    submitTodo()
  }
}
