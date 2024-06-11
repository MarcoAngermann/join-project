async function initBoard() {
  includeHTML();
  await usersArray();
  await tasksArray();
  await updateHTML();
}

let boardEdit = [];
let status = ['toDo', 'in Progress', 'awaitFeedback', 'done'];
let currentDraggedElement;

async function updateHTML() {
  await tasksArray();
  updateTasksByStatus('toDo', 'toDo');
  updateTasksByStatus('inProgress', 'inProgress');
  updateTasksByStatus('awaitFeedback', 'awaitFeedback');
  updateTasksByStatus('done', 'done');
}

function updateTasksByStatus(status, elementId) {
  let filteredTasks = tasks.filter((task) => task.status == status);
  let boardCard = document.getElementById(elementId);
  boardCard.innerHTML = '';
  if (filteredTasks.length == 0) {
    boardCard.innerHTML = renderEmptyBoard(status);
    return;
  } else
    for (let i = 0; i < filteredTasks.length; i++) {
      boardCard.innerHTML += renderSmallCardHTML(filteredTasks[i], i);
      showSmallUsersEmblem(filteredTasks[i]);
      renderProgressBar(filteredTasks[i].cardId, tasks);
    }
}

function renderEmptyBoard(status) {
  return /*html*/ `
    <div class="empty-board">
      <span>No tasks ${status}</span>
    </div>
  `;
}

function renderSmallCardHTML(task) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${task.cardId})" id="${
    task.cardId
  }" class="smallcard" onclick="showBigCard(${
    task.cardId
  }); openBigCardAnimation()">
      <div class="category">
        <h3 style='background-color:${getBackgroundCategory(task)}'>${
    task.category
  }</h3>
        <div class="mobileBoard" id="mobileBoard" onclick="openMobileOptions(${
          task.cardId
        }, '${task.status}', event)"><img class="imgMobile" src="../assets/icons/more_vert_icon.svg"/></div>
        <div class="amobile_boardOptions" id="amobile_boardOptions${
          task.cardId
        }" style="display:none">            
            <p class="mobileClose"><b>Move To...</b><button class="btnClose" onclick="closeMobilOptions(event,${
              task.cardId
            })"><b>X</b></button></p>
            <a id="moveTo_${task.cardId}_toDo" onclick="mobilemoveTo('toDo',${
              task.cardId
            },event)">To&nbsp;Do</a>
            <a id="moveTo_${task.cardId}_inProgress" onclick="mobilemoveTo('inProgress',${
              task.cardId
            },event)">In&nbsp;Progress</a>
            <a id="moveTo_${task.cardId}_awaitFeedback" onclick="mobilemoveTo('awaitFeedback',${
              task.cardId
            },event)">Await&nbsp;Feedback</a>
            <a id="moveTo_${task.cardId}_done" onclick="mobilemoveTo('done',${task.cardId},event)">Done</a>
        </div>  
                         
      </div>
      <div class="title">
        <h4>${task.title}</h4>
      </div>
      <div class="description">
        <p>${task.description}</p>
      </div>
      <div class="subtask-progress" role="subtask-progressbar" aria-label="Example with label">
      <progress id="subtaskProgressBar${task.cardId}" max="100" ></progress>
      <p class="subtask-progress-count" id="subtasksCount${task.cardId}"></p>
      </div>
      <div class="information">
        <div class="smallUsersEmblem" id="smallUsersEmblem${task.cardId}"></div>
        <div class="priority" id="priority${task.cardId}">
            <img src="../assets/icons/${task.priority}.svg" alt="">
        </div>
      </div>
    </div> 
  `;
}

function getBackgroundCategory(task) {
  switch (task.category) {
    case 'User Story':
      return '#0038FF';
    case 'Technical Task':
      return '#1FD7C1';
    case 'Development':
      return '#FFBB2B';
    case 'Editing':
      return '#FF5EB3';
  }
}

function showSmallUsersEmblem(task) {
  let smallUsersEmblem = document.getElementById(
    `smallUsersEmblem${task.cardId}`
  );
  smallUsersEmblem.innerHTML = '';
  let renderedCount = 0;
  let extraCount = 0;
  if (task.userId && task.userId.length > 0) {
    for (let userId of task.userId) {
      if (userId == 0) continue;
      let user = users.find((u) => u.userId == userId);
      if (user) {
        if (renderedCount < 5) {
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
      <div class="smallUserEmblem" style="background-color: ${user.color}" id="${user.userId}">
      ${user.emblem}
    </div>  `;
}

function renderSmallSubtasks(task) {
  let smallSubtask = document.getElementById(
    `subtaskProgressBar${task.cardId}`
  );
  if (task.subtask && task.subtask.length > 0) {
    for (let j = 0; j < task.subtask.length; j++) {
      const subtask = task.subtask[j];
      smallSubtask.innerHTML += `<div>${subtask}</div> `; // Append each subtask's HTML to the string
    }
  }
}

function startDragging(cardId) {
  currentDraggedElement = cardId;
}

function allowDrop(event) {
  event.preventDefault();
}

