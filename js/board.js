async function initBoard() {
  includeHTML();
  await usersArray();
  await tasksArray();
  updateHTML();
}

let board = [];
let status = ['toDo', 'in Progress', 'awaitFeedback', 'done'];
let currentDraggedElement;

function updateProgressBar() {
  let percent = (currentSubtask + 1) / tasks.subtask.length;
  percent = Math.round(percent * 100);
  document.getElementById('subtaskProgress-bar').innerHTML = `${percent} %`;
  document.getElementById('subtaskProgress-bar').style = `width: ${percent}%;`;
}

async function updateHTML() {
  updateTasksByStatus('toDo', 'toDo');
  updateTasksByStatus('inProgress', 'inProgress');
  updateTasksByStatus('awaitFeedback', 'awaitFeedback');
  updateTasksByStatus('done', 'done');
}

function updateTasksByStatus(status, elementId) {
  let filteredTasks = tasks.filter((task) => task.status == status);

  let boardCard = document.getElementById(elementId);

  boardCard.innerHTML = '';

  for (let i = 0; i < filteredTasks.length; i++) {
    (boardCard.innerHTML += renderSmallCardHTML(filteredTasks[i], i)),
      showSmallUsersEmblem(filteredTasks[i]),
      renderSmallSubtasks(filteredTasks[i]);
  }
}

