/**
 * Initializes the add task functionality by performing the following steps:
 * 1. Restricts the date selection to future dates.
 * 2. Includes HTML content.
 * 3. Retrieves the list of users asynchronously.
 * 4. Retrieves the list of tasks asynchronously.
 * 5. Renders the list of users.
 * 6. Renders the list of categories.
 *
 * @return {Promise<void>} A promise that resolves when all the initialization steps are completed.
 */
async function initAdd() {
  restrictPastDate();
  includeHTML();
  await usersArray();
  await tasksArray();
  renderUsers();
  renderCategorys();
}

let subtaskList = [];

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

/**
 * Sets the styles for a selected element based on the provided background color, text color, and SVG color.
 *
 * @param {HTMLElement} selectedElement - The element to set the styles for.
 * @param {string} backgroundColor - The background color to set for the element.
 * @param {string} textColor - The text color to set for the element.
 * @param {string} svgColor - The SVG color to set for the element's SVG paths.
 */
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

/**
 * Toggles the priority of the elements with the class 'prio-button' based on the provided priority.
 *
 * @param {string} priority - The priority to toggle. Must be one of 'urgent', 'medium', or 'low'.
 * @return {void} This function does not return a value.
 */
function togglePriority(priority) {
  let elements = document.getElementsByClassName('prio-button');
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

/**
 * Sets the original color of the SVG paths in each 'prio-button' element to their current fill color.
 *
 * @return {void} This function does not return anything.
 */
window.onload = function () {
  let elements = document.getElementsByClassName('prio-button');
  for (let i = 0; i < elements.length; i++) {
    let svgPaths = elements[i].querySelectorAll('svg path');
    if (svgPaths) {
      for (let j = 0; j < svgPaths.length; j++) {
        svgPaths[j].setAttribute('originalColor', svgPaths[j].style.fill);
      }
    }
  }
};

/**
 * Renders users based on the users array.
 *
 * @return {void} This function does not return a value.
 */
function renderUsers() {
  let user = document.getElementById('users');

  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == 0) continue;
    const contact = users[i];
    user.innerHTML += renderUsersHTML(contact, i);
  }
}

/**
 * Renders users based on the users array.
 *
 * @return {void} This function does not return a value.
 */
function renderUsersHTML(contact, i) {
  return /*html*/ `
      <label for="checkbox${i}">
          <li class="contact-list" id="contactList${i}">        
              <div tabindex="0" class="emblem" style="background-color: ${contact.color}">
                ${contact.emblem}
              </div> 
              <div class="contact-name" >${contact.name}</div> 
              <input class="user-checkbox" onclick="showUsersEmblem()" type="checkbox" id="checkbox${i}" data-userid="${contact.userId}">          
          </li>
      </label> `;
}

/**
 * Renders the categorys HTML elements on the page.
 *
 * @return {void} This function does not return a value.
 */
function renderCategorys() {
  let task = document.getElementById('tasks');

  for (let i = 0; i < categorys.length; i++) {
    task.innerHTML += renderCategorysHTML(i);
  }
}

/**
 * Renders the category HTML elements based on the index.
 *
 * @param {number} i - The index of the category to render
 * @return {string} The HTML string representing the category element
 */
function renderCategorysHTML(i) {
  return /*html*/ `
          <li class="contact-list">
                <span for="">
                    <div class="category-list" tabindex="0" onclick="selectCategory(event, ${i})">
                      ${categorys[i]}
                    </div>
                </span>
            </li>
        `;
}

/**
 * Toggles the visibility of the category list and the corresponding arrow icons.
 *
 * @return {void} This function does not return a value.
 */
function showCategories() {
  resetCategoryErrorMessage();
  if (document.getElementById('tasks').classList.contains('show')) {
    document.getElementById('tasks').classList.remove('show');
    document.getElementById('arrowDownCategory').style.display = 'block';
    document.getElementById('arrowUpCategory').style.display = 'none';
  } else {
    document.getElementById('tasks').classList.add('show');
    document.getElementById('arrowDownCategory').style.display = 'none';
    document.getElementById('arrowUpCategory').style.display = 'block';
  }
}

/**
 * Selects a category from the list and updates the selected category element.
 *
 * @param {Event} event - The event object that triggered the function.
 * @param {number} index - The index of the category to be selected.
 * @return {void} This function does not return a value.
 */
