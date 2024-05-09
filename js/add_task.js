function init() {
  restrictPastDate();
  includeHTML();
  renderAssignees();
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

// let = checkedPrio;

// let createTask = [
//   {
//   "title": title.value,
//   "description": description.value,
//   "assignees": [],
//   "date": date.value,
//   "priority": checkedPrio,
//   "category": category.value,
//   "subtask": [],
// }
// ];
function renderAssignees() {
  let assignee = document.getElementById('assignees');

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    assignee.innerHTML += /*html*/ `
      <li class="contactList">
        <label for="checkbox${i}">
          <div class="emblem" style="background-color: ${contact['color']}">
            ${contact['emblem']}
          </div> 
          <div class="contactName" >${contact['name']}</div> 
          <input type="checkbox" id="checkbox${i}">
        </label>
      </li>
     `;
  }
}

function toggleAssignees() {
  let assigneesList = document.getElementById('assignees');
  assigneesList.classList.toggle('show');
}

function restrictPastDate() {
  let dateInput = document.getElementById('date');
  let today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
