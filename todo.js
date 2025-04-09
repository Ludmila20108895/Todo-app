let todoItems = [];

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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

function deleteTodo(id) {
  const found = todoItems.findIndex((todo) => todo.id == id);
  todoItems.splice(found, 1);
  deleteAllTodos();
  renderAllTodos();
}

function markAsDone(id) {
  const index = todoItems.findIndex((todo) => todo.id == id);
  if (index > -1) {
    const doneItem = todoItems.splice(index, 1)[0];
    deleteAllTodos();
    renderAllTodos();
    renderCompleted(doneItem);
  }
}

function renderCompleted(todo) {
  const table = document.getElementById("completed-table");
  const row = table.insertRow(-1);
  const textCell = row.insertCell(0);
  textCell.innerText = todo.text;

  const dateCell = row.insertCell(1);
  dateCell.innerText = todo.date;
}

function renderAllTodos() {
  for (let i = 0; i < todoItems.length; i++) {
    renderTodo(todoItems[i]);
  }
}

function deleteAllTodos() {
  let table = document.getElementById("todo-table");
  for (let i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}