function selectCategory(event, index) {
  event.stopPropagation();
  let selectedCategory = categorys[index];
  document.getElementById('selectedCategory').innerHTML = selectedCategory;
  showCategories();
}

/**
 * Resets the error message content in the category error element.
 *
 * @return {void} This function does not return a value.
 */
function resetCategoryErrorMessage() {
  document.getElementById('categoryErrorMessage').innerHTML = '';
}

/**
 * Restricts the date input field to allow only future dates.
 *
 * @return {void} This function does not return a value.
 */
function restrictPastDate() {
  let dateInput = document.getElementById('date');
  let today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

/**
 * Renders users' emblems based on certain conditions.
 *
 * This function retrieves the 'usersEmblem' element from the DOM and clears its content.
 * It then iterates over the 'users' array, skipping any users with a 'userId' of 0.
 * For each user, it checks if the corresponding checkbox is checked. If it is, it adds the 'contact-list-selected' class to the corresponding 'contactList' element,
 * and either renders the user's emblem or increments the 'extraCount' if there are already 5 emblems rendered.
 * If the checkbox is not checked, it removes the 'contact-list-selected' class.
 * After iterating over all users, if there are any extra emblems to render, it renders them with the 'renderGreyEmblem' function.
 */
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
      contactListChecked.classList.add('contact-list-selected');
      if (renderedCount < 5) {
        usersEmblem.innerHTML += renderEmblemUsers(contact);
        renderedCount++;
      } else {
        extraCount++;
      }
    } else {
      contactListChecked.classList.remove('contact-list-selected');
    }
  }
  if (extraCount > 0) {
    usersEmblem.innerHTML += renderGreyEmblem(extraCount);
  }
}

/**
 * Renders a grey emblem HTML element with the given extra count.
 *
 * @param {number} extraCount - The count to be displayed in the emblem.
 * @return {string} The HTML string representing the grey emblem.
 */
function renderGreyEmblem(extraCount) {
  return `<div class="grey-emblem">+${extraCount}</div>`;
}

/**
 * Renders a grey emblem HTML element with the given remaining count.
 *
 * @param {number} remainingCount - The count to be displayed in the emblem.
 * @return {string} The HTML string representing the grey emblem.
 */
function renderGreyEmblem(remainingCount) {
  return `<div class="grey-emblem">+${remainingCount}</div>`;
}

/**
 * Renders an emblem HTML element with the given contact information.
 *
 * @param {Object} contact - The contact information for the emblem.
 * @param {string} contact.color - The background color of the emblem.
 * @param {string} contact.userId - The ID of the user associated with the emblem.
 * @param {string} contact.emblem - The emblem icon to be displayed.
 * @return {string} The HTML string representing the emblem.
 */
function renderEmblemUsers(contact) {
  return /*html*/ `
      <div class="emblem" style="background-color: ${contact.color}" id="${contact.userId}">
      ${contact.emblem}
    </div>  `;
}

/**
 * Toggles the visibility of the user list and the corresponding arrow icons.
 *
 * @return {void} This function does not return a value.
 */
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

/**
 * Changes the visibility and styling of the subtask buttons and input field based on the length of the subtaskList array.
 *
 * @return {void} This function does not return a value.
 */
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

/**
 * Removes a subtask by clearing the input value and toggling visibility of subtask buttons.
 *
 * @return {void} This function does not return a value.
 */
function removeSubtask() {
  subtask = document.getElementById('subtaskInput');
  subtask.value = '';
  document.getElementById('subtask-right-regular').classList.remove('dnone');
  document.getElementById('subtask-right-add').classList.add('dnone');
}

/**
 * Removes icons by toggling visibility of subtask buttons.
 *
 * @return {void} This function does not return a value.
 */
function removeIcons() {
  document.getElementById('subtask-right-regular').classList.remove('dnone');
  document.getElementById('subtask-right-add').classList.add('dnone');
}

/**
 * Adds a new subtask to the list if there are fewer than 5 subtasks already.
 * If there are already 5 subtasks, displays an error message.
 *
 * @return {void} This function does not return a value.
 */
