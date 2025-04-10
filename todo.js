let todoItems = [];

// Generate unique ID for each task
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Render a task in the (ToDo) table with Done and Delete buttons
function renderTodo(todo) {
  const table = document.getElementById("todo-table");
  const row = table.insertRow(-1);
  const textCell = row.insertCell(0);
  textCell.innerText = todo.text;

  const dateCell = row.insertCell(1);
  dateCell.innerText = todo.date;

  const actionCell = row.insertCell(2);
  actionCell.innerHTML = `
    <a onclick="markAsDone('${todo.id}')" class="button is-primary">Done</a>
    <a onclick="deleteTodo('${todo.id}')" class="button is-warning">Delete</a>
  `;
}

// Create a new task and add it to the list
function addTodo() {
  const todoText = document.getElementById("todo-id").value;
  const todo = {
    text: todoText,
    date: new Date().toLocaleString("en-IE"),
    id: uuidv4(),
  };
  todoItems.push(todo);
  renderTodo(todo);
}

// Permanently remove a task from the list
function deleteTodo(id) {
  const found = todoItems.findIndex((todo) => todo.id == id);
  todoItems.splice(found, 1);
  deleteAllTodos();
  renderAllTodos();
}

// Move a task to the (Completed) table
function markAsDone(id) {
  const index = todoItems.findIndex((todo) => todo.id == id);
  if (index > -1) {
    const doneItem = todoItems.splice(index, 1)[0];
    deleteAllTodos();
    renderAllTodos();
    renderCompleted(doneItem);
  }
}

// Add a completed task to the completed table
function renderCompleted(todo) {
  const table = document.getElementById("completed-table");
  const row = table.insertRow(-1);
  const textCell = row.insertCell(0);
  textCell.innerText = todo.text;

  const dateCell = row.insertCell(1);
  dateCell.innerText = todo.date;
}

// Loop through all current tasks and render them
function renderAllTodos() {
  for (let i = 0; i < todoItems.length; i++) {
    renderTodo(todoItems[i]);
  }
}

// Remove all rows from the (ToDo) table before re-rendering
function deleteAllTodos() {
  let table = document.getElementById("todo-table");
  for (let i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}
