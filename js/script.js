let colors = [
  '#FF7A00',
  '#FF5EB3',
  '#6E52FF',
  '#9327FF',
  '#00BEE8',
  '#1FD7C1',
  '#FF745E',
  '#FFA35E',
  '#FC71FF',
  '#FFC701',
  '#0038FF',
  '#C3FF2B',
  '#FFE62B',
  '#FF4646',
  '#FFBB2B',
];

let categorys = ['Technical Task', 'User Story', 'Development', 'Editing'];
let users = [];
let tasks = [];

async function tasksArray() {
  let tasksJson = await loadData('tasks');
  console.log('Loaded tasks:', tasksJson); // Debugging line
  for (let key in tasksJson) {
    let task = tasksJson[key];
    tasks.push(task);
  }
  console.log('Tasks array:', tasks); // Debugging line
}

async function usersArray() {
  let usersJson = await loadData('users');
  console.log('Loaded users:', usersJson); // Debugging line
  for (let key in usersJson) {
    let user = usersJson[key];
    users.push(user);
  }
  console.log('Users array:', users); // Debugging line
}

async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute('w3-include-html');
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
    }
  }
  focusSidebar();
  getuseremblem();
}

function errorFunction() {
  console.log('Fehler aufgetreten');
}

/*function zum focus() in der Sidebar zu generieren*/
function focusSidebar() {
  let currentPage = window.location.href.split('/').pop();
  let menu = document.getElementById('menu');
  let links = menu.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    let linkHref = links[i].getAttribute('href');
    if (linkHref.replace('./', '') === currentPage.replace('?', '')) {
      links[i].focus();
      break; //Endet der Loop, wenn der href gefunde wird.
    }
  }
}

async function getUserLogin() {
  let userID = window.sessionStorage.getItem('userId');
  let usersJson = await loadData('users');
  for (key in usersJson) {
    let user = usersJson[key];
    if (user.userId.toString() == userID) {
      return user;
    }
  }
  return null;
}

async function getuseremblem() {
  let currentUser = await getUserLogin();
  let emblemUser = document.getElementById('emblemUser');
  emblemUser.innerHTML = currentUser.emblem;
}