function addSubtask() {
  let input = document.getElementById('subtaskInput').value;
  if (input == '') {
    document.getElementById('subtaskInput').placeholder =
      'Bitte etwas eingeben!';
    return;
  }
  if (subtaskList.length < 5) {
    document.getElementById('subtaskInput').placeholder = 'Add new Subtask';
    let newTask = { subtaskText: input, checked: false };
    subtaskList.push(newTask);
    renderSubtask();
    document.getElementById('subtaskInput').value = '';
    removeSubtask();
  }
}

/**
 * Deletes a subtask from the subtaskList array and updates the UI accordingly.
 *
 * @param {number} i - The index of the subtask to be deleted.
 * @return {void} This function does not return a value.
 */
function deleteSubtask(i) {
  subtaskList.splice(i, 1);
  renderSubtask();
  document.getElementById('subtaskInput').value = '';
  document.getElementById('subtaskInput').readOnly = false;
  document.getElementById('subtaskInput').style = 'color:black;';
  document.getElementById('subtaskContainer').style.border =
    '1px solid #d1d1d1';
}

/**
 * Renders the subtask list by updating the HTML content of the 'subtask' element.
 *
 * @return {void} This function does not return a value.
 */
function renderSubtask() {
  let subtask = document.getElementById('subtask');
  subtask.innerHTML = '';
  for (let i = 0; i < Math.min(subtaskList.length, 5); i++) {
    subtask.innerHTML += renderSubtaskHTML(i);
  }
}

/**
 * Renders the HTML for a subtask list item.
 *
 * @param {number} i - The index of the subtask in the list.
 * @return {string} The HTML string representing the subtask list item.
 */
function renderSubtaskHTML(i) {
  return /*html*/ `
    <div class="subtask-list" id="mainSubtask-container${i}">
            <input
              readonly
              type="text"
              id="subtaskList${i}"
              value="${subtaskList[i].subtaskText}"
              />
              <div class="edit-images" id="edit-images${i}">
                <img onclick="editSubtask(${i})" id="editSubtask${i}" src="../assets/icons/edit_contacts_icon.svg" alt="">
                <div class="edit-seperator"></div>
                <img onclick="deleteSubtask(${i})" id="deleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
              </div>
            </div>
        </div>`;
}

/**
 * Edits the subtask at the specified index.
 *
 * @param {number} i - The index of the subtask to edit.
 * @return {void} This function does not return anything.
 */
function editSubtask(i) {
  document.getElementById(`subtaskList${i}`).readOnly = false;
  edit = document.getElementById(`edit-images${i}`);
  edit.innerHTML = editSubtaskHTML(i);
  document
    .getElementById(`mainSubtask-container${i}`)
    .classList.remove('subtask-list');
  document
    .getElementById(`mainSubtask-container${i}`)
    .classList.add('edit-subtask-list');
  document.getElementById(`edit-images${i}`).classList.add('flex');
}

/**
 * Updates the subtask text in the subtaskList array and triggers the rendering of subtasks.
 *
 * @param {number} i - The index of the subtask to update.
 * @return {void} This function does not return a value.
 */
function checkSubtask(i) {
  subtaskList[i].subtaskText = document.getElementById(`subtaskList${i}`).value;
  renderSubtask();
}

/**
 * Returns an HTML string for an edit subtask element with a delete and check button.
 *
 * @param {number} i - The index of the subtask.
 * @return {string} The HTML string for the edit subtask element.
 */
function editSubtaskHTML(i) {
  return /*html*/ `
    <img onclick="deleteSubtask(${i})" id="deleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
    <div class="edit-seperator"></div>
    <img  onclick="checkSubtask(${i})" id="checkSubtask${i}" src="../assets/icons/check.svg" alt="">
  `;
}

/**
 * Returns an HTML string for an edit subtask element with delete and edit buttons.
 *
 * @param {number} i - The index of the subtask.
 * @return {string} The HTML string for the edit subtask element.
 */
function checkSubtaskHTML(i) {
  return /*html*/ `
    <img onclick="editSubtask(${i})" id="editSubtask${i}" src="../assets/icons/edit_contacts_icon.svg" alt="">
    <div class="edit-seperator"></div>
    <img onclick="deleteSubtask(${i})" id="deleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
  `;
}

/**
 * Function to determine the selected priority based on the 'selected' class of buttons.
 *
 * @return {string} The selected priority ('urgent', 'low', or 'medium').
 */
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

