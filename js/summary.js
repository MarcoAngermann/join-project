function initSummary() {
  includeHTML();
  displayGreeting();
  displayUser();
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
  let isGuest = (currentUser.userId == 0);
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
