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
    subtask: task.subtask,
  };
  boardEdit.push(information);
  console.log(boardEdit);
  document.getElementById('showBigCard').innerHTML = boardAddTaskEdit(cardId);
  renderInformation(cardId);
}

function closeEditBoard() {
  document.getElementById('showBigCard').classList.add('dnone');
  boardEdit = [];
}

function renderInformation(cardId) {
  let task = tasks.find((t) => t.cardId == cardId);
  document.getElementById('editTitle').value = task.title;
  document.getElementById('editDescription').value = task.description;
  document.getElementById('editDate').value = task.date;
  editTogglePriority(task.priority);
  renderEditUsers();
  restrictEditPastDate();
  showPickedUsersEmblems(cardId);
  renderEditSubtask(task.subtask);
}

function showEditUsers() {
  if (document.getElementById('editUsers').classList.contains('show')) {
    document.getElementById('editUsers').classList.remove('show');
    document.getElementById('arrowDownUser').style.display = 'block';
    document.getElementById('arrowUpUser').style.display = 'none';
  } else {
    document.getElementById('editUsers').classList.add('show');
    document.getElementById('arrowDownUser').style.display = 'none';
    document.getElementById('arrowUpUser').style.display = 'block';
  }
}
function editChangeButtonsSubtask() {
  if (!Array.isArray(boardEdit[0].subtask)) {
    boardEdit[0].subtask = [];
  }

  if (boardEdit[0].subtask.length < 5) {
    document.getElementById('editSubtaskRightRegular').classList.add('dnone');
    document.getElementById('editSubtaskRightAdd').classList.remove('dnone');
  } else {
    document.getElementById('editSubtaskInput').style =
      'color:red; font-weight:bold;';
    document.getElementById('editSubtaskInput').readOnly = true;
    document.getElementById('editSubtaskInput').value = 'Maximal 5 Subtasks!';
    document.getElementById('editSubtaskContainer').style.border =
      '1px solid red';
  }
}

function editRemoveSubtask() {
  subtask = document.getElementById('editSubtaskInput');
  subtask.value = '';
  document.getElementById('editSubtaskRightRegular').classList.remove('dnone');
  document.getElementById('editSubtaskRightAdd').classList.add('dnone');
}

function editRemoveIcons() {
  document.getElementById('editSubtaskRightRegular').classList.remove('dnone');
  document.getElementById('editSubtaskRightAdd').classList.add('dnone');
}

function editAddSubtask() {
  let input = document.getElementById('editSubtaskInput').value;
  if (input == '') {
    document.getElementById('editSubtaskInput').placeholder =
      'Bitte etwas eingeben!';
    return;
  }
  if (!boardEdit[0].subtask) {
    return;
  }
  // Überprüfe, ob bereits 5 Subtasks vorhanden sind
  if (boardEdit[0].subtask.length < 5) {
    document.getElementById('editSubtaskInput').placeholder = 'Add new Subtask';
    let newSubtask = { subtaskText: input, checked: false };
    boardEdit[0].subtask.push(newSubtask);
    document.getElementById('editSubtaskInput').value = '';
    renderEditSubtask(boardEdit[0].subtask);
    //editRemoveSubtask();
  }
}

function editDeleteSubtask(i) {
  boardEdit[0].subtask.splice(i, 1);
  renderEditSubtask(boardEdit[0].subtask);
  document.getElementById('editSubtaskInput').value = '';
  document.getElementById('editSubtaskInput').readOnly = false;
  document.getElementById('editSubtaskInput').style = 'color:black;';
  document.getElementById('editSubtaskContainer').style.border =
    '1px solid #d1d1d1';
}

function renderEditSubtask(subtasks) {
  let editSubtask = document.getElementById('editSubtask');
  editSubtask.innerHTML = '';
  if (!subtasks) {
    return;
  }
  for (let i = 0; i < Math.min(subtasks.length, 5); i++) {
    editSubtask.innerHTML += renderEditSubtaskHTML(subtasks[i].subtaskText, i);
  }
}