/**
 * Returns an array of selected user IDs from the checkboxes in the '.contact-list' element.
 *
 * @return {Array<string>} An array of selected user IDs.
 */
function getSelectedUserIds() {
  let checkboxes = document.querySelectorAll(
    '.contact-list input[type="checkbox"]:checked'
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

/**
 * Creates a new task and adds it to the board.
 *
 * @param {Event} event - The event object that triggered the function.
 * @return {Promise<void>} - A promise that resolves when the task is created and added to the board.
 */
async function createNewTask(event) {
  event.preventDefault();
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
    status: 'toDo',
    cardId: lastCardId + 1,
  };
  taskAddedToBoard();
  setTimeout(async function () {
    resetUserDisplay();
    await postData('tasks', task);
    location.href = 'board.html';
    clearAllTasks(event);
  }, 3000);
}

/**
 * Resets the category error message by clearing the border style, hiding the error message,
 * resetting the color, and emptying the inner HTML of the category error message element.
 *
 * @return {void} This function does not return anything.
 */
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

/**
 * Clears all tasks by preventing the default behavior of the button, resetting form fields,
 * clearing checkboxes, showing user emblems, clearing date and priority, clearing selected category,
 * clearing subtasks, clearing subtask input, and resetting user display.
 *
 * @param {Event} event - The event object triggered by the button click.
 * @return {void} This function does not return anything.
 */
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

/**
 * Clears the title and description input fields.
 *
 * @return {void} This function does not return anything.
 */
function clearTitleAndDescription() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
}

/**
 * Clears the value of the 'date' input field and sets the priority to 'medium'.
 *
 * @return {void} This function does not return a value.
 */
function clearDateAndPriority() {
  document.getElementById('date').value = '';
  togglePriority('medium');
}

/**
 * Clears the selected category by setting the innerHTML of the element with
 * the id 'selectedCategory' to 'Select task category'.
 *
 * @return {void} This function does not return a value.
 */
function clearSelectedCategory() {
  document.getElementById('selectedCategory').innerHTML =
    'Select task category';
}

/**
 * Clears the subtask list by resetting the subtaskList array and the value of the 'subtaskInput' element.
 * Then, it calls the 'renderSubtask' function to update the UI.
 *
 * @return {void} This function does not return a value.
 */
function clearSubtasks() {
  subtaskList = [];
  document.getElementById('subtaskInput').value = '';
  renderSubtask();
}

/**
 * Clears the input field for subtasks by resetting its value, placeholder, read-only status, and text color.
 * Also resets the border style of the subtask container element.
 *
 * @return {void} This function does not return a value.
 */
function clearSubtaskInput() {
  let subtaskInput = document.getElementById('subtaskInput');
  subtaskInput.value = '';
  subtaskInput.placeholder = 'Add new Subtask';
  subtaskInput.readOnly = false;
  subtaskInput.style.color = 'black';
  document.getElementById('subtaskContainer').style.border =
    '1px solid #d1d1d1';
}

/**
 * Resets the display for the user section by hiding it and updating the arrow icons.
 *
 * @return {void} This function does not return a value.
 */
function resetUserDisplay() {
  let users = document.getElementById('users');
  users.classList.remove('show');
  document.getElementById('arrowDownUser').style.display = 'block';
  document.getElementById('arrowUpUser').style.display = 'none';
}

/**
 * Clears all checkboxes on the page by setting their 'checked' property to false.
 *
 * @return {void} This function does not return a value.
 */
function clearAllCheckbox() {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

/**
 * Displays a task added to the board by showing the taskAddedToBoard element
 * and adding the 'move-top' class to the taskAddedToBoardStyle element. After
 * 3 seconds, the taskAddedToBoard element is hidden.
 *
 * @return {void} This function does not return a value.
 */
function taskAddedToBoard() {
  let boardAddedToTask = document.getElementById('taskAddedToBoard');
  let boardAddedToTaskContainer = document.getElementById(
    'taskAddedToBoardStyle'
  );
  boardAddedToTask.style.display = 'flex';
  boardAddedToTaskContainer.classList.add('move-top');
  setTimeout(function () {
    document.getElementById('taskAddedToBoard').style.display = 'none';
  }, 3000);
}
