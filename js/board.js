/**
 * Initializes the board by including HTML, fetching user and task data, and updating the HTML.
 *
 * @return {Promise<void>} A promise that resolves when the board is fully initialized.
 */
async function initBoard() {
  includeHTML();
  await usersArray();
  await tasksArray();
  await updateHTML();
}

let boardEdit = [];
let status = ['toDo', 'in Progress', 'awaitFeedback', 'done'];
let currentDraggedElement;

/**
 * Updates the HTML by calling functions to update tasks by status.
 *
 */
async function updateHTML() {
  await tasksArray();
  updateTasksByStatus('toDo', 'toDo');
  updateTasksByStatus('inProgress', 'inProgress');
  updateTasksByStatus('awaitFeedback', 'awaitFeedback');
  updateTasksByStatus('done', 'done');
}

/**
 * Updates tasks on the board based on their status.
 *
 * @param {string} status - The status of the tasks to be updated.
 * @param {string} elementId - The ID of the HTML element to update with the tasks.
 * @return {void} This function does not return a value.
 */
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

/**
 * Renders an empty board HTML element with a message indicating the specified status.
 *
 * @param {string} status - The status to display in the message.
 * @return {string} The HTML code for the empty board element.
 */
function renderEmptyBoard(status) {
  return /*html*/ `
    <div class="empty-board">
      <span>No tasks ${status}</span>
    </div>
  `;
}