function editThisSubtask(i) {
  document.getElementById(`editSubtaskList${i}`).readOnly = false;
  edit = document.getElementById(`edit-images${i}`);
  edit.innerHTML = editThisSubtaskHTML(i);
  document
    .getElementById(`edit-main-subtask-container${i}`)
    .classList.remove('edit-subtasklist');
  document
    .getElementById(`edit-main-subtask-container${i}`)
    .classList.add('edit-list');
  document.getElementById(`edit-images${i}`).classList.add('flex');
}

function editCheckSubtask(i) {
  document.getElementById(`editSubtaskList${i}`).readOnly = true;
  edit = document.getElementById(`edit-images${i}`);
  edit.innerHTML = checkThisSubtaskHTML(i);
  document
    .getElementById(`edit-main-subtask-container${i}`)
    .classList.add('edit-subtasklist');
  document
    .getElementById(`edit-main-subtask-container${i}`)
    .classList.remove('edit-list');
  document.getElementById(`edit-images${i}`).classList.remove('flex');
}

function resetEditElements(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('edit-selected');
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

function setEditPriorityStyles(
  selectedElement,
  backgroundColor,
  textColor,
  svgColor
) {
  if (selectedElement) {
    selectedElement.classList.add('edit-selected');
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

function editTogglePriority(priority) {
  let elements = document.getElementsByClassName('edit-priobtn');
  resetEditElements(elements);
  // Hintergrundfarbe, Textfarbe und SVG-Farbe basierend auf der ausgewählten Priorität festlegen
  let selectedElement = document.getElementById('edit' + priority + 'Prio');
  if (priority === 'urgent') {
    setEditPriorityStyles(selectedElement, '#FF3D00', 'white', 'white');
  } else if (priority === 'medium') {
    setEditPriorityStyles(selectedElement, '#FFA800', 'white', 'white');
  } else if (priority === 'low') {
    setEditPriorityStyles(selectedElement, '#7AE229', 'white', 'white');
  }
}

window.onload = function () {
  let elements = document.getElementsByClassName('edit-priobtn');
  for (let i = 0; i < elements.length; i++) {
    let svgPaths = elements[i].querySelectorAll('svg path');
    if (svgPaths) {
      for (let j = 0; j < svgPaths.length; j++) {
        svgPaths[j].setAttribute('originalColor', svgPaths[j].style.fill);
      }
    }
  }
};

function getEditSelectedPrio() {
  let urgentBtn = document.getElementById('editurgentPrio');
  let lowprioBtn = document.getElementById('editlowPrio');
  if (urgentBtn.classList.contains('edit-selected')) {
    return 'urgent';
  } else if (lowprioBtn.classList.contains('edit-selected')) {
    return 'low';
  } else {
    return 'medium';
  }
}

function restrictEditPastDate() {
  let dateInput = document.getElementById('editDate');
  let today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

function renderEditUsers() {
  let content = document.getElementById('editUsers');

  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == 0) continue;
    const user = users[i];
    content.innerHTML += renderEditUsersHTML(user, i);
  }
}

let hiddenUserIds = new Set();
function showPickedUsersEmblems(cardId) {
  let editUsersEmblem = document.getElementById('editUsersEmblem');
  editUsersEmblem.innerHTML = '';
  let renderedCount = 0;
  let extraCount = 0;
  const task = tasks.find((t) => t.cardId == cardId);
  if (task && task.userId) {
    for (let userId of task.userId) {
      if (userId == 0) continue;

      let user = users.find((u) => u.userId == userId);
      if (user && renderedCount < 5) {
        editUsersEmblem.innerHTML += renderEditEmblemUsers(user);
        renderedCount++;
      } else {
        extraCount++;
      }
    }
    hiddenUserIds.clear();
    if (extraCount > 0) {
      let hiddenUsers = task.userId.slice(5); // Angenommen, es gibt maximal 5 sichtbare Embleme
      for (let userId of hiddenUsers) {
        hiddenUserIds.add(userId);
      }
      editUsersEmblem.innerHTML += renderGreyEmblem(extraCount);
    }
  }
  checkUserCheckboxesBasedOnEmblems();
  showEditUsersEmblem();
}

function showEditUsersEmblem() {
  let usersEmblem = document.getElementById('editUsersEmblem');
  usersEmblem.innerHTML = '';
  let renderedCount = 0;
  let extraCount = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == 0) continue;
    let user = users[i];
    let contactListChecked = document.getElementById('edit-contactlist' + i);
    let checkedContact = document.getElementById(`editCheckbox${i}`);
    if (checkedContact.checked == true) {
      contactListChecked.classList.add('edit-contactlist-selected');
      if (renderedCount < 5) {
        usersEmblem.innerHTML += renderEditEmblemUsers(user);
        renderedCount++;
      } else {
        extraCount++;
      }
    } else {
      contactListChecked.classList.remove('edit-contactlist-selected');
    }
  }
  if (extraCount > 0) {
    usersEmblem.innerHTML += renderGreyEmblem(extraCount);
  }
}

