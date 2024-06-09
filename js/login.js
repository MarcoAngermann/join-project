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

// Funktion, um zu überprüfen, ob die E-Mail bereits existiert
async function emailExists(email) {
  let usersJson = await loadData('users');
  for (let key in usersJson) {
    if (usersJson[key].email === email) {
      return true; // E-Mail existiert bereits
    }
  }
  return false; // E-Mail existiert nicht
}

async function AddUser(event) {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmpassword = document.getElementById('passwordConfirm').value;

  // Überprüfen, ob das Passwort mit der Bestätigung übereinstimmt
  if (password !== confirmpassword) {
    document.getElementById('pwErrorCheck').style.display = 'flex';
    return false;
  }

  // Überprüfen, ob die E-Mail bereits vorhanden ist
  if (await emailExists(email)) {
    // Wenn die E-Mail bereits vorhanden ist, handle entsprechend
    document.getElementById('email').value = ''; // Email-Input leeren
    document.getElementById('email').value = 'Diese E-Mail existiert bereits';
    document.getElementById('email').style = 'color:red; font-weight:bold;';
    document.getElementById('email').style.border = '2px solid red';
    return false;
  }

  // Wenn die E-Mail nicht vorhanden ist, neuen Benutzer erstellen
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

// Funktion, um zu überprüfen, ob die E-Mail bereits existiert
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

function backToLogin() {
  location.href = '../index.html';
}

function doLogin(event) {
  // Verhindern Sie das Standardverhalten des Formulars, falls diese Funktion als Event Handler verwendet wird
  if (event) event.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let userExists = false;

  for (let key in usersJson) {
    let user = usersJson[key];
    if (email === user.email && password === user.password) {
      userExists = true;
      let userId = user.userId;
      window.sessionStorage.setItem('userId', userId);
      console.log('Login successful');
      window.location.href = './templates/summary.html';
      return;
    }
  }

  if (!userExists) {
    console.log('Login failed: User not found or password incorrect');
    alert(
      'Login fehlgeschlagen: Benutzer nicht gefunden oder Passwort falsch.'
    );
  }
}

function getGuestLogin(event) {
  event.preventDefault();
  let userId = 0;
  window.sessionStorage.setItem('userId', userId);
  location.href = './templates/summary.html';
}

function keyDown() {
  let image = document.getElementById('password');
  image.style.backgroundImage = "url('./assets/icons/visibility.svg')";
}

function showPassword() {
  let image = document.getElementById('password');
  if (image.type == 'password') {
    image.style.backgroundImage = "url('./assets/icons/visibility_off.svg')";
    image.type = 'text';
  } else {
    image.style.backgroundImage = "url('./assets/icons/visibility.svg')";
    image.type = 'password';
  }
}

function keyDownConf() {
  let image = document.getElementById('passwordConfirm');
  image.style.backgroundImage = "url('./assets/icons/visibility.svg')";
}

function showPasswordConf() {
  let image = document.getElementById('passwordConfirm');
  if (image.type == 'password') {
    image.style.backgroundImage = "url('./assets/icons/visibility_off.svg')";
    image.type = 'text';
  } else {
    image.style.backgroundImage = "url('./assets/icons/visibility.svg')";
    image.type = 'password';
  }
}


function moveIcon() {
  setTimeout(() => {
    document.getElementById('containerLog').style.display = 'flex';
  }, 3000);
}
//
///*mobile function*/
//
//function moveIcons() {
//  outWidth = window.innerWidth;
//  if (outWidth <= 700) {
//    document.getElementById("imgLogoID").src = "./assets/icons/joinWhite.svg";
//    document.getElementById("overlay").style.backgroundColor = "#2A3647";
//    moveIcon();
//  }
//  else {
//    moveIcon();
//  }
//}
