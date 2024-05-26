async function initBoardAdd() {
  restrictPastDate();
  includeHTML();
  await usersArray();
  await tasksArray();
  renderUsers();
  renderCategorys();
}

let boardSubtasklist = [];

function resetElements(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('selected');
    elements[i].style.backgroundColor = 'white';
    elements[i].style.color = 'black';
    let svgPaths = elements[i].querySelectorAll('svg path');
    if (svgPaths) {
      for (let j = 0; j < svgPaths.length; j++) {
        // Setze die ursprüngliche Farbe des SVGs zurück, wenn die Priorität 'medium' ist
        if (elements[i].getAttribute('onclick').includes('medium')) {
          svgPaths[j].style.fill = '#FFA800';
        } else {
          svgPaths[j].style.fill = svgPaths[j].getAttribute('originalColor');
        }
      }
    }
  }
}

function setPriorityStyles(
  selectedElement,
  backgroundColor,
  textColor,
  svgColor
) {
  if (selectedElement) {
    selectedElement.classList.add('selected');
    selectedElement.style.backgroundColor = backgroundColor;
    selectedElement.style.color = textColor;
    let svgPaths = selectedElement.querySelectorAll('svg path');
    if (svgPaths) {
      for (let j = 0; j < svgPaths.length; j++) {
        svgPaths[j].style.fill = svgColor;
      }
    }
  }
}

function togglePriority(priority) {
  let elements = document.getElementsByClassName('prioBtn');
  resetElements(elements);

  // Hintergrundfarbe, Textfarbe und SVG-Farbe basierend auf der ausgewählten Priorität festlegen
  let selectedElement = document.querySelector("[onclick*='" + priority + "']");
  if (priority === 'urgent') {
    setPriorityStyles(selectedElement, '#FF3D00', 'white', 'white');
  } else if (priority === 'medium') {
    setPriorityStyles(selectedElement, '#FFA800', 'white', 'white');
  } else if (priority === 'low') {
    setPriorityStyles(selectedElement, '#7AE229', 'white', 'white');
  }
}

// Speichern Sie die ursprüngliche Farbe jedes SVGs
window.onload = function () {
  let elements = document.getElementsByClassName('prioBtn');
  for (let i = 0; i < elements.length; i++) {
    let svgPaths = elements[i].querySelectorAll('svg path');
    if (svgPaths) {
      for (let j = 0; j < svgPaths.length; j++) {
        svgPaths[j].setAttribute('originalColor', svgPaths[j].style.fill);
      }
    }
  }
};

function renderUsers() {
  let user = document.getElementById('boardUsers');

  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == 0) continue;
    const user = users[i];
    user.innerHTML += renderUsersHTML(user, i);
  }
}

function renderUsersHTML(user, i) {
  return /*html*/ `
        <label for="checkbox${i}">
            <li class="board-contactlist">        
                <div tabindex="0" class="emblem" style="background-color: ${user.color}">
                  ${user.emblem}
                </div> 
                <div class="board-contact-name" >${contact.name}</div> 
                <input class="board-user-checkbox" onclick="showUsersEmblem()" type="checkbox" id="checkbox${i}" data-userid="${contact.userId}">          
            </li>
        </label>
          `;
}

function renderCategorys() {
  let task = document.getElementById('boardTasks');

  for (let i = 0; i < categorys.length; i++) {
    task.innerHTML += renderCategorysHTML(i);
  }
}
function renderCategorysHTML(i) {
  return /*html*/ `
            <li class="board-contactList">
                  <span for="">
                      <div tabindex="0" onclick="selectCategory(${i})">
                        ${categorys[i]}
                      </div>
                  </span>
              </li>
          `;
}

function showCategories() {
  if (document.getElementById('boardTasks').classList.contains('show')) {
    document.getElementById('boardTasks').classList.remove('show');
    document.getElementById('boardArrowDownCategory').style.display = 'block';
    document.getElementById('boardArrowUpCategory').style.display = 'none';
  } else {
    document.getElementById('boardTasks').classList.add('show');
    document.getElementById('boardArrowDownCategory').style.display = 'none';
    document.getElementById('boardArrowUpCategory').style.display = 'block';
  }
}

function selectCategory(index) {
  let selectedCategory = categorys[index];
  document.getElementById('boardSelectedCategory').innerHTML = selectedCategory;
  showCategories(); // Hide the category list after selection
}

