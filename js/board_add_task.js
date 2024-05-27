let subtaskList = [];

function boardAddTask(boardStatus) {
  showBoardAddTask(boardStatus);
}

function showBoardAddTask(boardStatus) {
  console.log(boardStatus);
  document.getElementById('boardAddTask').classList.remove('dnone');
  let content = document.getElementById('boardAddTask');
  content.innerHTML = '';
  content.innerHTML = renderBoardAddTaskHTML(boardStatus);
  renderUsers();
  renderCategorys();
  restrictPastDate();
}

function closeAddTask() {
  document.getElementById('showBoardAddTask').classList.add('dnone');
}

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
  let content = document.getElementById('boardUsers');

  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == 0) continue;
    const user = users[i];
    content.innerHTML += renderUsersHTML(user, i);
  }
}

function renderUsersHTML(user, i) {
  return /*html*/ `
      <label for="checkbox${i}">
          <li class="contactList">        
              <div tabindex="0" class="emblem" style="background-color: ${user.color}">
                ${user.emblem}
              </div> 
              <div class="contactName" >${user.name}</div> 
              <input class="user-checkbox" onclick="showUsersEmblem()" type="checkbox" id="checkbox${i}" data-userid="${user.userId}">          
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
          <li class="contactList">
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
    document.getElementById('arrowDownCategory').style.display = 'block';
    document.getElementById('arrowUpCategory').style.display = 'none';
  } else {
    document.getElementById('boardTasks').classList.add('show');
    document.getElementById('arrowDownCategory').style.display = 'none';
    document.getElementById('arrowUpCategory').style.display = 'block';
  }
}

function selectCategory(index) {
  let selectedCategory = categorys[index];
  document.getElementById('selectedCategory').innerHTML = selectedCategory;
  showCategories(); // Hide the category list after selection
}

function restrictPastDate() {
  let dateInput = document.getElementById('date');
  let today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
function showUsersEmblem() {
  let usersEmblem = document.getElementById('usersEmblem');
  usersEmblem.innerHTML = '';
  let renderedCount = 0;
  let extraCount = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i]['userId'] == 0) continue;
    let contact = users[i];
    let checkedContact = document.getElementById(`checkbox${i}`);
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

function renderEmblemUsers(contact) {
  return /*html*/ `
      <div class="emblem" style="background-color: ${contact['color']}" id="${contact['userId']}">
      ${contact['emblem']}
    </div>  `;
}

function showUsers() {
  if (document.getElementById('boardUsers').classList.contains('show')) {
    document.getElementById('boardUsers').classList.remove('show');
    document.getElementById('arrowDownUser').style.display = 'block';
    document.getElementById('arrowUpUser').style.display = 'none';
  } else {
    document.getElementById('boardUsers').classList.add('show');
    document.getElementById('arrowDownUser').style.display = 'none';
    document.getElementById('arrowUpUser').style.display = 'block';
  }
}

// Max Subtaks Functions
function changeButtonsSubtask() {
  if (subtaskList.length < 5) {
    document.getElementById('subtask-right-regular').classList.add('dnone');
    document.getElementById('subtask-right-add').classList.remove('dnone');
  } else {
    document.getElementById('subtaskInput').style =
      'color:red; font-weight:bold;';
    document.getElementById('subtaskInput').readOnly = true;
    document.getElementById('subtaskInput').value = 'Maximal 5 Subtasks!';
    document.getElementById('subtaskContainer').style.border = '1px solid red';
  }
}

function removeSubtask() {
  subtask = document.getElementById('subtaskInput');
  subtask.value = '';
  document.getElementById('subtask-right-regular').classList.remove('dnone');
  document.getElementById('subtask-right-add').classList.add('dnone');
}

function removeIcons() {
  document.getElementById('subtask-right-regular').classList.remove('dnone');
  document.getElementById('subtask-right-add').classList.add('dnone');
}

function addSubtask() {
  let input = document.getElementById('subtaskInput').value;
  if (input == '') {
    document.getElementById('subtaskInput').placeholder =
      'Bitte etwas eingeben!';
    return;
  }
  // Überprüfe, ob bereits 5 Subtasks vorhanden sind
  if (subtaskList.length < 5) {
    document.getElementById('subtaskInput').placeholder = 'Add new Subtask';
    subtaskList.push(input);
    renderSubtask();
    document.getElementById('subtaskInput').value = '';
    removeSubtask();
  }
}

function deleteSubtask(i) {
  subtaskList.splice(i, 1);
  renderSubtask();
  document.getElementById('subtaskInput').value = '';
  document.getElementById('subtaskInput').readOnly = false;
  document.getElementById('subtaskInput').style = 'color:black;';
  document.getElementById('subtaskContainer').style.border =
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
    <div class="subtaskList" id="mainSubtask-container${i}">
            <input
              readonly
              type="text"
              id="subtaskList${i}"
              value="${subtaskList[i]}"
              />
              <div class="edit-images" id="edit-images${i}">
                <img onclick="editSubtask(${i})" id="editSubtask${i}" src="../assets/icons/edit_contacts_icon.svg" alt="">
                <div class="edit-seperator"></div>
                <img onclick="deleteSubtask(${i})" id="deleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
              </div>
            </div>
        </div>
  `;
}