function checkUserCheckboxesBasedOnEmblems() {
  // Sammle alle Embleme, die im 'editUsersEmblem' Bereich gerendert wurden
  let renderedEmblems = document.querySelectorAll(
    '#editUsersEmblem .edit-emblem'
  );
  let renderedUserIds = new Set();

  // Füge die ID jedes gerenderten Emblems zum Set hinzu
  for (let emblem of renderedEmblems) {
    renderedUserIds.add(emblem.id);
  }

  // Durchlaufe alle Benutzer-Checkboxen und setze sie auf 'checked',
  // wenn ihre 'data-userid' in den gerenderten User-IDs enthalten ist
  let userCheckboxes = document.querySelectorAll('.edit-user-checkbox');
  for (let checkbox of userCheckboxes) {
    let userId = checkbox.dataset.userid;
    checkbox.checked = renderedUserIds.has(userId) || hiddenUserIds.has(userId);
  }
}

async function editTask(cardId, event) {
  event.preventDefault();
  let selectedUserIds = getEditSelectedUserIds();
  event.preventDefault();
  updatedTask = {
    title: document.getElementById('editTitle').value,
    description: document.getElementById('editDescription').value,
    userId: selectedUserIds,
    date: document.getElementById('editDate').value,
    priority: getEditSelectedPrio(),
    category: boardEdit[0].category,
    subtask: boardEdit[0].subtask,
    status: boardEdit[0].status,
    cardId: cardId,
  };
  resetEditUserDisplay();
  await updateEditBoard(cardId, updatedTask);
  await updateHTML();
  closeEditBoard();
  showBigCard(cardId);
}

async function updateEditBoard(cardId, updatedTask) {
  let tasksJSON = await loadData('tasks');
  for (let key in tasksJSON) {
    let task = tasksJSON[key];
    if (task.cardId == cardId) {
      await putData(`tasks/${key}/`, updatedTask);
    }
  }
}

function resetEditUserDisplay() {
  let users = document.getElementById('editUsers');
  users.classList.remove('show');
  document.getElementById('arrowDownUser').style.display = 'block';
  document.getElementById('arrowUpUser').style.display = 'none';
}

// wird später beim Ok benötigt
function getEditSelectedUserIds() {
  let checkboxes = document.querySelectorAll(
    '.edit-contactlist input[type="checkbox"]:checked'
  );
  let selectedUserIds = [];
  for (let checkbox of checkboxes) {
    let userId = checkbox.getAttribute('data-userid');
    selectedUserIds.push(userId);
  }
  return selectedUserIds;
}
