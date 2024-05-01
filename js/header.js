function showMenu() {
  document.getElementById('dropdownContent').classList.toggle('show');
}

window.onclick = function (event) {
  if (!event.target.matches('.useremblem')) {
    var dropdowns = document.getElementsByClassName('dropdownContent');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
