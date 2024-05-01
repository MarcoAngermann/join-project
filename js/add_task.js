function changePriority(priority) {
    var buttons = document.getElementsByClassName('prioBtn');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent.trim().toLowerCase() === priority.toLowerCase()) {
            buttons[i].classList.add('selected');
        } else {
            buttons[i].classList.remove('selected');
        }
    }
}