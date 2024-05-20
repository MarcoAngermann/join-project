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
  let toDo = tasks.filter((t) => t.status == 'To do');

  document.getElementById('toDo').innerHTML = '';

  for (let i = 0; i < toDo.length; i++) {
    const task = toDo[i];
    document.getElementById('toDo').innerHTML += renderSmallCardHTML(task, i);
  }

  let inProgress = tasks.filter((t) => t.status == 'In progress');

  document.getElementById('inProgress').innerHTML = '';

  for (let i = 0; i < inProgress.length; i++) {
    const task = inProgress[i];
    document.getElementById('inProgress').innerHTML += renderSmallCardHTML(
      task,
      i
    );
  }

  let awaitFeedback = tasks.filter((t) => t.status == 'Await feedback');

  document.getElementById('awaitFeedback').innerHTML = '';

  for (let i = 0; i < awaitFeedback.length; i++) {
    const task = awaitFeedback[i];
    document.getElementById('awaitFeedback').innerHTML += renderSmallCardHTML(
      task,
      i
    );
  }

  let done = tasks.filter((t) => t.status == 'Done');

  document.getElementById('done').innerHTML = '';

  for (let i = 0; i < done.length; i++) {
    const task = done[i];
    document.getElementById('done').innerHTML += renderSmallCardHTML(task, i);
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
        <div class="users" id="users">User1</div>
        <div class="priority" id="priority">
            <img src="../assets/icons/${task['priority']}.svg" alt="">
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