/**
 * Renders a small card HTML element with the given task information.
 *
 * @param {Object} task - The task object containing information about the task.
 * @return {string} The HTML code for the small card element.
 */
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
        }, '${
    task.status
  }', event)"><img class="imgMobile" src="../assets/icons/more_vert_icon.svg"/></div>
        <div class="amobile_boardOptions" id="amobile_boardOptions${
          task.cardId
        }" style="display:none">            
            <p class="mobileClose"><b>Move To...</b><button class="btnClose" onclick="closeMobilOptions(event,${
              task.cardId
            })"><b>X</b></button></p>
            <a id="moveTo_${task.cardId}_toDo" onclick="mobilemoveTo('toDo',${
    task.cardId
  },event)">To&nbsp;Do</a>
            <a id="moveTo_${
              task.cardId
            }_inProgress" onclick="mobilemoveTo('inProgress',${
    task.cardId
  },event)">In&nbsp;Progress</a>
            <a id="moveTo_${
              task.cardId
            }_awaitFeedback" onclick="mobilemoveTo('awaitFeedback',${
    task.cardId
  },event)">Await&nbsp;Feedback</a>
            <a id="moveTo_${task.cardId}_done" onclick="mobilemoveTo('done',${
    task.cardId
  },event)">Done</a>
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
        <div class="small-usersemblem" id="smallUsersEmblem${
          task.cardId
        }"></div>
        <div class="priority" id="priority${task.cardId}">
            <img src="../assets/icons/${task.priority}.svg" alt="">
        </div>
      </div>
    </div> 
  `;
}

/**
 * Returns the background color category based on the given task's category.
 *
 * @param {Object} task - The task object containing the category.
 * @return {string} The background color category as a hexadecimal color code.
 */
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

/**
 * Displays the small users emblem on the task card.
 *
 * @param {Object} task - The task object containing the cardId and user count.
 * @return {void} This function does not return a value.
 */
function showSmallUsersEmblem(task) {
  let smallUsersEmblem = document.getElementById(
    `smallUsersEmblem${task.cardId}`
  );
  smallUsersEmblem.innerHTML = '';

  let { renderedCount, extraCount } = renderUserEmblems(task, smallUsersEmblem);

  if (extraCount > 0) {
    smallUsersEmblem.innerHTML += renderGreyEmblem(extraCount);
  }
}

/**
 * Renders user emblems in a container based on the provided task.
 *
 * @param {Object} task - The task object containing the userIds of the users.
 * @param {HTMLElement} container - The container element where the emblems will be rendered.
 * @return {Object} An object containing the renderedCount and extraCount.
 */
function renderUserEmblems(task, container) {
  let renderedCount = 0;
  let extraCount = 0;

  if (task.userId && task.userId.length > 0) {
    for (let userId of task.userId) {
      if (userId == 0) continue;

      let user = findUserById(userId);
      if (user) {
        if (renderedCount < 5) {
          container.innerHTML += renderSmallUsersEmblem(user);
          renderedCount++;
        } else {
          extraCount++;
        }
      }
    }
  }
  return { renderedCount, extraCount };
}

/**
 * Finds a user by their ID in the list of users.
 *
 * @param {number} userId - The ID of the user to find.
 * @return {Object | undefined} The user object if found, otherwise undefined.
 */
function findUserById(userId) {
  return users.find((u) => u.userId == userId);
}

/**
 * Renders a grey emblem HTML element with the given extra count.
 *
 * @param {number} extraCount - The count to display in the emblem.
 * @return {string} The HTML string representing the grey emblem.
 */
function renderGreyEmblem(extraCount) {
  return `<div class="grey-emblem">+${extraCount}</div>`;
}

/**
 * Renders a grey emblem with the remaining count.
 *
 * @param {number} remainingCount - the count of remaining items
 * @return {string} the HTML for the grey emblem
 */
function renderGreyEmblem(remainingCount) {
  return `<div class="grey-emblem">+${remainingCount}</div>`;
}

/**
 * Renders a small user emblem HTML element with the given user object.
 *
 * @param {Object} user - The user object containing the user's color and emblem.
 * @return {string} The HTML string representing the small user emblem.
 */
function renderSmallUsersEmblem(user) {
  return /*html*/ `
      <div class="small-useremblem" style="background-color: ${user.color}" id="${user.userId}">
      ${user.emblem}
    </div>  `;
}

/**
 * Renders small subtasks HTML elements for a given task.
 *
 * @param {Object} task - The task object containing subtasks.
 * @return {void} This function does not return anything.
 */
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

/**
 * Sets the `currentDraggedElement` to the provided `cardId` when dragging starts.
 *
 * @param {string} cardId - The ID of the card being dragged.
 * @return {void} This function does not return anything.
 */
function startDragging(cardId) {
  currentDraggedElement = cardId;
}

/**
 * Prevents the default behavior of the event, allowing elements to be dragged and dropped.
 *
 * @param {DragEvent} event - The event object representing the drag and drop action.
 * @return {void} This function does not return anything.
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Moves a task to a specified status by updating the task object and calling the updateBoard and updateHTML functions.
 *
 * @param {DragEvent} event - The event object representing the drag and drop action.
 * @param {string} status - The status to which the task should be moved.
 * @return {Promise<void>} A promise that resolves when the task has been successfully moved and the HTML has been updated.
 */
async function moveTo(event, status) {
  event.stopPropagation();
  // Find the task object with the cardId equal to currentDraggedElement
  const task = tasks.find((t) => t.cardId == currentDraggedElement);
  task.status = status;
  removeHighlight(status);
  await updateBoard(status); // Assuming updateBoard is an async function
  await updateHTML();
}

/**
 * Updates the board by updating the status of a task in the tasks JSON data.
 *
 * @param {string} status - The new status to update the task to.
 * @return {Promise<void>} A promise that resolves when the task has been successfully updated.
 */
async function updateBoard(status) {
  let tasksJSON = await loadData('tasks');
  for (let key in tasksJSON) {
    let task = tasksJSON[key];
    if (task.cardId == currentDraggedElement) {
      await putData(`tasks/${key}/status`, status);
    }
  }
}

/**
 * Highlights an element with the specified cardId by adding the 'drag-area-highlight' class to its classList.
 *
 * @param {string} cardId - The id of the element to highlight.
 * @return {void} This function does not return anything.
 */
function highlight(cardId) {
  document.getElementById(cardId).classList.add('drag-area-highlight');
}

/**
 * Removes the 'drag-area-highlight' class from the element with the specified status.
 *
 * @param {string} status - The id of the element to remove the highlight from.
 * @return {void} This function does not return anything.
 */
function removeHighlight(status) {
  document.getElementById(status).classList.remove('drag-area-highlight');
}

/**
 * Closes the big card by performing the close animation and adding the 'dnone' class to the 'showBigCard' element.
 *
 * @return {void} This function does not return anything.
 */
function closeBigCard() {
  closeBigCardAnimation(`bigCard`);
  document.getElementById('showBigCard').classList.add('dnone');
}

/**
 * Asynchronously shows a big card on the page.
 *
 * @param {string} cardId - The ID of the card to show.
 * @return {Promise<void>} A promise that resolves when the big card is shown.
 */
async function showBigCard(cardId) {
  document.getElementById('showBigCard').classList.remove('dnone');
  let content = document.getElementById('showBigCard');
  content.innerHTML = '';
  content.innerHTML = renderBigCardHTML(cardId);
  showBigUsersEmblem(cardId);
  renderBigSubtasks(cardId);
  openBigCardAnimation(`bigCard${cardId}`);
}

/**
 * Renders the HTML for a big card based on the provided card ID.
 *
 * @param {string} cardId - The ID of the card to render.
 * @return {string} The HTML string representing the big card.
 */
function renderBigCardHTML(cardId) {
  let task = tasks.find((t) => t.cardId == cardId);
  return /*html*/ `
    <div id="bigCard${task.cardId}" class="bigcard"  onclick="dontClose()">
      <div class="big-header">
        <div><span class="big-task-category" style='background-color:${getBackgroundCategory(
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
      <div class="bigcard-edit">
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

