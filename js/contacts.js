async function initContact() {
  await includeHTML();
  await contactsArray();
  renderListContact();
}

let contacts = [];

async function contactsArray() {
  let contactsJson = await loadData('contacts');
  for (item in contactsJson) {
    let contact = contactsJson[item];
    contacts.push(contact);
  }
}

function renderListContact() {
  let contentList = document.getElementById('divList');
  contentList.innerHTML = '';
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (
      i == 0 ||
      contact['name'].slice(0, 1) != contacts[i - 1]['name'].slice(0, 1)
    ) {
      contentList.innerHTML += `<div class="divAlphabet">${contact['name']
        .slice(0, 1)
        .toUpperCase()}</div>`;
    }
    contentList.innerHTML += `
            <div class="divShortContact" onclick="showDetailContact(${i})">
            <div class="contactEmblem" style="background-color: ${
              contact['color']
            }"> ${renderEmblem(contact['name'])} </div>
            <div class="divShortInfo">
                    <p>${contact['name']}</p>
                    <a>${contact['email']}</a>
            </div>
            </div>`;
  }
}

function sortContacts() {
  contacts = contacts.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
}

function showDetailContact(i) {
  contact = contacts[i];
  let infoContact = document.getElementById('divDetails');
  infoContact.innerHTML = ' ';
  infoContact.classList.remove('move-left');
  infoContact.offsetWidth;
  infoContact.classList.add('move-left');
  infoContact.innerHTML += renderContactinList(i);
}

function renderContactinList(i) {
  return ` 
  <div class="headlineContact">
      <div class="emblemInfo" id="emblem" style="background-color: ${contact['color']}">${contact['emblem']}</div>
      <div class="nameContact">
          ${contact['name']}
        <div class="a_nameContact">
            <a onclick="openDialog(false, ${i})"><img class="imgBtns" src="../assets/icons/edit_contacts_icon.svg"> Edit</a>
            <a onclick="deleteContact(${i})"><img class="imgBtns" src="../assets/icons/delete_contact_icon.svg"> Delete</a>
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

function openDialog(newContact, i) {
  let dialog = document.getElementById('dialog');
  dialog.classList.remove('d-none');
  if (newContact == true) {
    let title1 = 'Add contact';
    let functionNew = 'newContact(event)';
    let btnText = 'Create Contact';
    dialog.innerHTML = renderContactDialog(title1, functionNew, btnText);
  } else {
    let contact = contacts[i];
    let title1 = 'Edit contact';
    let functionNew = 'editContact(event,' + i + ')';
    let btnText = 'Save';
    dialog.innerHTML = renderContactDialog(title1, functionNew, btnText);
    document.getElementById('textAdd').classList.add('d-none');
    document.getElementById('nameContact').value = contact['name'];
    document.getElementById('emailContact').value = contact['email'];
    document.getElementById('phoneContact').value = contact['phone'];
  }
}

function renderContactDialog(title1, functionNew, btnText) {
  return `
<div class="dialog">
<div class="joinAddContact">
  <img class="iconJoinContact" src="../assets/icons/joinWhite.svg">
  <div class="titleContact">${title1}</div>
  <div id="textAdd" class="textAdd">Task are better with a team</div>
  <div class="seperatorAdd"></div>
</div>
<div style="margin: 30px;"><img src="../assets/icons/person_icon.svg">
</div>
<div style="height: 100%;">
  <button class="btnClose" onclick="closeDialog()"><img class="imgBtns"
      src="../assets/icons/cancel.svg"></button>
  <form class="addcontactForm" onsubmit=${functionNew}>
    <div class="groupContact-input">
      <input class="inputsContact style_InputTypography1" type="text" id="nameContact"
        style="background-image: url(../assets/icons/personInput_icon.svg)" placeholder="Name" required>
      <input class="inputsContact style_InputTypography1" type="email" id="emailContact"
        style="background-image: url(../assets/icons/mail_icon.svg)" placeholder="Email" required>
      <input class="inputsContact style_InputTypography1" type="tel" id="phoneContact"
        style="background-image: url(../assets/icons/call_icon.svg)" placeholder="Phone" required>
      <div class="divBtnForm">
        <button class="btnGuest style_InputTypography1" onclick="closeDialog()">Cancel <b>X</b></button>
        <button class="btnJoin style_BtnTypography1" type="submit">${btnText} <img class="imgBtns" src="../assets/icons/checkWhite.svg"></button>
      </div>
  </form>
</div>
</div>`;
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
      capital += aux[j].slice(0, 1).toUpperCase();
    }
  }
  return capital;
}

function colorRandom() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function findLastContactId(contacts) {
  let lastId = 1;
  for (let i = 1; i < contacts.length; i++) {
    if (contacts[i].contactId > lastId) {
      lastId = contacts[i].contactId;
    }
  }
  return lastId; // found the last contact.id
}

async function newContact(event) {
  event.preventDefault();
  let lastContactId = findLastContactId(contacts);
  let nameContact = document.getElementById('nameContact').value;
  let nameContactUpper = nameContact[0].toUpperCase() + nameContact.slice(1);

  let newContact = {
    contactId: lastContactId + 1,
    name: nameContactUpper,
    email: document.getElementById('emailContact').value,
    phone: document.getElementById('phoneContact').value,
    emblem: renderEmblem(nameContact),
    color: colorRandom(),
  };
  contacts.push(newContact);
  await postData('contacts', newContact);
  closeDialog();
  cleanContactControls();
  renderListContact();
}

function cleanContactControls() {
  document.getElementById('nameContact').value = '';
  document.getElementById('emailContact').value = '';
  document.getElementById('phoneContact').value = '';
}

async function editContact(event, i) {
  event.preventDefault();
  contactEdit = contacts[i];
  contactEdit['name'] = document.getElementById('nameContact').value;
  contactEdit['email'] = document.getElementById('emailContact').value;
  contactEdit['phone'] = document.getElementById('phoneContact').value;
  contactEdit['emblem'] = renderEmblem(
    document.getElementById('nameContact').value
  );
  await firebaseUpdate(contactEdit);
  closeDialog();
  cleanContactControls();
  renderListContact();
  showDetailContact(i);
}

async function firebaseUpdate(contactEdit) {
  let contactsJson = await loadData('contacts');
  for (key in contactsJson) {
    let contactDB = contactsJson[key];
    if (contactDB.contactId == contactEdit.contactId) {
      putData('contacts/' + [key], contactEdit);
    }
  }
}

async function deleteContact(i) {
  let contactDelete = contacts[i];
  contacts.splice(i, 1);
  document.getElementById('divDetails').innerHTML = '';
  await firebaseDelete(contactDelete);
  renderListContact();
}

async function firebaseDelete(contactDelete) {
  let contactsJson = await loadData('contacts');
  for (key in contactsJson) {
    let contactDB = contactsJson[key];
    if (contactDB.contactId == contactDelete.contactId) {
      deleteData('contacts/' + [key]);
    }
  }
}