function restrictPastDate() {
  let dateInput = document.getElementById('boardDate');
  let today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
function showUsersEmblem() {
  let usersEmblem = document.getElementById('boardUsersEmblem');
  usersEmblem.innerHTML = '';
  let renderedCount = 0;
  let extraCount = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i]['userId'] == 0) continue;
    let contact = users[i];
    let checkedContact = document.getElementById(`boardCheckbox${i}`);
    if (checkedContact.checked == true) {
      if (renderedCount < 5) {
        usersEmblem.innerHTML += renderEmblemUsers(contact);
        renderedCount++;
      } else {
        extraCount++;
      }
    }
  }
  if (extraCount > 0) {
    usersEmblem.innerHTML += renderGreyEmblem(extraCount);
  }
}

function renderGreyEmblem(extraCount) {
  return `<div class="grey-emblem">+${extraCount}</div>`;
}

function renderGreyEmblem(remainingCount) {
  return `<div class="grey-emblem">+${remainingCount}</div>`;
}

function renderEmblemUsers(user) {
  return /*html*/ `
        <div class="board-emblem" style="background-color: ${user.color}" id="${user.userId}">
        ${user.emblem}
      </div>  `;
}

function showUsers() {
  if (document.getElementById('boardUsers').classList.contains('show')) {
    document.getElementById('boardUsers').classList.remove('show');
    document.getElementById('boardArrowDownUser').style.display = 'block';
    document.getElementById('boardArrowUpUser').style.display = 'none';
  } else {
    document.getElementById('boardUsers').classList.add('show');
    document.getElementById('boardArrowDownUser').style.display = 'none';
    document.getElementById('boardArrowUpUser').style.display = 'block';
  }
}

// Max Subtaks Functions
function changeButtonsSubtask() {
  if (subtaskList.length < 5) {
    document.getElementById('boardSubtaskRightRegular').classList.add('dnone');
    document.getElementById('boardSubtaskRightAdd').classList.remove('dnone');
  } else {
    document.getElementById('boardSubtaskInput').style =
      'color:red; font-weight:bold;';
    document.getElementById('boardSubtaskInput').readOnly = true;
    document.getElementById('boardSubtaskInput').value = 'Maximal 5 Subtasks!';
    document.getElementById('boardSubtaskContainer').style.border =
      '1px solid red';
  }
}

function removeSubtask() {
  subtask = document.getElementById('boardSubtaskInput');
  subtask.value = '';
  document.getElementById('boardSubtaskRightRegular').classList.remove('dnone');
  document.getElementById('boardSubtaskRightAdd').classList.add('dnone');
}

function removeIcons() {
  document.getElementById('boardSubtaskRightRegular').classList.remove('dnone');
  document.getElementById('boardSubtaskRightAdd').classList.add('dnone');
}

function addSubtask() {
  let input = document.getElementById('boardSubtaskInput').value;
  if (input == '') {
    document.getElementById('boardSubtaskInput').placeholder =
      'Bitte etwas eingeben!';
    return;
  }
  // Überprüfe, ob bereits 5 Subtasks vorhanden sind
  if (subtaskList.length < 5) {
    document.getElementById('boardSubtaskInput').placeholder =
      'Add new Subtask';
    subtaskList.push(input);
    renderSubtask();
    document.getElementById('boardSubtaskInput').value = '';
    removeSubtask();
  }
}

function deleteSubtask(i) {
  subtaskList.splice(i, 1);
  renderSubtask();
  document.getElementById('boardSubtaskInput').value = '';
  document.getElementById('boardSubtaskInput').readOnly = false;
  document.getElementById('boardSubtaskInput').style = 'color:black;';
  document.getElementById('boardSubtaskContainer').style.border =
    '1px solid #d1d1d1';
}

function renderSubtask() {
  let subtask = document.getElementById('subtask');
  subtask.innerHTML = '';
  for (let i = 0; i < Math.min(subtaskList.length, 5); i++) {
    subtask.innerHTML += renderSubtaskHTML(i);
  }
}

function renderSubtaskHTML(i) {
  return /*html*/ `
    <div class="board-subtasklist" id="boardMainSubtaskContainer${i}">
            <input
                readonly
                type="text"
                id="boardSubtasklist${i}"
                value="${boardSubtasklist[i]}"
                />
            <div class="board-edit-images" id="boardEditImages${i}">
                <img onclick="editSubtask(${i})" id=boardEditSubtask${i}" src="../assets/icons/edit_contacts_icon.svg" alt="">
                <div class="edit-seperator"></div>
                    <img onclick="deleteSubtask(${i})" id="boardDeleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
                </div>
            </div>
        </div>
    `;
}