/**
 * Asynchronously displays the user emblems for the given card ID in the 'bigUsersEmblem' element.
 *
 * @param {string} cardId - The ID of the card to display emblems for.
 * @return {Promise<void>} A promise that resolves when the function completes.
 */
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

/**
 * Renders the user's emblem with styling and user information.
 *
 * @param {Object} user - The user object containing user information.
 * @return {string} The HTML content displaying the user's emblem and name.
 */
function renderBigEmblemUsers(user) {
  return /*html*/ `
  <div class="big-single-user">
      <div class="big-useremblem" style="background-color: ${user.color}" id="${user.userId}">
        ${user.emblem}
      </div>  
      <span>${user.name}</span>
    </div>`;
}

/**
 * Renders the big subtasks for a given card ID.
 *
 * @param {string} cardId - The ID of the card.
 * @return {Promise<void>} - A promise that resolves when the big subtasks have been rendered.
 */
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

/**
 * Renders the HTML for a big subtask.
 *
 * @param {string} cardId - The ID of the card.
 * @param {Object} subtask - The subtask object.
 * @param {number} j - The index of the subtask.
 * @return {string} The HTML for the big subtask.
 */
function renderBigSubtasksHTML(cardId, subtask, j) {
  return /*html*/ `
      <label for="checkbox${j}">
          <li class="big-subtasklist">
              <input class="big-card-checkbox" onclick="checkedSubtask(${cardId}, ${j})" type="checkbox"  ${
    subtask.checked ? 'checked' : ''
  } id="checkbox${j}" data-userid="${j}">
              <div class="contactname">${subtask.subtaskText}</div>
          </li>
      </label>`;
}

/**
 * Prevents the default event propagation.
 *
 * @return {void} This function does not return a value.
 */
function dontClose() {
  event.stopPropagation();
}

/**
 * Deletes a task from the board by calling the deleteTask function with the given cardId.
 * Then, it updates the HTML by calling the updateHTML function.
 * Finally, it closes the big card by calling the closeBigCard function.
 *
 * @param {string} cardId - The ID of the card to be deleted.
 * @return {Promise<void>} A promise that resolves when the task is deleted and the HTML is updated.
 */
async function deleteTaskOfBoard(cardId) {
  await deleteTask(cardId);
  await updateHTML();
  closeBigCard();
}

/**
 * Deletes a task associated with a given card ID.
 *
 * @param {string} cardId - The ID of the card associated with the task.
 * @return {Promise<void>} A promise that resolves when the task is deleted.
 */
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

/**
 * Searches for tasks based on a search query and updates the HTML accordingly.
 *
 * @return {void} This function does not return a value.
 */
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

/**
 * Retrieves the search query input value from the 'search' element and converts it to lowercase.
 *
 * @return {string} The lowercase search query input value.
 */
function getSearchQuery() {
  return document.getElementById('search').value.toLowerCase();
}

/**
 * Checks if the search query is too short.
 *
 * @param {string} searchQuery - The search query to be checked.
 * @return {boolean} Returns true if the search query is shorter than 2 characters, false otherwise.
 */
function isSearchQueryTooShort(searchQuery) {
  return searchQuery.length < 2; // angepasst auf 3 Zeichen
}

