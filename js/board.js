async function initBoard() {
  includeHTML();
  updateHTML();
  await usersArray();
  await tasksArray();
}

let users = [];
let tasks = [];
let status = ['To do', 'In progress', 'Await feedback', 'Done'];
let categorys = ['Technical Task', 'User Story', 'Development', 'Editing'];

async function tasksArray() {
  let tasksJson = await loadData('tasks');
  for (key in tasksJson) {
    let task = tasksJson[key];
    tasks.push(task);
  }
}
async function usersArray() {
  let usersJson = await loadData('users');
  for (key in usersJson) {
    let user = usersJson[key];
    users.push(user);
  }
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
  let toDo = tasks.filter((t) => t[key + 'status'] == 'toDo');

  document.getElementById('toDo').innerHTML = '';

  for (let i = 0; i < toDo.length; i++) {
    const status = toDo[i];
    document.getElementById('toDo').innerHTML += renderSmallCardHTML(status);
  }

  let inProgress = tasks.filter((t) => t[key + 'status'] == 'inProgress');

  document.getElementById('inProgress').innerHTML = '';

  for (let i = 0; i < inProgress.length; i++) {
    const status = inProgress[i];
    document.getElementById('inProgress').innerHTML +=
      renderSmallCardHTML(status);
  }

  let awaitFeedback = tasks.filter((t) => t[key + 'status'] == 'awaitFeedback');

  document.getElementById('awaitFeedback').innerHTML = '';

  for (let i = 0; i < awaitFeedback.length; i++) {
    const status = awaitFeedback[i];
    document.getElementById('awaitFeedback').innerHTML +=
      renderSmallCardHTML(status);
  }

  let done = tasks.filter((t) => t[key + 'status'] == 'done');

  document.getElementById('done').innerHTML = '';

  for (let i = 0; i < done.length; i++) {
    const status = done[i];
    document.getElementById('done').innerHTML += renderSmallCardHTML(status);
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function renderSmallCardHTML(status, i) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${status['id']})" id="smallCard${i}" class="smallcard" onclick="showBigCard(${i})">
      <div class="category">
        <h2>${status['category']}</h2>
        <img src="../assets/icons/more_vert_icon.svg" alt="">
      </div>
      <div class="title">
        <h3>${status['title']}</h3>
      </div>
      <div class="description">
        <p>description</p>
      </div>
      <div class="information">
        <div class="users" id="users">User1</div>
        <div class="priority" id="priority">
            <img src="../assets/icons/low.svg" alt="">
        </div>
      </div>
    </div> 
  `;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  dummyCards[currentDraggedElement]['category'] = category;
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
  return /*html*/ `
    <div id="bigCard${i}" class="bigCard">
      <div class="big-header">
        <div><span>category</span></div>
        <div>
            <img
            class="close"
            onclick="closeBigCard()"
            src="../assets/icons/close_icon.svg"
            alt="schließen"
            />
        </div>
      </div>
      <h1>Title</h1>
      <div><p>Description</p></div>
      <div class="big-date">
        <div><span>Due date:</span></div>
        <div><span>10/05/2023</span></div>
      </div>
      <div class="big-priority">
        <div><span>Priority:</span></div>
        <div> <img src="../assets/icons/low.svg" ></div>
      </div>
      <div class="big-users">
        <div><span>Assigned to:</span></div>
        <div class="big-contact">
            <div>
                <img src="../assets/icons/person_icon.svg" alt="">
                <span>test</span>
            </div>
            <div>
                <img src="../assets/icons/person_icon.svg" alt="">
                <span>test2</span></div>
            <div>
                <img src="../assets/icons/person_icon.svg" alt="">
                <span>test3</span>
            </div>
        </div>
        <div class="big-subtaks">
            <div><span>Subtasks</span></div>
            <div><span>Implement Recipe Recommendation</span></div>
            <div><span>Start Page Layout</span></div>
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
