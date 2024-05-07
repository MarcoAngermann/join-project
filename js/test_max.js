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
    category: 'done',
  },
];

let currentDraggedElement;

function updateHTML() {
  let toDo = dummyCards.filter((t) => t['category'] == 'toDo');

  document.getElementById('toDo').innerHTML = '';

  for (let i = 0; i < toDo.length; i++) {
    const element = toDo[i];
    document.getElementById('toDo').innerHTML += renderSmallCardHTML(element);
  }

  let inProgress = dummyCards.filter((t) => t['category'] == 'inProgress');

  document.getElementById('inProgress').innerHTML = '';

  for (let i = 0; i < inProgress.length; i++) {
    const element = inProgress[i];
    document.getElementById('inProgress').innerHTML +=
      renderSmallCardHTML(element);
  }

  let awaitFeedback = dummyCards.filter(
    (t) => t['category'] == 'awaitFeedback'
  );

  document.getElementById('awaitFeedback').innerHTML = '';

  for (let i = 0; i < awaitFeedback.length; i++) {
    const element = awaitFeedback[i];
    document.getElementById('awaitFeedback').innerHTML +=
      renderSmallCardHTML(element);
  }

  let done = dummyCards.filter((t) => t['category'] == 'done');

  document.getElementById('done').innerHTML = '';

  for (let i = 0; i < done.length; i++) {
    const element = done[i];
    document.getElementById('done').innerHTML += renderSmallCardHTML(element);
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function renderSmallCardHTML(element, i) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${element['id']})" id="smallCard${i}" class="smallcard" onclick="showBigCard(${i})">
      <div class="category">
        <h2>${element['category']}</h2>
        <img src="../assets/icons/more_vert_icon.svg" alt="">
      </div>
      <div class="title">
        <h3>${element['title']}</h3>
      </div>
      <div class="description">
        <p">description</p>
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
  todos[currentDraggedElement]['category'] = category;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

//
//
//
//
//
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