/**
 * Filters tasks based on the search query by checking if the task title or description includes the search query.
 *
 * @param {string} searchQuery - The search query to filter tasks by.
 * @return {Array} An array of tasks that match the search query criteria.
 */
function filterTasks(searchQuery) {
  return tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery)
    );
  });
}

/**
 * Clears the content of the task containers by setting their innerHTML to an empty string.
 *
 * @return {void} This function does not return a value.
 */
function clearTaskContainers() {
  document.getElementById('toDo').innerHTML = '';
  document.getElementById('inProgress').innerHTML = '';
  document.getElementById('awaitFeedback').innerHTML = '';
  document.getElementById('done').innerHTML = '';
}

/**
 * Renders the filtered tasks onto the HTML page.
 *
 * @param {Array} filteredTasks - The array of tasks to render.
 * @return {void} This function does not return a value.
 */
function renderFilteredTasks(filteredTasks) {
  filteredTasks.forEach((task) => {
    let elementId = getElementIdByStatus(task.status);
    document.getElementById(elementId).innerHTML += renderSmallCardHTML(task);
    showSmallUsersEmblem(task);
    renderSmallSubtasks(task);
    renderProgressBar(task.cardId, tasks);
  });
}

/**
 * Returns the element ID corresponding to the given status.
 *
 * @param {string} status - The status to get the element ID for.
 * @return {string} The element ID corresponding to the status, or an empty string if the status is not recognized.
 */
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

/**
 * Retrieves the selected user IDs from checkboxes in the '.contactlist' element.
 *
 * @return {Array} An array of user IDs that are selected.
 */
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

/**
 * Updates the status of a subtask and refreshes the HTML display.
 *
 * @param {string} cardId - The ID of the card containing the subtask.
 * @param {string} isubtask - The ID of the subtask to update.
 * @return {Promise<void>} A promise that resolves when the subtask status is updated and the HTML display is refreshed.
 */
async function checkedSubtask(cardId, isubtask) {
  let value = document.getElementById('checkbox' + isubtask).checked;
  await updateSubtasks(cardId, isubtask, value);
  await updateHTML();
}

/**
 * Updates the status of a subtask in the tasks JSON data and refreshes the HTML display.
 *
 * @param {string} cardId - The ID of the card containing the subtask.
 * @param {string} isubtask - The ID of the subtask to update.
 * @param {boolean} value - The new value for the subtask's checked status.
 * @return {Promise<void>} A promise that resolves when the subtask status is updated and the HTML display is refreshed.
 */
async function updateSubtasks(cardId, isubtask, value) {
  let tasksJSON = await loadData('tasks');
  for (let key in tasksJSON) {
    let task = tasksJSON[key];
    if (task.cardId == cardId) {
      await putData(`tasks/${key}/subtask/${isubtask}/checked`, value);
    }
  }
}

/**
 * Renders a progress bar for a given card ID and tasks.
 *
 * @param {string} cardId - The ID of the card to render the progress bar for.
 * @param {Array} tasks - The array of tasks to search for the task with the given card ID.
 * @return {void} This function does not return anything.
 */
function renderProgressBar(cardId, tasks) {
  const task = tasks.find((t) => t.cardId == cardId);
  let subtasks = task.subtask;
  updateProgressBarDisplay(cardId, subtasks);
}

/**
 * Updates the progress bar display and subtasks count display for a given card ID and subtasks.
 *
 * @param {string} cardId - The ID of the card to update the display for.
 * @param {Array} subtasks - The array of subtasks for the card.
 * @return {void} This function does not return anything.
 */
function updateProgressBarDisplay(cardId, subtasks) {
  if (subtasks != null && subtasks.length > 0) {
    let checkedSubtasks = countCheckedSubtasks(subtasks);
    let percent = calculateProgress(checkedSubtasks, subtasks.length);
    updateProgressBar(cardId, percent);
    updateSubtasksCountDisplay(cardId, checkedSubtasks, subtasks.length);
  } else {
    let colorProgressBar = document.getElementById(
      `subtaskProgressBar${cardId}`
    );
    colorProgressBar.style.display = 'none';
  }
}

/**
 * Counts the number of checked subtasks in an array of subtasks.
 *
 * @param {Array} subtasks - The array of subtasks to count checked subtasks from.
 * @return {number} The number of checked subtasks.
 */
