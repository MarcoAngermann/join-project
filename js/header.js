function showMenu() {
  document.getElementById('dropdownContent').classList.toggle('show');
}

window.onclick = function (event) {
  if (!event.target.matches('.useremblem')) {
    let dropdowns = document.getElementsByClassName('dropdownContent');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