function editSubtask(i) {
  document.getElementById(`boardSubtasklist${i}`).readOnly = false;
  edit = document.getElementById(`boardEditImages${i}`);
  edit.innerHTML = editSubtaskHTML(i);
  document
    .getElementById(`boardMainSubtaskContainer${i}`)
    .classList.remove('boardSubtasklist');
  document
    .getElementById(`boardMainSubtaskContainer${i}`)
    .classList.add('boardEditsubtasklist');
  document.getElementById(`boardEditImages${i}`).classList.add('flex');
}

function checkSubtask(i) {
  document.getElementById(`boardSubtasklist${i}`).readOnly = true;
  edit = document.getElementById(`boardEditImages${i}`);
  edit.innerHTML = checkSubtaskHTML(i);
  document
    .getElementById(`boardMainSubtaskContainer${i}`)
    .classList.add('board-subtasklist');
  document
    .getElementById(`boardMainSubtask-container${i}`)
    .classList.remove('boardEditsubtaskList');
  document.getElementById(`boardEditImages${i}`).classList.remove('flex');
}

function editSubtaskHTML(i) {
  return /*html*/ `
      <img onclick="deleteSubtask(${i})" id="boardDeleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
      <div class="board-edit-seperator"></div>
      <img  onclick="checkSubtask(${i})" id="boardCheckSubtask${i}" src="../assets/icons/check.svg" alt="">
    `;
}
function checkSubtaskHTML(i) {
  return /*html*/ `
    <img onclick="editSubtask(${i})" id="boardEditSubtask${i}" src="../assets/icons/edit_contacts_icon.svg" alt="">
    <div class="board-edit-seperator"></div>
    <img onclick="deleteSubtask(${i})" id="boardDeleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
    `;
}

function getSelectedPrio() {
  let urgentBtn = document.getElementById('boardUrgentPrio');
  let lowprioBtn = document.getElementById('boardLowPrio');
  if (urgentBtn.classList.contains('selected')) {
    return 'urgent';
  } else if (lowprioBtn.classList.contains('selected')) {
    return 'low';
  } else {
    return 'medium';
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

function createCardId(tasks) {
  let lastCardId = -1;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].cardId > lastCardId) {
      lastCardId = tasks[i].cardId;
    }
  }
  return lastCardId; //
}

function createAddtask(toDo) {
  createNewTask(toDo);
}

function createAddtask(inProgress) {
  createNewTask(inProgress);
}

function createAddtask(awaitFeedback) {
  createNewTask(awaitFeedback);
}
//in das createNewTask() kommt später der Status rein also = createNewTask(toDO)...
async function createNewTask(status) {
  // event.preventDefault();
  let lastCardId = createCardId(tasks);
  let selectedUserIds = getSelectedUserIds();
  task = {
    title: document.getElementById('boardTitle').value,
    description: document.getElementById('boardDescription').value,
    userId: selectedUserIds,
    date: document.getElementById('boardDate').value,
    priority: getSelectedPrio(),
    category: document.getElementById('boardSelectedCategory').innerHTML,
    subtask: subtaskList,
    status: status,
    cardId: lastCardId + 1,
  };
  resetUserDisplay();
  await postData('tasks', task);
  location.href = 'board.html';
  clearAllTasks(event);
}

function clearAllTasks(event) {
  // Verhindert das Standardverhalten des Buttons (das Absenden des Formulars)
  event.preventDefault();

  document.getElementById('boardTitle').value = '';
  document.getElementById('boardDescription').value = '';
  clearAllCheckbox();
  showUsersEmblem();
  clearDateAndPriority();
  clearSelectedCategory();
  clearSubtasks();
  clearSubtaskInput();
  resetUserDisplay();
}

function clearTitleAndDescription() {
  document.getElementById('boardTitle').value = '';
  document.getElementById('boardDescription').value = '';
}

function clearDateAndPriority() {
  document.getElementById('boardDate').value = '';
  togglePriority('medium');
}

function clearSelectedCategory() {
  document.getElementById('boardSelectedCategory').innerHTML =
    'Select task category';
}

function clearSubtasks() {
  subtaskList = [];
  document.getElementById('boardSubtaskInput').value = '';
  renderSubtask();
}

function clearSubtaskInput() {
  let subtaskInput = document.getElementById('boardSubtaskInput');
  subtaskInput.value = '';
  subtaskInput.placeholder = 'Add new Subtask';
  subtaskInput.readOnly = false;
  subtaskInput.style.color = 'black';
  document.getElementById('boardSubtaskContainer').style.border =
    '1px solid #d1d1d1';
}

function resetUserDisplay() {
  let users = document.getElementById('boardUsers');
  users.classList.remove('show');
  document.getElementById('boardArrowDownUser').style.display = 'block';
  document.getElementById('boardArrowUpUser').style.display = 'none';
}

function clearAllCheckbox() {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}
