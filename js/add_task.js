function togglePriority(priority) {
  let elements = document.getElementsByClassName('prioBtn');

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

  // Hintergrundfarbe, Textfarbe und SVG-Farbe basierend auf der ausgewählten Priorität festlegen
  let selectedElement = document.querySelector("[onclick*='" + priority + "']");
  if (selectedElement) {
    selectedElement.classList.add('selected');
    if (priority === 'urgent') {
      selectedElement.style.backgroundColor = '#FF3D00'; // Rot
      selectedElement.style.color = 'white'; // Weiße Textfarbe
      let svgPaths = selectedElement.querySelectorAll('svg path');
      if (svgPaths) {
        for (let j = 0; j < svgPaths.length; j++) {
          svgPaths[j].style.fill = 'white'; // Weiße SVG-Farbe
        }
      }
    } else if (priority === 'medium') {
      selectedElement.style.backgroundColor = '#FFA800'; // Orange
      selectedElement.style.color = 'white'; // Weiße Textfarbe
      let svgPaths = selectedElement.querySelectorAll('svg path');
      if (svgPaths) {
        for (let j = 0; j < svgPaths.length; j++) {
          svgPaths[j].style.fill = 'white'; // Weiße SVG-Farbe
        }
      }
    } else if (priority === 'low') {
      selectedElement.style.backgroundColor = '#7AE229'; // Grün
      selectedElement.style.color = 'white'; // Weiße Textfarbe
      let svgPaths = selectedElement.querySelectorAll('svg path');
      if (svgPaths) {
        for (let j = 0; j < svgPaths.length; j++) {
          svgPaths[j].style.fill = 'white'; // Weiße SVG-Farbe
        }
      }
    }
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