function editSubtask(i) {
  document.getElementById(`subtaskList${i}`).readOnly = false;
  edit = document.getElementById(`edit-images${i}`);
  edit.innerHTML = editSubtaskHTML(i);
  document
    .getElementById(`mainSubtask-container${i}`)
    .classList.remove('subtaskList');
  document
    .getElementById(`mainSubtask-container${i}`)
    .classList.add('editsubtaskList');
  document.getElementById(`edit-images${i}`).classList.add('flex');
}

function checkSubtask(i) {
  document.getElementById(`subtaskList${i}`).readOnly = true;
  edit = document.getElementById(`edit-images${i}`);
  edit.innerHTML = checkSubtaskHTML(i);
  document
    .getElementById(`mainSubtask-container${i}`)
    .classList.add('subtaskList');
  document
    .getElementById(`mainSubtask-container${i}`)
    .classList.remove('editsubtaskList');
  document.getElementById(`edit-images${i}`).classList.remove('flex');
}

function editSubtaskHTML(i) {
  return /*html*/ `
    <img onclick="deleteSubtask(${i})" id="deleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
    <div class="edit-seperator"></div>
    <img  onclick="checkSubtask(${i})" id="checkSubtask${i}" src="../assets/icons/check.svg" alt="">
  `;
}
function checkSubtaskHTML(i) {
  return /*html*/ `
    <img onclick="editSubtask(${i})" id="editSubtask${i}" src="../assets/icons/edit_contacts_icon.svg" alt="">
    <div class="edit-seperator"></div>
    <img onclick="deleteSubtask(${i})" id="deleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
  `;
}

function getSelectedPrio() {
  let urgentBtn = document.getElementById('urgentPrio');
  let lowprioBtn = document.getElementById('lowPrio');
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
  console.log(lastCardId);
  return lastCardId; //
}

async function createNewTaskBoard(boardStatus, event) {
  console.log(boardStatus);
  event.preventDefault();
  let lastCardId = createCardId(tasks);
  let selectedUserIds = getSelectedUserIds();
  task = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    userId: selectedUserIds,
    date: document.getElementById('date').value,
    priority: getSelectedPrio(),
    category: document.getElementById('selectedCategory').innerHTML,
    subtask: subtaskList,
    status: boardStatus,
    cardId: lastCardId + 1,
  };
  resetUserDisplay();
  await postData('tasks', task);
  console.log(task);
  clearAllTasks(event);
}

function clearAllTasks(event) {
  // Verhindert das Standardverhalten des Buttons (das Absenden des Formulars)
  event.preventDefault();

  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  clearAllCheckbox();
  showUsersEmblem();
  clearDateAndPriority();
  clearSelectedCategory();
  clearSubtasks();
  clearSubtaskInput();
  resetUserDisplay();
}

function clearTitleAndDescription() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
}

function clearDateAndPriority() {
  document.getElementById('date').value = '';
  togglePriority('medium');
}

function clearSelectedCategory() {
  document.getElementById('selectedCategory').innerHTML =
    'Select task category';
}

function clearSubtasks() {
  subtaskList = [];
  document.getElementById('subtaskInput').value = '';
  renderSubtask();
}

function clearSubtaskInput() {
  let subtaskInput = document.getElementById('subtaskInput');
  subtaskInput.value = '';
  subtaskInput.placeholder = 'Add new Subtask';
  subtaskInput.readOnly = false;
  subtaskInput.style.color = 'black';
  document.getElementById('subtaskContainer').style.border =
    '1px solid #d1d1d1';
}

function resetUserDisplay() {
  let users = document.getElementById('boardUsers');
  users.classList.remove('show');
  document.getElementById('arrowDownUser').style.display = 'block';
  document.getElementById('arrowUpUser').style.display = 'none';
}

function clearAllCheckbox() {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}
