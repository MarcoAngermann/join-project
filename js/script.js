async function init() {
  await includeHTML();
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

async function init() {
  await fetch('script.json').catch(errorFunction);
  console.log('Fertig');
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

function getUserLogin() {
  let userID = window.sessionStorage.getItem('userId');
  for (let i = 0; i < users.length; i++) {
    if (users[i].id.toString() == userID) {
      return users[i];
    }
  }
  return null;
}

function getuseremblem() {
  let currentUser = getUserLogin();
  let emblemUser = document.getElementById('emblemUser');
  emblemUser.innerHTML = currentUser.Emblem;
}