async function moveTo(event, status) {
  event.stopPropagation();
  // Find the task object with the cardId equal to currentDraggedElement
  const task = tasks.find((t) => t.cardId == currentDraggedElement);
  task.status = status;
  removeHighlight(status);
  await updateBoard(status); // Assuming updateBoard is an async function
  await updateHTML();
}

async function updateBoard(status) {
  let tasksJSON = await loadData('tasks');
  for (let key in tasksJSON) {
    let task = tasksJSON[key];
    if (task.cardId == currentDraggedElement) {
      await putData(`tasks/${key}/status`, status);
    }
  }
}

function highlight(cardId) {
  document.getElementById(cardId).classList.add('drag-area-highlight');
}

function removeHighlight(status) {
  document.getElementById(status).classList.remove('drag-area-highlight');
}
//Dialog BigCard
function closeBigCard() {
  closeBigCardAnimation(`bigCard`);
  document.getElementById('showBigCard').classList.add('dnone');
}

async function showBigCard(cardId) {
  document.getElementById('showBigCard').classList.remove('dnone');
  let content = document.getElementById('showBigCard');
  content.innerHTML = '';
  content.innerHTML = renderBigCardHTML(cardId);
  showBigUsersEmblem(cardId);
  renderBigSubtasks(cardId);
  openBigCardAnimation(`bigCard${cardId}`);
}

function renderBigCardHTML(cardId) {
  let task = tasks.find((t) => t.cardId == cardId);
  return /*html*/ `
    <div id="bigCard${task.cardId}" class="bigCard"  onclick="dontClose()">
      <div class="big-header">
        <div><span class="bigTaskCategory" style='background-color:${getBackgroundCategory(
          task
        )}'>${task.category}</span></div>
        <div><img class="close" onclick="closeBigCard();" src="../assets/icons/close_icon.svg" alt="schließen"/></div>
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
        <div id="bigUsersEmblem" class="big-user"></div>
      </div>
      <div  class="big-subtasks" >
        <span>Subtasks:</span>
        <div id="bigSubtasks" class="bigSubtasks">
        </div>
      </div>
      <div class="bigCard-edit">
        <div id="bigDelete" class="big-delete" onclick="deleteTaskOfBoard(${
          task.cardId
        })">
          <img  src="../assets/icons/delete_contact_icon.svg" alt="">
          <span>Delete</span>
        </div>
        <div class="big-seperator"></div>
        <div id="bigEdit" class="big-edit" onclick="editTaskOfBoard(${
          task.cardId
        })">
          <img src="../assets/icons/edit-contacts_icon.svg" alt="">
          <span>Edit</span>
        </div>
      </div>
    </div>
  `;
}

async function showBigUsersEmblem(cardId) {
  let bigUsersEmblem = document.getElementById('bigUsersEmblem');
  bigUsersEmblem.innerHTML = '';
  const task = tasks.find((t) => t.cardId == cardId);
  if (task && task.userId) {
    for (let userId of task.userId) {
      if (userId == 0) continue; // Skip if userId is 0
      let user = users.find((u) => u.userId == userId);
      if (user) {
        bigUsersEmblem.innerHTML += renderBigEmblemUsers(user);
      }
    }
  }
}

function renderBigEmblemUsers(user) {
  return /*html*/ `
  <div class="big-single-user">
      <div class="bigUserEmblem" style="background-color: ${user.color}" id="${user.userId}">
        ${user.emblem}
      </div>  
      <span>${user.name}</span>
    </div>`;
}

async function renderBigSubtasks(cardId) {
  let bigSubtask = document.getElementById('bigSubtasks');
  bigSubtask.innerHTML = ''; // Clear existing subtasks
  const task = tasks.find((t) => t.cardId == cardId);
  if (task && task.subtask) {
    for (let j = 0; j < task.subtask.length; j++) {
      const subtask = task.subtask[j];
      bigSubtask.innerHTML += renderBigSubtasksHTML(cardId, subtask, j); // Append each subtask's HTML to the string
    }
  }
}

//die function in label ist erst einmal nur provisorisch
function renderBigSubtasksHTML(cardId, subtask, j) {
  return /*html*/ `
      <label for="checkbox${j}">
          <li class="bigSubtaskList">
              <input class="big-card-checkbox" onclick="checkedSubtask(${cardId}, ${j})" type="checkbox"  ${
    subtask.checked ? 'checked' : ''
  } id="checkbox${j}" data-userid="${j}">
              <div class="contactName">${subtask.subtaskText}</div>
          </li>
      </label>`;
}

function dontClose() {
  event.stopPropagation();
}

async function deleteTaskOfBoard(cardId) {
  await deleteTask(cardId);
  await updateHTML();
  closeBigCard();
}

async function deleteTask(cardId) {
  let tasksJSON = await loadData('tasks');
  for (let key in tasksJSON) {
    let task = tasksJSON[key];
    if (task.cardId == cardId) {
      await deleteData(`tasks/${key}`);
      console.log('Deleted task:', task);
    }
  }
}
//search function
function searchTasks() {
  let searchQuery = getSearchQuery();
  if (isSearchQueryTooShort(searchQuery)) {
    updateHTML();
    return;
  }
  let filteredTasks = filterTasks(searchQuery);
  clearTaskContainers();
  renderFilteredTasks(filteredTasks);
}

