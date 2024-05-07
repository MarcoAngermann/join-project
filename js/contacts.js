function init() {
  includeHTML();
  renderListContact();
}

function renderListContact() {
  let contentList = document.getElementById('divList');
  contentList.innerHTML = '';
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (i == 0 || contact['name'].slice(0, 1) != contacts[i - 1]['name'].slice(0, 1)) {
      contentList.innerHTML += `<div class="divAlphabet">${contact['name'].slice(0, 1)}</div>`;
    }
    contentList.innerHTML += `
            <div class="divShortContact" onclick="showDetailContact(${i})">
            <div class="contactEmblem" style="background-color: ${contact['color']}"> ${renderEmblem(contact['name'])} </div>
            <div class="divShortInfo">
                    <p>${contact['name']}</p>
                    <a>${contact['email']}</a>
            </div>
            </div>`;
  };
}

function sortContacts() {
  contacts = contacts.sort((a, b) => {
    if (a.name > b.name) { return 1; }
    if (a.name < b.name) { return -1; }
    return 0;
  });
}

function showDetailContact(i) {
  contact = contacts[i];
  let infoContact = document.getElementById('divDetails');
  infoContact.innerHTML = " ";
  infoContact.classList.remove('move-left');
  infoContact.offsetWidth;
  infoContact.classList.add('move-left');
  infoContact.innerHTML += renderContactinList();
}

function renderContactinList() {
  return ` 
  <div class="headlineContact">
      <div class="emblemInfo" id="emblem" style="background-color: ${contact['color']}">${contact['emblem']}</div>
      <div class="nameContact" id="nameContact">
          ${contact['name']}
        <div class="a_nameContact">
            <a onclick="editContact(i)"><img src="../assets/icons/edit_contacts_icon.svg"> Edit</a>
            <a onclick="deleteContact(id)"><img src="../assets/icons/delete_contact_icon.svg"> Delete</a>
        </div>
      </div>
  </div>
  <div class="info">Contact Information</div>
  <div class="styleDivinfo">
    <div><b>Email</b></div>
    <a id="email_contact">${contact['email']}</a>
    <div><b>Phone</b></div>
    <div id="phone_contact">${contact['phone']}</div>
  </div>`;
}


function openDialog() {
  let dialog = document.getElementById('dialog');
  dialog.classList.remove('d-none');
}

function closeDialog() {
  let dialog = document.getElementById('dialog');
  dialog.classList.add('d-none');
}

function renderEmblem(name) {
  let aux = name.split(' ');
  let capital = '';
  for (let j = 0; j < aux.length; j++) {
    if (j <= 1) {
      capital += aux[j].slice(0, 1);
    }
  }
  return capital;
}

function colorRandom() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function newContact(event) {
  event.preventDefault();
  let nameContact = document.getElementById('nameContact').value;
  let newContact = {   
    "name": nameContact,
    "email": document.getElementById('emailContact').value,
    "phone": document.getElementById('phoneContact').value,
    "emblem": renderEmblem(nameContact),
    "color": colorRandom()
  }
  contacts.push(newContact);
  closeDialog();
  cleanContactControls();
  renderListContact();
}

function cleanContactControls() {
  document.getElementById('nameContact').value = "";
  document.getElementById('emailContact').value = "";
  document.getElementById('phoneContact').value = "";
}
