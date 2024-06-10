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
let isTasksArrayLoading = false;

async function tasksArray() {
  
  console.log('Tasks array reset:', tasks); 
  
  let tasksJson = await loadData('tasks');
  console.log('Loaded tasks JSON:', tasksJson); 
  for (let key in tasksJson) {
    let task = tasksJson[key];
    tasks.push(task);
  }
  console.log('Tasks array after loading data:', tasks); 
}

async function usersArray() {
  let usersJson = await loadData('users');
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
  focusMobileSidebar()
  getuseremblem();
  openSidebarRules();
}

function errorFunction() {
  console.log('Fehler aufgetreten');
}

/*function zum focus() in der Sidebar zu generieren*/
function focusSidebar() {
  let currentPage = window.location.href.split('/').pop();
  let menu = document.getElementById('mysidebar');
  let links = menu.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    let linkHref = links[i].getAttribute('href');
    if (linkHref.replace('./', '') === currentPage.replace('?', '')) {
      links[i].focus();
      links[i].classList.add('active');
      break; //Endet der Loop, wenn der href gefunde wird.
    }
  }
}

function focusMobileSidebar() {
  let currentPage = window.location.href.split('/').pop();
  let mobileMenu = document.getElementById('mobile-menu');
  let mobileLinks = mobileMenu.getElementsByTagName('a');
  for (let i = 0; i < mobileLinks.length; i++) {
    let linkHref = mobileLinks[i].getAttribute('href');
    if (linkHref.replace('./', '') === currentPage.replace('?', '')) {
      mobileLinks[i].focus();
      mobileLinks[i].classList.add('active');
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
  if (currentUser != null) {
    let emblemUser = document.getElementById('emblemUser');
    emblemUser.innerHTML = currentUser.emblem;
  }
  else {
    emblemUser.innerHTML = "";
  }
}

function userLogOut() {
  window.sessionStorage.removeItem('userId');
  window.location.href = '../index.html';
}

async function openSidebarRules() {
  let currentUser = await getUserLogin();
  let sidebarRules = document.getElementById('menu');
  let mobileSidebarRules = document.getElementById('mobile-mysidebar');
  if (currentUser == null) {
    sidebarRules.style.display = "none";
    mobileSidebarRules.style.display = "none";
    let arrowBack = document.getElementById('backSummaryRules');
    arrowBack.href = '../index.html';
  }
}



async function tasksArray() {
  if (isTasksArrayLoading) {
    return; // Exit if already loading
  }
  isTasksArrayLoading = true;
  try {
    console.log('Calling tasksArray function'); // Debugging line
    tasks = []; // Ensure tasks array is cleared before populating
    console.log('Tasks array after reset:', tasks); // Debugging line

    let tasksJson = await loadData('tasks');
    console.log('Loaded tasks JSON:', tasksJson); // Debugging line

    for (let key in tasksJson) {
      let task = tasksJson[key];
      tasks.push(task);
    }
    console.log('Tasks array after loading data:', tasks); // Debugging line
  } finally {
    isTasksArrayLoading = false;
  }
}
