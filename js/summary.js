async function initSummary() {
  await includeHTML();
  await tasksArray();
  countsTaskStatus();
  displayGreeting();
  displayUser();
  mobileGreeting();
}

function getGreeting(isGuest) {
  let time = new Date().getHours();
  let greeting;
  console.log(time);
  if (time < 12) {
    greeting = 'Good Morning';
  } else if (time < 18) {
    greeting = 'Good Day';
  } else {
    greeting = 'Good Evening';
  }
  greeting += isGuest ? '!' : ',';
  return greeting;
}

async function displayGreeting() {
  let currentUser = await getUserLogin();
  let isGuest = currentUser.userId == 0;
  document.getElementById('greetText').innerHTML = getGreeting(isGuest);
}

async function displayUser() {
  let currentUser = await getUserLogin();
  let currentUserName = document.getElementById('greetUserName');
  if (currentUser.userId == 0) {
    currentUserName.innerHTML = ' ';
  } else {
    currentUserName.innerHTML = currentUser.name;
  }
}

let todo = 0;
let inProgress = 0;
let awaitFeedback = 0;
let done = 0;
let urgent = 0;
let dateUrgent = '2100-01-01';

function countsTaskStatus() {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status == 'toDo') {
      todo += 1;
    } else if (tasks[i].status == 'inProgress') {
      inProgress += 1;
    } else if (tasks[i].status == 'awaitFeedback') {
      awaitFeedback += 1;
    } else {
      done += 1;
    }
    if (tasks[i].priority == 'urgent') {
      urgent += 1;
      if (tasks[i].date < dateUrgent) {
        dateUrgent = tasks[i].date;
      }
    }
  }
  rendernCountTasks();
}

function rendernCountTasks() {
  document.getElementById('toDoCount').innerHTML = todo;
  document.getElementById('doneCount').innerHTML = done;
  document.getElementById('inProgressCount').innerHTML = inProgress;
  document.getElementById('awaitFeedbackCount').innerHTML = awaitFeedback;
  document.getElementById('allTasksCount').innerHTML = tasks.length;
  document.getElementById('urgentCount').innerHTML = urgent;
  if (urgent == 0) {
    document.getElementById('nextUrgentDate').innerHTML = '';
  } else {
    document.getElementById('nextUrgentDate').innerHTML =
      convertDate(dateUrgent);
  }
}

function convertDate(dateUrgent) {
  let date = new Date(dateUrgent);
  let options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function mobileSummaryGreetting() {
  document
    .getElementById('greetingContainer')
    .classList.add('animationSummary');
  setTimeout(() => {
    document.getElementById('summaryCardContainer').style.display = 'flex';
  }, 1000);
}

function mobileSummaryShow() {
  document
    .getElementById('summaryCardContainer')
    .classList.add('animationSummaryShine');
}

let mobilWindow = window.matchMedia('(max-width:800px)');
mobilWindow.addEventListener('change', () => myFunc());
function myFunc() {
  if (mobilWindow.matches) {
    mobileGreeting();
  } else {
    document
      .getElementById('greetingContainer')
      .classList.remove('animationSummary');
    document.getElementById('greetingContainer').style.display = 'flex';
    document
      .getElementById('summaryCardContainer')
      .classList.remove('animationSummaryShine');
  }
}

function mobileGreeting() {
  outWidth = window.innerWidth;
  if (outWidth <= 800) {
    mobileSummaryGreetting(setTimeout, 3000);
    mobileSummaryShow();
  }
}
