async function initBoard() {
  includeHTML();
  await usersArray();
  await tasksArray();
  updateHTML();
}

let boardEdit = [];
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

function renderSmallCardHTML(task) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${task.cardId})" id="${task.cardId}" class="smallcard" onclick="showBigCard(${task.cardId})">
      <div class="category">
        <h2>${task.category}</h2>
        <img src="../assets/icons/more_vert_icon.svg" alt="">
      </div>
      <div class="title">
        <h3>${task.title}</h3>
      </div>
      <div class="description">
        <p>${task.description}</p>
      </div>
      <div class="subtaskProgress" role="subtaskProgressbar" aria-label="Example with label">
          <div id="subtaskProgress-bar${task.cardId}" class="subtaskProgress-bar" style="width: 0%"></div>
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

function showSmallUsersEmblem(task) {
  let smallUsersEmblem = document.getElementById(
    `smallUsersEmblem${task.cardId}`
  );
  smallUsersEmblem.innerHTML = '';
  let renderedCount = 0;
  let extraCount = 0;

  // Überprüfen Sie, ob die userId-Array existiert und nicht leer ist
  if (task.userId && task.userId.length > 0) {
    for (let userId of task.userId) {
      if (userId == 0) continue; // Überspringen, wenn userId 0 ist

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
    `subtaskProgress-bar${task.cardId}`
  );
  if (task.subtask && task.subtask.length > 0) {
    for (let j = 0; j < task.subtask.length; j++) {
      const subtask = task.subtask[j];
      smallSubtask.innerHTML += renderSmallSubtasksHTML(subtask); // Append each subtask's HTML to the string
    }
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

async function moveTo(status) {
  // Find the task object with the cardId equal to currentDraggedElement
  const task = tasks.find((t) => t.cardId == currentDraggedElement);
  task.status = status;
  // Update the board and HTML
  await updateBoard(status); // Assuming updateBoard is an async function
  updateHTML();
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

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

function closeBigCard() {
  document.getElementById('showBigCard').classList.add('dnone');
}

function showBigCard(cardId) {
  console.log(cardId);
  document.getElementById('showBigCard').classList.remove('dnone');
  let content = document.getElementById('showBigCard');
  content.innerHTML = '';
  content.innerHTML = renderBigCardHTML(cardId);
  showBigUsersEmblem(cardId);
  renderBigSubtasks(cardId);
}

function renderBigCardHTML(cardId) {
  let task = tasks.find((t) => t.cardId == cardId);

  return /*html*/ `
    <div id="bigCard${task.cardId}" class="bigCard"  onclick="dontClose()">
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
        <div id="bigUsersEmblem" class="big-user"></div>
      </div>
      <div  class="big-subtasks" >
        <span>Subtasks:</span>
        <div id="bigSubtasks" class="bigSubtasks">
        </div>
      </div>
      <div class="bigCard-edit">
        <div id="bigDelete" class="big-delete" onclick="deleteTaskOfBoard(${task.cardId})">
          <img  src="../assets/icons/delete_contact_icon.svg" alt="">
          <span>Delete</span>
        </div>
        <div class="seperator"></div>
        <div id="bigEdit" class="big-edit" onclick="editTaskOfBoard(${task.cardId})">
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
    </div>
  `;
}

function renderBigSubtasks(cardId) {
  let bigSubtask = document.getElementById('bigSubtasks');
  bigSubtask.innerHTML = ''; // Clear existing subtasks

  const task = tasks.find((t) => t.cardId == cardId);
  if (task && task.subtask) {
    for (let j = 0; j < task.subtask.length; j++) {
      const subtask = task.subtask[j];
      bigSubtask.innerHTML += renderBigSubtasksHTML(subtask, j); // Append each subtask's HTML to the string
    }
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

function dontClose() {
  event.stopPropagation();
}

async function deleteTaskOfBoard(cardId) {
  await deleteTask(cardId);
  closeBigCard();
  // Remove the task from the local 'tasks' array
  tasks = tasks.filter((task) => task.cardId !== cardId);
  updateHTML();
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
  return searchQuery.length < 3;
}

function filterTasks(searchQuery) {
  return tasks.filter((task) => {
    return (
      task.title.toLowerCase().startsWith(searchQuery) ||
      task.description.toLowerCase().startsWith(searchQuery)
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

function editTaskOfBoard(cardId) {
  let task = tasks.find((t) => t.cardId == cardId);
  let information = {
    cardId: cardId,
    category: task.category,
    date: task.date,
    description: task.description,
    priority: task.priority,
    status: task.status,
    title: task.title,
    subtask: subtaskList,
  };
  boardEdit.push(information);
  console.log(boardEdit);

  document.getElementById('showBigCard').innerHTML = boardAddTaskEdit(cardId);
}

function closeEditBoard() {
  document.getElementById('showBigCard').classList.add('dnone');
  boardEdit = [];
}

function renderInformation(cardId) {
  let task = tasks.find((t) => t.cardId == cardId);
  document.getElementById('title');
  document.getElementById('');
  document.getElementById('');
  document.getElementById('');
  document.getElementById('');
  document.getElementById('');
  document.getElementById('');
}
