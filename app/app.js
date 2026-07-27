const editTitleCounter = document.querySelector(".edit-title-counter");
const editDetailCounter = document.querySelector(".edit-detail-counter");
const addButton = document.querySelector(".add-button");
const newTodoModal = document.querySelector(".new-todo-modal");
const backPageButtons = document.querySelectorAll(".back-page-button");
const newTodoTitleInput = document.querySelector(".new-todo-title");
const newTodoDetailInput = document.querySelector(".new-todo-detail");
const newTodoAddButton = document.querySelector(".new-todo-add-button");
const editTodoModal = document.querySelector(".edit-todo-modal");
const editTodoTitle = document.querySelector(".edit-todo-title");
const editTodoDetail = document.querySelector(".edit-todo-detail");
const editTodoUpdateButton = document.querySelector(".edit-todo-update-button");
const editTodoCancelButton = document.querySelector(".edit-todo-cancel-button");

const todoContainer = document.querySelector(".todo-container");
const allListButton = document.querySelector(".all-list-button");
const completeTodoButton = document.querySelector(".complete-todo-button");
const completeModal = document.querySelector(".completed-todo-modal");
const completeTodoContainer = document.querySelector(
  ".complete-todo-container",
);
const titleCounter = document.querySelector(".title-counter");
const detailCounter = document.querySelector(".detail-counter");

const MAX_TITLE_LENGTH = 50;
const MAX_DETAIL_LENGTH = 120;
function updateCounter(input, counter, maxLength) {
  const remaining = maxLength - input.value.length;
  counter.textContent = `${remaining} characters remaining`;
}

newTodoTitleInput.addEventListener("input", function () {
  updateCounter(newTodoTitleInput, titleCounter, MAX_TITLE_LENGTH);
});

newTodoDetailInput.addEventListener("input", function () {
  updateCounter(newTodoDetailInput, detailCounter, MAX_DETAIL_LENGTH);
});

editTodoTitle.addEventListener("input", function () {
  updateCounter(editTodoTitle, editTitleCounter, MAX_TITLE_LENGTH);
});

editTodoDetail.addEventListener("input", function () {
  updateCounter(editTodoDetail, editDetailCounter, MAX_DETAIL_LENGTH);
});
const localTodos = localStorage.getItem("todos");

const todos = localTodos ? JSON.parse(localTodos) : [];
let editingTodo = null;

refreshUI();
updateCounter(newTodoTitleInput, titleCounter, MAX_TITLE_LENGTH);
updateCounter(newTodoDetailInput, detailCounter, MAX_DETAIL_LENGTH);

