async function initBoard() {
  includeHTML();
  await usersArray();
  await tasksArray();
  updateHTML();
}

let users = [];
let tasks = [];
let status = ['To do', 'In progress', 'Await feedback', 'Done'];
let categorys = ['Technical Task', 'User Story', 'Development', 'Editing'];

async function tasksArray() {
  let tasksJson = await loadData('tasks');
  console.log('Loaded tasks:', tasksJson); // Debugging line
  for (let key in tasksJson) {
    let task = tasksJson[key];
    tasks.push(task);
  }
  console.log('Tasks array:', tasks); // Debugging line
}

async function usersArray() {
  let usersJson = await loadData('users');
  console.log('Loaded users:', usersJson); // Debugging line
  for (let key in usersJson) {
    let user = usersJson[key];
    users.push(user);
  }
  console.log('Users array:', users); // Debugging line
}

let dummyCards = [
  {
    id: 0,
    title: 'Putzen',
    category: 'toDo',
  },
  {
    id: 1,
    title: 'Kochen',
    category: 'inProgress',
  },
  {
    id: 2,
    title: 'Einkaufen',
    category: 'awaitFeedback',
  },
  {
    id: 3,
    title: 'Verkaufen',
    category: 'toDo',
  },
  {
    id: 4,
    title: 'Verkaufen',
    category: 'toDo',
  },
  {
    id: 5,
    title: 'Putzen',
    category: 'toDo',
  },
];

let currentDraggedElement;

function updateHTML() {
  updateTasksByStatus('To do', 'toDo');
  updateTasksByStatus('In progress', 'inProgress');
  updateTasksByStatus('Await feedback', 'awaitFeedback');
  updateTasksByStatus('Done', 'done');
}

function updateTasksByStatus(status, elementId) {
  let filteredTasks = tasks.filter((task) => task.status === status);
  console.log(filteredTasks);
  let boardCard = document.getElementById(elementId);

  boardCard.innerHTML = '';

  for (let i = 0; i < filteredTasks.length; i++) {
    boardCard.innerHTML += renderSmallCardHTML(filteredTasks[i], i);
    console.log(filteredTasks[i]);
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function renderSmallCardHTML(task, i) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${task['cardId']})" id="smallCard${i}" class="smallcard" onclick="showBigCard(${i})">
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
      <div class="information">
        <div class="users" id="users">${task['userId']}</div>
        <div class="priority" id="priority">
            <img src="../assets/icons/${task['priority']}.svg" alt="">
        </div>
      </div>
    </div> 
  `;
}

function allowDrop(event) {
  event.preventDefault();
}

function moveTo(category) {
  tasks[currentDraggedElement] = category;
  console.log('Moved to:', category);
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

function showBigCard(i) {
  document.getElementById('showBigCard').classList.remove('dnone');
  content = document.getElementById('showBigCard');
  content.innerHTML = renderBigCardHTML(i);
}

// Function to close the image
function closeBigCard() {
  document.getElementById('showBigCard').classList.add('dnone');
}

function renderBigCardHTML(i) {
  let task = tasks[i];
  return /*html*/ `
    <div id="bigCard${i}" class="bigCard">
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
      <h1>${task.title}</h1>
      <div><p>${task.description}</p></div>
      <div class="big-date">
        <div><span>Due date:</span></div>
        <div><span>${task.date}</span></div>
      </div>
      <div class="big-priority">
        <div><span>Priority:</span></div>
        <div>
          <span>${task.priority}</span>
          <img src="../assets/icons/${task.priority}.svg">
        </div>
      </div>
      <div class="big-users">
        <div>
          <span>Assigned to:</span>
        </div>
        <div class="big-contact">
        <div id="bigUsersEmblem" style="display: inline-flex"></div>
        </div>
      </div>
      <div class="big-subtasks">
        <div>
          <span>Subtasks:</span>
        </div>
        <div class="bigSubtask">
          <div id="bigSubtask">${task.subtask}</div>
        </div>
      </div>
      <div class="bigCard-edit">
        <div class="big-delete">
          <img src="../assets/icons/delete_contact_icon.svg" alt="">
          <span>Delete</span>
        </div>
        <div class="seperator"></div>
        <div class="big-edit">
          <img src="../assets/icons/edit contacts_icon.svg" alt="">
          <span>Edit</span>
        </div>
      </div>
    </div>
  `;
}

//function renderBigCardHTML(i) {
//  return /*html*/ `
//    <div id="bigCard${i}" class="bigCard">
//      <div class="big-header">
//        <div id="bigCategory"></div>
//        <div>
//            <img
//            class="close"
//            onclick="closeBigCard()"
//            src="../assets/icons/close_icon.svg"
//            alt="schließen"
//            />
//        </div>
//      </div>
//      <h1 id="bigTitle"></h1>
//      <div id="bigDescription"></div>
//      <div class="bigDate">
//        <div><span>Due date:</span></div>
//        <div id="bigDate"></div>
//      </div>
//      <div class="bigPriority">
//        <div><span>Priority:</span></div>
//        <div id="bigPriority"></div>
//      </div>
//      <div class="bigUsers">
//        <div><span>Assigned to:</span></div>
//        <div id="bigUsers" class="big-contact"></div>
//        <div class="big-subtaks">
//            <div><span>Subtasks</span></div>
//            <div id="bigSubtasks"></div>
//        </div>
//        <div class="bigCard-edit">
//            <div class="big-delete">
//                <img src="../assets/icons/delete_contact_icon.svg" alt="">
//                <span>Delete</span>
//            </div>
//            <div class="seperator"></div>
//            <div class="big-edit">
//                <img src="../assets/icons/edit contacts_icon.svg" alt="">
//                <span>Edit</span>
//            </div>
//      </div>
//    </div>
//  `;
//}