function countCheckedSubtasks(subtasks) {
  let checkedSubtasks = 0;
  for (let i = 0; i < subtasks.length; i++) {
    if (subtasks[i].checked === true) {
      checkedSubtasks += 1;
    }
  }
  return checkedSubtasks;
}

/**
 * Calculates the progress of a task based on the number of checked subtasks and the total number of subtasks.
 *
 * @param {number} checkedSubtasks - The number of checked subtasks.
 * @param {number} totalSubtasks - The total number of subtasks.
 * @return {number} The progress of the task as a percentage, rounded to the nearest whole number.
 */
function calculateProgress(checkedSubtasks, totalSubtasks) {
  if (totalSubtasks === 0) return 0;
  let percent = checkedSubtasks / totalSubtasks;
  return Math.round(percent * 100).toFixed(0);
}

/**
 * Updates the progress bar with the given card ID and percentage.
 *
 * @param {number} cardId - The ID of the card associated with the progress bar.
 * @param {number} percent - The percentage value to set for the progress bar.
 * @return {void} This function does not return anything.
 */
function updateProgressBar(cardId, percent) {
  let colorProgressBar = document.getElementById(`subtaskProgressBar${cardId}`);
  colorProgressBar.value = percent;
}

/**
 * Updates the subtasks count display for a specific card with the number of checked subtasks and total subtasks.
 *
 * @param {number} cardId - The ID of the card associated with the subtasks count display.
 * @param {number} checkedSubtasks - The number of checked subtasks.
 * @param {number} totalSubtasks - The total number of subtasks.
 * @return {void} This function does not return anything.
 */
function updateSubtasksCountDisplay(cardId, checkedSubtasks, totalSubtasks) {
  let subtasksCount = document.getElementById(`subtasksCount${cardId}`);
  subtasksCount.innerHTML = `${checkedSubtasks}/${totalSubtasks} Subtasks`;
}

/**
 * A function that handles moving a card to a different status on a mobile device.
 *
 * @param {string} status - The status to move the card to.
 * @param {number} cardId - The ID of the card to be moved.
 * @param {Event} event - The event that triggered the move.
 * @return {void} This function does not return anything.
 */
async function mobilemoveTo(status, cardId, event) {
  event.stopPropagation();
  currentDraggedElement = cardId;
  moveTo(event, status);
}

/**
 * Opens the mobile options for a specific card.
 *
 * @param {number} cardId - The ID of the card.
 * @param {string} status - The status of the card.
 * @param {Event} event - The event object that triggered the function.
 * @return {void} This function does not return anything.
 */
function openMobileOptions(cardId, status, event) {
  event.stopPropagation();
  let link = document.getElementById('moveTo_' + cardId + '_' + status);
  link.classList.add('disabled');
  document.getElementById('amobile_boardOptions' + cardId).style.display =
    'flex';
}

/**
 * Closes the mobile options for a specific card.
 *
 * @param {Event} event - The event object that triggered the function.
 * @param {number} cardId - The ID of the card for which options are being closed.
 * @return {void} This function does not return a value.
 */
function closeMobilOptions(event, cardId) {
  event.stopPropagation();
  document.getElementById('amobile_boardOptions' + cardId).style.display =
    'none';
}

let mobilWindow = window.matchMedia('(max-width: 770px)');
mobilWindow.addEventListener('change', myFunc);

/**
 * Updates the display style of elements with the class 'mobileBoard' based on the current media query match.
 *
 * @return {void} This function does not return a value.
 */
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

/**
 * Updates the display style of elements with the class 'mobileBoard' based on the current window width.
 *
 * @return {void} This function does not return a value.
 */
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

/**
 * Opens a big card animation based on the provided card ID.
 *
 * @param {string} cardId - The ID of the card to animate.
 */
function openBigCardAnimation(cardId) {
  let bigCard = document.getElementById(cardId);
  if (bigCard) {
    bigCard.classList.add('move-left');
  }
}

/**
 * Closes the big card animation by removing the 'move-left' class from the element with the provided card ID.
 *
 * @param {string} cardId - The ID of the card to close the animation for.
 * @return {void} This function does not return anything.
 */
function closeBigCardAnimation(cardId) {
  let bigCard = document.getElementById(cardId);
  if (bigCard) {
    bigCard.classList.remove('move-left');
  }
}
