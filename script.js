const STATUSES = {
  TODO: "todo",
  INPROGRESS: "inprogress",
  DONE: "done",
  BLOCKED: "blocked",
};

let todos = [
  {
    id: 1,
    text: "[loan-management] - Add card component",
    status: STATUSES.TODO,
  },
  {
    id: 2,
    text: "[loan-management] - Implement authentication",
    status: STATUSES.INPROGRESS,
  },
  {
    id: 3,
    text: "[loan-management] - Fix bug in reports",
    status: STATUSES.DONE,
  },
  {
    id: 4,
    text: "[loan-management] - Update dependencies",
    status: STATUSES.BLOCKED,
  },
];

const todoTasksContainer = document.getElementById("todo-task");
const inprogressTasksContainer = document.getElementById("inprogress-task");
const doneTasksContainer = document.getElementById("done-task");
const blockedTasksContainer = document.getElementById("blocked-task");
const dialogContainer = document.querySelector("div.dialogContainer");
const addButton = document.getElementById("add");
const submitButton = document.getElementById("submit");
const inputElement = document.getElementById("inputElement");
const selectElement = document.getElementById("selectElement");
const enterTask = document.querySelector("p.enter");
const error = document.getElementById("error");

let taskId = 0;
let creatingTask = false;

function updateTaskCount() {
  const todoCount = todos.filter(
    (task) => task.status === STATUSES.TODO
  ).length;
  const inProgressCount = todos.filter(
    (task) => task.status === STATUSES.INPROGRESS
  ).length;
  const doneCount = todos.filter(
    (task) => task.status === STATUSES.DONE
  ).length;
  const blockedCount = todos.filter(
    (task) => task.status === STATUSES.BLOCKED
  ).length;

  // Update count displays
  document.getElementById("todo-count").innerText = todoCount;
  document.getElementById("inprogress-count").innerText = inProgressCount;
  document.getElementById("done-count").innerText = doneCount;
  document.getElementById("blocked-count").innerText = blockedCount;
}

function renderTodoApp() {
  let todoTasks = ``;
  let inprogressTasks = ``;
  let doneTasks = ``;
  let blockedTasks = ``;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status === STATUSES.TODO) {
      todoTasks += `
                <div class="task"> 
                    <div class="circle"></div>
                    <p class="text">
                        ${todos[i].text}
                    </p>
                    <button onclick="editTask(${todos[i].id})" class="iconButton">
                        <i class="ri-pencil-line" style="color: #999999; cursor: pointer;"></i>
                    </button>
                    <button onclick="removeTask(${todos[i].id})" class="iconButton">
                        <i class="ri-delete-bin-line" style="color: #A30000; cursor: pointer;"></i>
                    </button>
                </div>`;
    }
    if (todos[i].status === STATUSES.INPROGRESS) {
      inprogressTasks += `
                <div class="task"> 
                    <div class="circle"></div>
                    <p class="text">
                        ${todos[i].text}
                    </p>
                    <button onclick="editTask(${todos[i].id})" class="iconButton">
                        <i class="ri-pencil-line" style="color: #999999; cursor: pointer;"></i>
                    </button>
                    <button onclick="removeTask(${todos[i].id})" class="iconButton">
                        <i class="ri-delete-bin-line" style="color: #A30000; cursor: pointer;"></i>
                    </button>
                </div>`;
    }
    if (todos[i].status === STATUSES.DONE) {
      doneTasks += `
                <div class="task"> 
                    <div class="circle"></div>
                    <p class="text">
                        ${todos[i].text}
                    </p>
                    <button onclick="editTask(${todos[i].id})" class="iconButton">
                        <i class="ri-pencil-line" style="color: #999999; cursor: pointer;"></i>
                    </button>
                    <button onclick="removeTask(${todos[i].id})" class="iconButton">
                        <i class="ri-delete-bin-line" style="color: #A30000; cursor: pointer;"></i>
                    </button>
                </div>`;
    }
    if (todos[i].status === STATUSES.BLOCKED) {
      blockedTasks += `
                <div class="task"> 
                    <div class="circle"></div>
                    <p class="text">
                        ${todos[i].text}
                    </p>
                    <button onclick="editTask(${todos[i].id})" class="iconButton">
                        <i class="ri-pencil-line" style="color: #999999; cursor: pointer;"></i>
                    </button>
                    <button onclick="removeTask(${todos[i].id})" class="iconButton">
                        <i class="ri-delete-bin-line" style="color: #A30000; cursor: pointer;"></i>
                    </button>
                </div>`;
    }
  }

  todoTasksContainer.innerHTML = todoTasks;
  inprogressTasksContainer.innerHTML = inprogressTasks;
  doneTasksContainer.innerHTML = doneTasks;
  blockedTasksContainer.innerHTML = blockedTasks;
  inputElement.value = "";
  selectElement.value = "";
  taskId = 0;
  creatingTask = false;

  // Update task counts
  updateTaskCount();
}

function addTask() {
  creatingTask = true;
  dialogContainer.classList.add("flex");
  enterTask.innerHTML = "Enter task";
}

function submitTask() {
  if (creatingTask) {
    todos.push({
      text: inputElement.value,
      status: selectElement.value,
      id: randomIntFromInterval(),
    });
  } else {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === taskId) {
        todos[i].text = inputElement.value;
        todos[i].status = selectElement.value;
      }
    }
  }

  renderTodoApp();
  dialogContainer.classList.remove("flex");
}

function removeTask(id) {
  todos = todos.filter((task) => task.id !== id);
  renderTodoApp();
}

function editTask(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      inputElement.value = todos[i].text;
      selectElement.value = todos[i].status;
    }
  }
  taskId = id;
  dialogContainer.classList.add("flex");
  enterTask.innerHTML = "Edit task";
}

function randomIntFromInterval() {
  return Math.floor(Math.random() * 1000);
}

renderTodoApp();
addButton.addEventListener("click", addTask);
submitButton.addEventListener("click", submitTask);
