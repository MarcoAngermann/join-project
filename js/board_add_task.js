let subtaskList = [];

function showBoardAddTask(boardStatus) {
  console.log(boardStatus);
  document.getElementById('boardAddTask').classList.remove('dnone');
  console.log('Status:', boardStatus);
  let content = document.getElementById('boardAddTask');
  content.innerHTML = '';
  content.innerHTML = renderBoardAddTaskHTML(boardStatus);
  console.log(boardStatus);
  renderUsers();
  renderCategorys();
  restrictPastDate();
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
  let selectedElement = document.getElementById(priority + 'Prio');
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
  let content = document.getElementById('users');
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == 0) continue;
    const user = users[i];
    content.innerHTML += renderUsersHTML(user, i);
  }
}

function renderUsers() {
  let content = document.getElementById('users');

  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == 0) continue;
    const user = users[i];
    content.innerHTML += renderUsersHTML(user, i);
  }
}

function renderCategorys() {
  let task = document.getElementById('boardTasks');

  for (let i = 0; i < categorys.length; i++) {
    task.innerHTML += renderCategorysHTML(i);
  }
}

function showCategories() {
  resetCategoryErrorMessage();
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

function selectCategory(event, index) {
  event.stopPropagation();
  let selectedCategory = categorys[index];
  document.getElementById('selectedCategory').innerHTML = selectedCategory;
  showCategories();
}

function resetCategoryErrorMessage() {
  document.getElementById('categoryErrorMessage').innerHTML = '';
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
    if (users[i].userId == 0) continue;
    let contact = users[i];
    let contactListChecked = document.getElementById('contactList' + i);
    let checkedContact = document.getElementById(`checkbox${i}`);
    if (checkedContact.checked == true) {
      contactListChecked.classList.add('contactlist-selected');
      if (renderedCount < 5) {
        usersEmblem.innerHTML += renderEmblemUsers(contact);
        renderedCount++;
      } else {
        extraCount++;
      }
    } else {
      contactListChecked.classList.remove('contactlist-selected');
    }
  }
  if (extraCount > 0) {
    usersEmblem.innerHTML += renderGreyEmblem(extraCount);
  }
}

function showUsers() {
  if (document.getElementById('users').classList.contains('show')) {
    document.getElementById('users').classList.remove('show');
    document.getElementById('arrowDownUser').style.display = 'block';
    document.getElementById('arrowUpUser').style.display = 'none';
  } else {
    document.getElementById('users').classList.add('show');
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
    let newTask = { subtaskText: input, checked: false };
    subtaskList.push(newTask);
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
  subtaskList[i].subtaskText = document.getElementById(`subtaskList${i}`).value;
  renderSubtask();
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
    '.contactlist input[type="checkbox"]:checked'
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

// async function createNewTaskBoard(boardStatus, event) {
//   event.preventDefault();
//   console.log(boardStatus);
//   let lastCardId = createCardId(tasks);
//   let selectedUserIds = getSelectedUserIds();
//   task = {
//     title: document.getElementById('title').value,
//     description: document.getElementById('description').value,
//     userId: selectedUserIds,
//     date: document.getElementById('date').value,
//     priority: getSelectedPrio(),
//     category: document.getElementById('selectedCategory').innerHTML,
//     subtask: subtaskList,
//     status: boardStatus,
//     cardId: lastCardId + 1,
//   };
//   taskAddedToBoard();
//   setTimeout(async function () {
//     resetUserDisplay();
//     await postData('tasks', task);
//     clearAllTasks(event);
//     closeAddTaskBoard();
//     updateHTML();
//   }, 3000);
// }

async function createNewTaskBoard(boardStatus, event) {
  event.preventDefault();
  console.log(boardStatus);
  let selectedCategory = document.getElementById('selectedCategory').innerHTML;
  let spanContactContainer = document.getElementById(
    'selectedCategoryContainer'
  );
  let categoryErrorMessage = document.getElementById('categoryErrorMessage');
  if (
    selectedCategory === 'Select task category' ||
    selectedCategory.trim() === ''
  ) {
    spanContactContainer.style.border = '1px solid red';
    categoryErrorMessage.style.color = 'red';
    categoryErrorMessage.style.display = 'flex';
    categoryErrorMessage.innerHTML = 'Please select a category';
    return;
  }
  let lastCardId = createCardId(tasks);
  let selectedUserIds = getSelectedUserIds();
  let task = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    userId: selectedUserIds,
    date: document.getElementById('date').value,
    priority: getSelectedPrio(),
    category: selectedCategory,
    subtask: subtaskList,
    status: boardStatus,
    cardId: lastCardId + 1,
  };
  taskAddedToBoard();
  setTimeout(async function () {
    resetUserDisplay();
    await postData('tasks', task);
    clearAllTasks(event);
    closeAddTaskBoard();
    updateHTML();
  }, 3000);
}

function resetCategoryErrorMessage() {
  let spanContactContainer = document.getElementById(
    'selectedCategoryContainer'
  );
  let categoryErrorMessage = document.getElementById('categoryErrorMessage');
  spanContactContainer.style.border = '';
  categoryErrorMessage.style.display = 'none';
  categoryErrorMessage.style.color = '';
  categoryErrorMessage.innerHTML = '';
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

function closeAddTaskBoard() {
  closeBoardAddTaskAnimation();
  document.getElementById('boardAddTask').classList.add('dnone');
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
  let users = document.getElementById('users');
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

function taskAddedToBoard() {
  document.getElementById('taskAddedToBoard').classList.remove('dnone');
  setTimeout(function () {
    document.getElementById('taskAddedToBoard').classList.add('dnone');
  }, 3000);
}

function boardAddTaskAnimation() {
  let addTaskContainer = document.getElementById('addTaskMainContainer');
  addTaskContainer.classList.remove('move-right');
  addTaskContainer.classList.add('move-left');
}

function closeBoardAddTaskAnimation() {
  let addTaskContainer = document.getElementById('addTaskMainContainer');
  addTaskContainer.classList.add('move-right');
  addTaskContainer.classList.remove('move-left');
}
