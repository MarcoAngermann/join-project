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
    </div>  `
}

function showAssigneesEmblem() {
  let assignesEmblem = document.getElementById('assignesEmblem');
  assignesEmblem.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    contact = contacts[i];
    let checkedContact = document.getElementById(`checkbox${i}`);
    if (checkedContact.checked == true) {
      renderEmblemAssignees(contact['emblem'], contact['color']);
    }
  }
  document.getElementById('assignees').classList.toggle('close');
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