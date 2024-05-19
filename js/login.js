async function initLogin() {
  moveIcon();
  usersJson = await loadData('users');
}
let usersJson;

function init() {
  let btn = document.getElementById('btnSignUp');
  btn.setAttribute('disabled', '');
  btn.classList.remove('btnJoin');
  btn.classList.add('btnDisabled');
}

function isChecked() {
  let checkBox = document.getElementById('acepptRules');
  if (checkBox.checked == true) {
    const btn = document.getElementById('btnSignUp');
    btn.removeAttribute('disabled', '');
    btn.classList.add('btnJoin');
    btn.classList.remove('btnDisabled');
  } else {
    init();
  }
}

async function AddUser(event) {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmpassword = document.getElementById('passwordConfirm').value;
  if (password != confirmpassword) {
    document.getElementById('inputLabel').style.display = 'flex';
    return false;
  }
  let user = {
    userId: (await findLastUserId()) + 1,
    name: name,
    email: email,
    password: password,
    emblem: getEmblemUser(name),
    color: colorRandom(),
  };
  await postData('users', user);
  document.getElementById('dialogSingUp').style.display = 'flex';
  await sleep(3000);
  cleanContactControls();
  backToLogin();
}

function colorRandom() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getEmblemUser(name) {
  let aux = name.split(' ');
  let capital = '';
  for (let j = 0; j < aux.length; j++) {
    if (j <= 1) {
      capital += aux[j].slice(0, 1).toUpperCase();
    }
  }
  return capital;
}

async function findLastUserId() {
  let usersJson = await loadData('users');
  let lastId = 1;
  for (item in usersJson) {
    let user = usersJson[item];
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

function backToLogin() {
  location.href = '../templates/login.html';
}

function moveIcon() {
  document.getElementById('imgLogoID').classList.add('animation1');
  document.getElementById('overlay').classList.add('animation2');
}

function doLogin() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  for (item in usersJson) {
    user = usersJson[item];
    if (email == user.email && password == user.password) {
      let userId = user.userId;
      window.sessionStorage.setItem('userId', userId);
      console.log('true');
    }
  }
  location.href = '..//templates/summary.html';
}

function getGuestLogin() {
  let userId = 0;
  window.sessionStorage.setItem('userId', userId);
  location.href = '..//templates/summary.html';
}

function keyDown() {
  let image = document.getElementById('password');
  image.style.backgroundImage = "url('../assets/icons/visibility_off.svg')";
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

function keyDownConf() {
  let image = document.getElementById('passwordConfirm');
  image.style.backgroundImage = "url('../assets/icons/visibility_off.svg')";
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