document.addEventListener("keydown", function (event) {
  if (newTodoModal.classList.contains("active") && event.key === "Escape") {
    newTodoModal.classList.remove("active");
  }
  if (editTodoModal.classList.contains("active") && event.key === "Escape") {
    editTodoModal.classList.remove("active");
  }
  if (completeModal.classList.contains("active") && event.key === "Escape") {
    completeModal.classList.remove("active");
  }
});
addButton.addEventListener("click", function () {
  newTodoModal.classList.add("active");
});
for (const backPageButton of backPageButtons) {
  backPageButton.addEventListener("click", function () {
    editTodoModal.classList.remove("active");
    newTodoModal.classList.remove("active");
    completeModal.classList.remove("active");
  });
}
editTodoCancelButton.addEventListener("click", function () {
  editTodoModal.classList.remove("active");
});
newTodoAddButton.addEventListener("click", function () {
  const title = newTodoTitleInput.value.trim();
  const detail = newTodoDetailInput.value.trim();
  if (title === "") {
    alert("Please fill the title!");
    return;
  }
  if (detail === "") {
    alert("Please fill the detail!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    title,
    detail,
    complete: false,
  };
  todos.push(newTodo);
  saveTodos();
  refreshUI();
  newTodoModal.classList.remove("active");
  newTodoTitleInput.value = "";
  newTodoDetailInput.value = "";
  updateCounter(newTodoTitleInput, titleCounter, MAX_TITLE_LENGTH);
  updateCounter(newTodoDetailInput, detailCounter, MAX_DETAIL_LENGTH);
});

function render() {
  todoContainer.innerHTML = "";
  for (let todo of todos) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    todoCard.id = todo.id;
    const todoDetails = document.createElement("div");
    todoDetails.classList.add("todo-details");
    const todoCardTitle = document.createElement("p");
    todoCardTitle.classList.add("todo-title");
    todoCardTitle.textContent = todo.title;
    const todoCardCaption = document.createElement("p");
    todoCardCaption.classList.add("todo-caption");
    todoCardCaption.textContent = todo.detail;
    todoDetails.appendChild(todoCardTitle);
    todoDetails.appendChild(todoCardCaption);
    todoCard.appendChild(todoDetails);
    const todoButtons = document.createElement("div");
    todoButtons.classList.add("todo-buttons");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("aria-label", "Delete Todo");
    const deleteImgButton = document.createElement("img");
    deleteImgButton.setAttribute("src", "./icons/delete.svg");
    deleteButton.appendChild(deleteImgButton);
    todoButtons.appendChild(deleteButton);
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("aria-label", "Edit Todo");
    const editImgButton = document.createElement("img");
    editImgButton.setAttribute("src", "./icons/edit.svg");
    editButton.appendChild(editImgButton);
    todoButtons.appendChild(editButton);
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.setAttribute("type", "button");
    completeButton.setAttribute("aria-label", "Complete Todo");
    const completeImgButton = document.createElement("img");
    if (todo.complete) {
      completeImgButton.setAttribute("src", "./icons/CheckCircle.svg");
    } else {
      completeImgButton.setAttribute("src", "./icons/Tick.svg");
    }
    completeButton.appendChild(completeImgButton);
    todoButtons.appendChild(completeButton);
    todoCard.appendChild(todoButtons);
    todoContainer.appendChild(todoCard);
  }
}
editTodoUpdateButton.addEventListener("click", function () {
  editingTodo.title = editTodoTitle.value;
  editingTodo.detail = editTodoDetail.value;
  editTodoModal.classList.remove("active");
  editingTodo = null;
  saveTodos();
  refreshUI();
});
completeTodoButton.addEventListener("click", function () {
  console.log("ok");
  completeModal.classList.add("active");
  completeTodoContainer.innerHTML = "";
  for (const todo of todos) {
    if (todo.complete) {
      const todoCard = document.createElement("div");
      todoCard.classList.add("todo-card");
      const todoDetails = document.createElement("div");
      todoDetails.classList.add("todo-details");
      const todoCardTitle = document.createElement("p");
      todoCardTitle.classList.add("todo-title");
      todoCardTitle.textContent = todo.title;
      const todoCardCaption = document.createElement("p");
      todoCardCaption.classList.add("todo-caption");
      todoCardCaption.textContent = todo.detail;
      todoDetails.appendChild(todoCardTitle);
      todoDetails.appendChild(todoCardCaption);
      todoCard.appendChild(todoDetails);
      completeTodoContainer.appendChild(todoCard);
    }
  }
});
function editfunc() {
  const editbuttons = document.querySelectorAll(".edit-button");
  for (const editbutton of editbuttons) {
    editbutton.addEventListener("click", function (event) {
      editingTodo = todos.find(function (todo) {
        return todo.id === Number(event.target.closest(".todo-card").id);
      });
      editTodoTitle.value = editingTodo.title;
      editTodoDetail.value = editingTodo.detail;
      updateCounter(editTodoTitle, editTitleCounter, MAX_TITLE_LENGTH);
      updateCounter(editTodoDetail, editDetailCounter, MAX_DETAIL_LENGTH);
      editTodoModal.classList.add("active");
    });
  }
}
function deletefunc() {
  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", function (event) {
      const foundTodoIndex = todos.findIndex(function (todo) {
        return todo.id === Number(event.target.closest(".todo-card").id);
      });

      todos.splice(foundTodoIndex, 1);
      saveTodos();

      refreshUI();
    });
  }
}

function completeFunc() {
  const completeButtons = document.querySelectorAll(".complete-button");
  for (const completeButton of completeButtons) {
    completeButton.addEventListener("click", function (event) {
      const completeTodo = todos.find(function (todo) {
        return todo.id === Number(event.target.closest(".todo-card").id);
      });

      completeTodo.complete = !completeTodo.complete;
      saveTodos();
      refreshUI();
    });
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function refreshUI() {
  render();
  editfunc();
  deletefunc();
  completeFunc();
}
