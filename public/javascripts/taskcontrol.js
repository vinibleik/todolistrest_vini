import taskService from "./taskservice.js";

const tasksList = document.querySelector("#tarefas");
const taskId = document.querySelector("#tid");
const taskName = document.querySelector("#tnome");
const taskPriority = document.querySelector("#priority");
const error = document.querySelector("#error");

/**
 * Remove the error message from the page
 */
function cleanError() {
  error.textContent = "";
  error.classList.add("show-error");
}

/**
 * Show the error with message msg
 * @param {string} msg error message to show
 */
function showError(msg) {
  error.textContent = msg;
  error.classList.remove("show-error");
}

/**
 * Creates a tasks done button
 * @param {object} task Object representing the task
 * @param {HTMLLIElement} li The list element of this task
 * @returns {HTMLButtonElement} The button element that deletes this task element
 */
function newButtonDelete(task, li) {
  const del = document.createElement("button");
  del.addEventListener("click", async function () {
    if (confirm("Deseja finalizar a tarefa?")) {
      let resp = await taskService.exclui(task.id);
      if (resp.status) {
        tasksList.removeChild(li);
        cleanError();
      } else {
        showError(resp.msg);
      }
    }
  });
  del.classList.add("btn", "btn-link");
  del.textContent = "done";
  return del;
}

/**
 * Creates a tasks edit button
 * @param {object} task Object representing the task
 * @returns {HTMLButtonElement} The button element that edits this task element
 */
function newButtonEdit(task) {
  const edit = document.createElement("button");
  edit.addEventListener("click", () => {
    taskId.value = task.id;
    taskName.value = task.name;
    taskPriority.value = task.priority;
  });
  edit.classList.add("btn", "btn-link");
  edit.textContent = "edit";
  return edit;
}

/**
 * Creates a new li elements that represents the task
 * @param {object} task Object representing the task
 * @returns {HTMLLIElement} Return a new List item element containing the task
 */
function newTaskItem(task) {
  const li = document.createElement("li");
  const edit = newButtonEdit(task);
  const del = newButtonDelete(task, li);
  li.appendChild(document.createTextNode(task.name + " "));
  li.appendChild(edit);
  li.appendChild(del);
  li.classList.add(task.priority);
  return li;
}

async function atualizaTarefas() {
  let resp = await taskService.lista();
  if (resp.status) {
    tasksList.innerHTML = "";
    resp.list.forEach((task) => {
      tasksList.appendChild(newTaskItem(task));
    });
    cleanError();
  } else {
    showError();
  }
}

window.addEventListener("load", function () {
  atualizaTarefas();

  document
    .querySelector("form")
    .addEventListener("submit", async function (evt) {
      evt.preventDefault();
      let resp;
      if (taskId.value) {
        resp = await taskService.altera(
          taskId.value,
          taskName.value,
          taskPriority.value
        );
      } else {
        resp = await taskService.novo(taskName.value, taskPriority.value);
      }
      if (resp.status) {
        atualizaTarefas();
        taskId.value = "";
        taskName.value = "";
        taskPriority.value = "low";
        cleanError();
      } else {
        showError(resp.msg);
      }
    });
});
