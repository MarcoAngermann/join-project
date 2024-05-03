<<<<<<< HEAD
/**
 * Toggles the visibility of the dropdown content in the header.
 *
 */
function headerDropdown() {
  document.getElementById('dropdownContent').classList.toggle('show');
}

/**
 * Closes the dropdown menu if the click event occurs outside of the user emblem.
 *
 * @param {Event} event - The click event object.
 */
window.onclick = function (event) {
  if (!event.target.matches('.useremblem')) {
    let dropdowns = document.getElementsByClassName('dropdownContent');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
=======
function showMenu() {
  document.getElementById('dropdownContent').classList.toggle('show');
}

window.onclick = function (event) {
  if (!event.target.matches('.useremblem')) {
    var dropdowns = document.getElementsByClassName('dropdownContent');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
>>>>>>> 419af5b5ce5b26fcc83ab4e770f1f2d4263be2ed
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