function renderSmallCardHTML(task, i) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${task['cardId']})" id="card${task['cardId']}" class="smallcard" onclick="showBigCard(${task['cardId']})">
      <div class="category">
        <h2>${task['category']}</h2>
        <img src="../assets/icons/more_vert_icon.svg" alt="">
      </div>
      <div class="title">
        <h3>${task['title']}</h3>
      </div>
      <div class="description">
        <p>${task['description']}</p>
      </div>
      <div class="subtaskProgress" role="subtaskProgressbar" aria-label="Example with label">
          <div id="subtaskProgress-bar${task['cardId']}" class="subtaskProgress-bar" style="width: 0%"></div>
      </div>
      <div class="information">
        <div class="smallUsersEmblem" id="smallUsersEmblem${task['cardId']}"></div>
        <div class="priority" id="priority${task['cardId']}">
            <img src="../assets/icons/${task['priority']}.svg" alt="">
        </div>
      </div>
    </div> 
  `;
}

function showSmallUsersEmblem(task) {
  let smallUsersEmblem = document.getElementById(
    `smallUsersEmblem${task['cardId']}`
  );
  smallUsersEmblem.innerHTML = '';
  let renderedCount = 0;
  let extraCount = 0;

  for (let j = 0; j < users.length; j++) {
    if (users[j]['userId'] == 0) continue;

    for (let k = 0; k < task['userId'].length; k++) {
      if (users[j]['userId'] == task['userId'][k]) {
        if (renderedCount < 5) {
          let user = users[j];
          smallUsersEmblem.innerHTML += renderSmallUsersEmblem(user);
          renderedCount++;
        } else {
          extraCount++;
        }
      }
    }
  }
  if (extraCount > 0) {
    smallUsersEmblem.innerHTML += renderGreyEmblem(extraCount);
  }
}
function renderGreyEmblem(extraCount) {
  return `<div class="grey-emblem">+${extraCount}</div>`;
}

function renderGreyEmblem(remainingCount) {
  return `<div class="grey-emblem">+${remainingCount}</div>`;
}

function renderSmallUsersEmblem(user) {
  return /*html*/ `
      <div class="smallUserEmblem" style="background-color: ${user['color']}" id="${user['userId']}">
      ${user['emblem']}
    </div>  `;
}

function renderSmallSubtasks(task) {
  let smallSubtask = document.getElementById(
    `subtaskProgress-bar${task['cardId']}`
  ); // Use task['cardId'] instead of i

  for (let j = 0; j < task['subtask'].length; j++) {
    const subtask = task['subtask'][j];
    smallSubtask.innerHTML += renderSmallSubtasksHTML(subtask); // Append each subtask's HTML to the string
  }
}

function renderSmallSubtasksHTML(subtask) {
  return /*html*/ `
      <div>${subtask}</div>
  `;
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(event) {
  event.preventDefault();
}

function moveTo(status) {
  tasks[currentDraggedElement].status = status;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

function closeBigCard() {
  document.getElementById('showBigCard').classList.add('dnone');
}

function showBigCard(i) {
  document.getElementById('showBigCard').classList.remove('dnone');
  content = document.getElementById('showBigCard');
  (content.innerHTML = renderBigCardHTML(i)),
    showBigUsersEmblem(i),
    renderBigSubtasks(i);
}

// Function to close the image

function renderBigSubtasks(i) {
  let bigSubtask = document.getElementById(`bigSubtasks${i}`);

  for (let j = 0; j < tasks[i]['subtask'].length; j++) {
    const subtask = tasks[i]['subtask'][j];
    bigSubtask.innerHTML += renderBigSubtasksHTML(subtask, j); // Append each subtask's HTML to the string
  }
}

function renderBigSubtasksHTML(subtask, j) {
  return /*html*/ `
      <label for="checkbox${j}">
          <li class="bigSubtaskList">
              <input type="checkbox" id="checkbox${j}">
              <div class="contactName">${subtask}</div>         
          </li>
      </label>
  `;
}

function renderBigCardHTML(i) {
  let task = tasks[i];
  return /*html*/ `
  <div>
    <div id="bigCard${task['cardId']}" class="bigCard">
      <div class="big-header">
        <div><span>${task.category}</span></div>
        <div>
            <img
            class="close"
            onclick="closeBigCard()"
            src="../assets/icons/close_icon.svg"
            alt="schließen"
            />
        </div>
      </div>
      <div class="big-title">
        <h1>${task.title}</h1>
      </div>
      <div><p>${task.description}</p></div>
      <div class="big-date">
        <div><span>Due date:</span></div>
        <div><span>${task.date}</span></div>
      </div>
      <div class="big-priority">
        <div><span>Priority:</span></div>
        <div class="big-priority">
          <span>${task.priority}</span>
          <img src="../assets/icons/${task.priority}.svg">
        </div>
      </div>
      <div class="big-users">
        <div>
          <span>Assigned to:</span>
        </div>
        <div id="bigUsersEmblem" class="big-contact" style="display: inline-flex"></div>
      </div>
      <div  class="big-subtasks" >
        <span>Subtasks:</span>
        <div id="bigSubtasks${i}" class="bigSubtasks">
        </div>
      </div>
      <div class="bigCard-edit">
        <div id="bigDelete${i}" class="big-delete">
          <img src="../assets/icons/delete_contact_icon.svg" alt="">
          <span>Delete</span>
        </div>
        <div class="seperator"></div>
        <div id="bigEdit${i}" class="big-edit">
          <img src="../assets/icons/edit-contacts_icon.svg" alt="">
          <span>Edit</span>
        </div>
      </div>
    </div>
    </div>
  `;
}

function showBigUsersEmblem(i) {
  let bigUsersEmblem = document.getElementById('bigUsersEmblem');
  bigUsersEmblem.innerHTML = '';

  for (let j = 0; j < users.length; j++) {
    if (users[j]['userId'] == 0) continue;

    for (let k = 0; k < tasks[i]['userId'].length; k++) {
      if (users[j]['userId'] == tasks[i]['userId'][k]) {
        let user = users[j];
        bigUsersEmblem.innerHTML += renderBigEmblemUsers(user);
        break;
      }
    }
  }
}

function renderBigEmblemUsers(user) {
  return /*html*/ `
      <div class="bigUserEmblem" style="background-color: ${user['color']}" id="${user['userId']}">
      ${user['emblem']}
    </div>  `;
}

//Umbauen für die Progressbar

//function showUsersEmblem() {
//  let usersEmblem = document.getElementById('usersEmblem');
//  usersEmblem.innerHTML = '';
//  for (let i = 0; i < users.length; i++) {
//    if (users[i]['userId'] == 0) continue;
//    contact = users[i];
//    let checkedContact = document.getElementById(`checkbox${i}`);
//    if (checkedContact.checked == true) {
//      usersEmblem.innerHTML += renderEmblemUsers(contact);
//    }
//  }
//}
