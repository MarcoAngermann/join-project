function init() {
  restrictPastDate();
  includeHTML();
  renderAssignees();
  renderCategorys();
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



/*  let = checkedPrio;

 let createTask = [
  {
  "title": title.value,
   "description": description.value,
   "assignees": [],
   "date": date.value,
  "priority": checkedPrio,
   "category": category.value,
   "subtask": [],
 }
 ]; */

function renderAssignees() {
  let assignee = document.getElementById('assignees');
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    assignee.innerHTML += /*html*/ `
    <label for="checkbox${i}">
        <li class="contactList">        
            <div tabindex="0" class="emblem" style="background-color: ${contact['color']}">
              ${contact['emblem']}
            </div> 
            <div class="contactName" >${contact['name']}</div> 
            <input type="checkbox" id="checkbox${i}">          
        </li>
        </label>
      `;
  }
}

function toggleAssignees() {
  let assigneesList = document.getElementById('assignees');
  assigneesList.classList.toggle('show');
}

function renderCategorys() {
  let task = document.getElementById('tasks');

  for (let i = 0; i < categorys.length; i++) {
    task.innerHTML += /*html*/ `
            <li class="contactList">
                <span for="">
                    <div tabindex="0" onclick="selectCategory(${i})">
                      ${categorys[i]}
                    </div>
                </span>
            </li>
           `;
  }
}

function toggleCategorys() {
  let taskList = document.getElementById('tasks');
  taskList.classList.toggle('show');
}

function selectCategory(index) {
  let selectedCategory = categorys[index];
  document.getElementById('selectedCategory').innerText = selectedCategory;
  toggleCategorys(); // Hide the category list after selection
}

function restrictPastDate() {
  let dateInput = document.getElementById('date');
  let today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

//Mónica New Funktion

function renderEmblemAssignees(emblem, color) {
  let assignesEmblem = document.getElementById('assignesEmblem');
  assignesEmblem.innerHTML += `
    <div class="emblem" style="background-color: ${contact['color']}" id="${contact['id']}">
      ${contact['emblem']}
    </div>  `;
}

function showAssigneesEmblem() {
  let assignesEmblem = document.getElementById('assignesEmblem');
  assignesEmblem.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    contact = contacts[i];
    let checkedContact = document.getElementById(`checkbox${i}`);
    if (checkedContact.checked == true) {
      renderEmblemAssignees(contact['emblem'], contact['color']);
    }
  }
  document.getElementById('assignees').classList.toggle('close');
}

function changeButtonsSubtask() {
  document.getElementById('subtask-right-regular').classList.add('dnone');
  document.getElementById('subtask-right-add').classList.remove('dnone');
}

function removeSubtask() {
  subtask = document.getElementById('subtaskInput');
  subtask.value = '';
  document.getElementById('subtask-right-regular').classList.remove('dnone');
  document.getElementById('subtask-right-add').classList.add('dnone');
}

function addSubtask() {
  let input = document.getElementById('subtaskInput').value;
  subtaskList.push(input);
  renderSubtask();
  document.getElementById('subtaskInput').value = '';
  removeSubtask();
}

function deleteSubtask(i) {
  subtaskList.splice(i, 1);
  renderSubtask();
}

function renderSubtask() {
  let subtask = document.getElementById('subtask');
  subtask.innerHTML = '';
  for (let i = 0; i < subtaskList.length; i++) {
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

function changeButtonsSubtask() {
  document.getElementById('subtask-right-regular').classList.add('dnone');
  document.getElementById('subtask-right-add').classList.remove('dnone');
}

function removeSubtask() {
  subtask = document.getElementById('subtaskInput');
  subtask.value = '';
  document.getElementById('subtask-right-regular').classList.remove('dnone');
  document.getElementById('subtask-right-add').classList.add('dnone');
}

function addSubtask() {
  let input = document.getElementById('subtaskInput').value;
  subtaskList.push(input);
  renderSubtask();
  document.getElementById('subtaskInput').value = '';
  removeSubtask();
}

function deleteSubtask(i) {
  subtaskList.splice(i, 1);
  renderSubtask();
}

function checkSubtask(i) {
  editSubtaskInput = document.getElementById(`editSubtaskInput${i}`).value;
  subtaskList[i] = editSubtaskInput;
  renderSubtask();
}

function renderSubtask() {
  let subtask = document.getElementById('subtask');
  subtask.innerHTML = '';
  for (let i = 0; i < subtaskList.length; i++) {
    subtask.innerHTML += /*html*/ `
            <div id="subtaskList${i}" class="subtaskList">
                ${subtaskList[i]}
                <div class="edit-images">
                  <img class="btnEdit-svg" onclick="editSubtask(${i})" id="editSubtask${i}" src="../assets/icons/edit_contacts_icon.svg" alt="">
                  <div class="edit-seperator"></div>
                  <img class="btnEdit-svg" onclick="deleteSubtask(${i})" id="deleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
                </div>
            </div>
    `;
  }
}

function editSubtask(i) {
  let subtask = document.getElementById(`subtaskList${i}`);
  subtask.innerHTML = /*html*/ `
            <div class="editSubtaskInput">
              <input
              type="text"
              id="editSubtaskInput${i}"
              value="${subtaskList[i]}"
              />
                  <div class="edit-images">
                    <img class="btnEdit-svg" onclick="deleteSubtask(${i})" id="deleteSubtask${i}" src="../assets/icons/delete_contact_icon.svg" alt="">
                    <div class="edit-seperator"></div>
                    <img class="btnEdit-svg" onclick="checkSubtask(${i})" id="checkSubtask${i}" src="../assets/icons/check.svg" alt="">
                  </div>
            </div> `;
}

function getSelectedPrio() {
  let urgentBtn = document.getElementById('urgentPrio');
  let lowprioBtn = document.getElementById('lowPrio');
  if (urgentBtn.classList.contains('selected')) {
    return "urgent";
  }
  else if (lowprioBtn.classList.contains('selected')) {
    return "low";
  }
  else {
    return "medium";
  }
}

function getAssigneedContact(){
  let assignesEmblem = document.getElementById('assignesEmblem');  
  let divs = assignesEmblem.getElementsByTagName('div');
  let idsList= [];
  for ( let i=0; i<divs.length; i++){
    idsList.push(divs[i].id);
  }
  return idsList;
}

function createNewTask(event){
  event.preventDefault();
  let task = tasks[0];
  task={
    title : document.getElementById('title').value,
    description: document.getElementById('description').value,
    assigneeIds : getAssigneedContact(),
    date: document.getElementById('date').value,
    priority : getSelectedPrio(),
    category: document.getElementById('selectedCategory').value,
    subtask: "",
    status:"To do"
  }
  tasks.push(task);  
}