function getSearchQuery() {
  return document.getElementById('search').value.toLowerCase();
}

function isSearchQueryTooShort(searchQuery) {
  return searchQuery.length < 2; // angepasst auf 3 Zeichen
}

function filterTasks(searchQuery) {
  return tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery)
    );
  });
}

function clearTaskContainers() {
  document.getElementById('toDo').innerHTML = '';
  document.getElementById('inProgress').innerHTML = '';
  document.getElementById('awaitFeedback').innerHTML = '';
  document.getElementById('done').innerHTML = '';
}

function renderFilteredTasks(filteredTasks) {
  filteredTasks.forEach((task) => {
    let elementId = getElementIdByStatus(task.status);
    document.getElementById(elementId).innerHTML += renderSmallCardHTML(task);
    showSmallUsersEmblem(task);
    renderSmallSubtasks(task);
    renderProgressBar(task.cardId, tasks);
  });
}

function getElementIdByStatus(status) {
  switch (status) {
    case 'toDo':
      return 'toDo';
    case 'inProgress':
      return 'inProgress';
    case 'awaitFeedback':
      return 'awaitFeedback';
    case 'done':
      return 'done';
    default:
      return '';
  }
}

function getSelectedUserIds() {
  let checkboxes = document.querySelectorAll(
    '.contactList input[type="checkbox"]:checked'
  );
  let selectedUserIds = [];
  for (let checkbox of checkboxes) {
    let userId = checkbox.getAttribute('data-userid');
    selectedUserIds.push(userId);
  }
  return selectedUserIds;
}

async function checkedSubtask(cardId, isubtask) {
  let value = document.getElementById('checkbox' + isubtask).checked;
  await updateSubtasks(cardId, isubtask, value);
  await updateHTML();
}

async function updateSubtasks(cardId, isubtask, value) {
  let tasksJSON = await loadData('tasks');
  for (let key in tasksJSON) {
    let task = tasksJSON[key];
    if (task.cardId == cardId) {
      await putData(`tasks/${key}/subtask/${isubtask}/checked`, value);
    }
  }
}

function renderProgressBar(cardId, tasks) {
  const task = tasks.find((t) => t.cardId == cardId);
  let subtasks = task.subtask;
  updateProgressBarDisplay(cardId, subtasks);
}

function updateProgressBarDisplay(cardId, subtasks) {
  let checkedSubtasks = 0;
  if (subtasks != null && subtasks.length > 0) {
    for (let i = 0; i < subtasks.length; i++) {
      if (subtasks[i].checked == true) {
        checkedSubtasks += 1;
      }
    }
    let percent = checkedSubtasks / subtasks.length;
    percent = Math.round(percent * 100).toFixed(0);
    let colorProgressBar = document.getElementById(
      `subtaskProgressBar${cardId}`
    );
    colorProgressBar.value = percent;
    let subtasksCount = document.getElementById(`subtasksCount${cardId}`);
    subtasksCount.innerHTML =
      checkedSubtasks + '/' + subtasks.length + ' Subtasks';
  } else {
    let colorProgressBar = document.getElementById(
      `subtaskProgressBar${cardId}`
    );
    colorProgressBar.style.display = 'none';
  }
}

//mobile Board

async function mobilemoveTo(status, cardId, event) {
  event.stopPropagation();
  currentDraggedElement = cardId;
  moveTo(event, status);
}

function openMobileOptions(cardId, status ,event) {
  event.stopPropagation();
  let link = document.getElementById('moveTo_'+ cardId + '_' + status);  
  link.classList.add('disabled');    
  document.getElementById('amobile_boardOptions' + cardId).style.display = 'flex';
} 

function closeMobilOptions(event, cardId) {
  event.stopPropagation();
  document.getElementById('amobile_boardOptions' + cardId).style.display =
    'none';
}

let mobilWindow = window.matchMedia('(max-width: 770px)');
mobilWindow.addEventListener('change', myFunc);

// Funktion zur Überprüfung und Anpassung des Display-Styles
function myFunc() {
  const elements = document.querySelectorAll('.mobileBoard');
  elements.forEach((element) => {
    if (mobilWindow.matches) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
}

// Funktion zur initialen Überprüfung der Fensterbreite
function mobileDetails() {
  const elements = document.querySelectorAll('.mobileBoard');
  outWidth = window.innerWidth;
  elements.forEach((element) => {
    if (outWidth <= 770) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
}

function openBigCardAnimation(cardId) {
  let bigCard = document.getElementById(cardId);
  if (bigCard) {
    bigCard.classList.add('move-left');
  }
}

function closeBigCardAnimation(cardId) {
  let bigCard = document.getElementById(cardId);
  if (bigCard) {
    bigCard.classList.remove('move-left');
  }
}
