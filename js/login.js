async function initLogin() {
  joinAnimation();
  moveIcon();
  usersJson = await loadData('users');
}
let usersJson;

function init() {
  let btn = document.getElementById('btnSignUp');
  btn.setAttribute('disabled', '');
  btn.classList.remove('btn-join');
  btn.classList.add('btn-disabled');
}

function isChecked() {
  const btn = document.getElementById('btnSignUp');
  btn.removeAttribute('disabled', '');
  btn.classList.add('btn-join');
  btn.classList.remove('btn-disabled');
}

async function AddUser(event) {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmpassword = document.getElementById('passwordConfirm').value;

  if (!validatePasswords(password, confirmpassword)) {
    showPasswordError();
    return false;
  }

  if (await emailExists(email)) {
    checkEmailExist();
    return false;
  }

  let user = await createUser(name, email, password);
  await postData('users', user);
  showSignUpDialog();
  await sleep(3000);
  cleanContactControls();
  backToLogin();
}

function validatePasswords(password, confirmpassword) {
  return password === confirmpassword;
}

function showPasswordError() {
  let pwErrorElement = document.getElementById('pwErrorCheck');
  pwErrorElement.style.display = 'flex';
  pwErrorElement.innerText = '* Passwords are not the same';
}

function checkEmailExist() {
  let emailElement = document.getElementById('email');
  emailElement.value = ''; // Email-Input leeren
  emailElement.value = 'Diese E-Mail existiert bereits';
  emailElement.style = 'color:red; font-weight:bold;';
  emailElement.style.border = '2px solid red';
}

async function createUser(name, email, password) {
  return {
    userId: (await findLastUserId()) + 1,
    name: name,
    email: email,
    password: password,
    emblem: getEmblemUser(name),
    color: colorRandom(),
  };
}

function showSignUpDialog() {
  document.getElementById('dialogSingUp').style.display = 'flex';
}

async function emailExists(email) {
  let usersJson = await loadData('users');
  for (let key in usersJson) {
    if (usersJson[key].email === email) {
      return true; // E-Mail existiert bereits
    }
  }
  return false; // E-Mail existiert nicht
}

function colorRandom() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getEmblemUser(name) {
  let nameParts = name.split(' '); // Zerlegt den Namen in ein Array von Wörtern
  let initials = ''; // Speichert die Initialen
  for (let i = 0; i < nameParts.length; i++) {
    if (i <= 1) {
      // Nur die ersten beiden Wörter berücksichtigen
      initials += nameParts[i].slice(0, 1).toUpperCase(); // Erste Buchstaben in Großbuchstaben hinzufügen
    }
  }
  return initials; // Gibt die Initialen zurück
}

async function findLastUserId() {
  let usersJson = await loadData('users');
  let lastId = 1;
  for (key in usersJson) {
    let user = usersJson[key];
    if (user.userId > lastId) {
      lastId = user.userId;
    }
  }
  return lastId; // found the last contact.id
}

let sleep = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function cleanContactControls() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('passwordConfirm').value = '';
}

function doLogin(event) {
  if (event) event.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  if (checkUserExist(email, password)) {
    console.log('Login successful');
    window.location.href = './templates/summary.html';
  } else {
    showLoginError();
    return false;
  }
}

function checkUserExist(email, password) {
  for (let key in usersJson) {
    let user = usersJson[key];
    if (email === user.email && password === user.password) {
      window.sessionStorage.setItem('userId', user.userId);
      return true;
    }
  }
  return false;
}

function showLoginError() {
  let loginErrorElement = document.getElementById('loginErrorCheck');
  loginErrorElement.style.display = 'flex';
  loginErrorElement.innerText = '* user does not exist or wrong password';
}

function errorLogin() {
  document.getElementById('errorMessageContainer').classList.remove('dnone');
  setTimeout(function () {
    document.getElementById('errorMessageContainer').classList.add('dnone');
  }, 3000);
}

function getGuestLogin(event) {
  event.preventDefault();
  let userId = 0;
  window.sessionStorage.setItem('userId', userId);
  location.href = './templates/summary.html';
}

function showPassword() {
  let image = document.getElementById('password');
  if (image.type == 'password') {
    image.style.backgroundImage = "url('../assets/icons/visibility.svg')";
    image.type = 'text';
  } else {
    image.style.backgroundImage = "url('../assets/icons/visibility_off.svg')";
    image.type = 'password';
  }
}

function showPasswordConf() {
  let image = document.getElementById('passwordConfirm');
  if (image.type == 'password') {
    image.style.backgroundImage = "url('../assets/icons/visibility.svg')";
    image.type = 'text';
  } else {
    image.style.backgroundImage = "url('../assets/icons/visibility_off.svg')";
    image.type = 'password';
  }
}

function moveIcon() {
  setTimeout(() => {
    document.getElementById('containerLog').style.display = 'flex';
  }, 3000);
}

function signUp() {
  location.href = './templates/signUp.html';
  if (700 <= window.innerWidth) {
    document.getElementById('divSignUp').classList.add('d-none');
  }
}

function backToLogin() {
  location.href = '../index.html';
  if (700 <= window.innerWidth) {
    document.getElementById('divSignUp').classList.remove('d-none');
  } else {
    document
      .getElementById('mobileDivSignUp')
      .classList.remove('d-none-important');
  }
}

function joinAnimation() {
  let animation = document.getElementById('iconContainer');
  let mobileanimation = document.getElementById('mobileIconContainer');
  let mobileanimationwhite = document.getElementById(
    'mobileIconContainerWhite'
  );
  let mainContainerLogin = document.getElementById('mainContainerLogin');

  if (700 <= window.innerWidth) {
    animation.classList.remove('d-none');
    animation.classList.add('icon-container');
  } else {
    mainContainerLogin.style.backgroundColor = '#06192c';
    mobileanimation.classList.remove('d-none');
    mobileanimationwhite.classList.remove('d-none');
    mobileanimation.classList.add('mobile-icon-container');
    mobileanimationwhite.classList.add('mobile-icon-container-white');
  }
}

function validateSignUpForm() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmpassword = document.getElementById('passwordConfirm').value;
  let checkBox = document.getElementById('acepptRules');
  if (
    name == '' ||
    email == '' ||
    password == '' ||
    confirmpassword == '' ||
    checkBox.checked == false
  ) {
    init();
  } else {
    isChecked();
  }
}

function resetError() {
  document.getElementById('pwErrorCheck').style.display = 'none';
}

function resetErrorLogIn() {
  document.getElementById('loginErrorCheck').style.display = 'none';
}
