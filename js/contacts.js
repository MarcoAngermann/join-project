async function initContact() {
  await includeHTML();
  await contactsArray();
  renderListContact();
}

let contacts = [];

async function contactsArray() {
  let contactsJson = await loadData('contacts');
  for (key in contactsJson) {
    let contact = contactsJson[key];
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
      contentList.innerHTML += `<div class="a-z-contact-list ">${contact['name']
        .slice(0, 1)
        .toUpperCase()}</div>`;
    }
    contentList.innerHTML += `
            <div class="contact-list-container" onclick="showDetailContact(${i})">
            <div class="contact-emblem" style="background-color: ${contact['color']
      }"> ${renderEmblem(contact['name'])} </div>
            <div class="contact-info-container">
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
  mobileDetails();
}

let mobilWindow = window.matchMedia('(max-width:710px)');
mobilWindow.addEventListener('change', () => myFunc());
function myFunc() {
  if (mobilWindow.matches) {
    document.getElementById("divContactDetails").style.display = "none";
    document.getElementById("divContactList").style.display = "flex";
  } else {
    document.getElementById("divContactDetails").style.display = "flex";
    document.getElementById("divContactList").style.display = "flex";
    let amobileDiv = document.getElementById("amobile_nameContact");
    if (amobileDiv != null) {
      amobileDiv.style.display = "none";
    }
  }
}

function mobileDetails() {
  outWidth = window.innerWidth;
  if (outWidth <= 710) {
    document.getElementById("divContactDetails").style.display = "flex";
    document.getElementById("divContactList").style.display = "none";
    document.getElementById("divDetails").classList.remove('move-left');
  };
}

function backMobileContListe() {
  outWidth = window.innerWidth;
  if (outWidth <= 710) {
    document.getElementById("divContactDetails").style.display = "none";
    document.getElementById("divContactList").style.display = "flex";
  };
}
function openMobileDialog() {
  let mobileMode = document.getElementById("amobile_nameContact");
  if (mobileMode != null) {
    if (mobileMode.style.display == "none") {
      mobileMode.style.display = "flex";
    }
    else {
      mobileMode.style.display = "none";
    }
  }
}
function renderContactinList(i) {
  return ` 
  <div class="headline-contact">
      <div class="emblem-info" id="emblem" style="background-color: ${contacts[i]['color']}">${contacts[i]['emblem']}</div>
      <div class="name-contact">
          ${contacts[i]['name']}
        <div class="a_nameContact" id="a_nameContact">
            <a onclick="openDialog(false, ${i})"><img class="imgBtns" src="../assets/icons/edit_contacts_icon.svg"> Edit</a>
            <a onclick="deleteContact(${i})"><img class="imgBtns" src="../assets/icons/delete_contact_icon.svg"> Delete</a>
        </div>
      </div>
  </div>
  <div class="info">Contact Information</div>
  <div class="styleDivinfo">
    <div><b>Email</b></div>
    <a id="email_contact">${contacts[i]['email']}</a>
    <div><b>Phone</b></div>
    <div id="phone_contact">${contacts[i]['phone']}</div> 
  
    <div class="mobile-contact" onclick="openMobileDialog()"><img class="arrow" src="..//assets/icons/menu_ContactOptions.svg" />
      <div class="mobile-dropdown-menu" id="amobile_nameContact" style="display:none">
        <a onclick="openDialog(false, ${i})"><img class="imgBtns" src="../assets/icons/edit_contacts_icon.svg"> Edit</a>
        <a onclick="deleteContact( ${i})"><img class="imgBtns" src="../assets/icons/delete_contact_icon.svg"> Delete</a>
      </div>
    </div>
  </div> `;
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
    document.getElementById('iconContact').outerHTML =
      `<div class="emblem-info" id="emblemContact" style="background-color: ${contact['color']}">${contact['emblem']}</div>`;
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
<button class="btnMobileClose" onclick="closeDialog()"><img class="imgBtns"
src="../assets/icons/closeWhite_icon.svg"></button>
  <img class="iconJoinContact" src="../assets/icons/joinWhite.svg">
  <div class="contact-details-title">${title1}</div>
  <div id="textAdd" class="textAdd">Task are better with a team</div>
  <div class="seperatorAdd"></div>
</div>
<div class="iconEdit" id="iconContact"><img src="../assets/icons/person_icon.svg">
</div>

<div class="styleDivFormEdit">
  <button class="btnClose" onclick="closeDialog()"><img class="imgBtns"
      src="../assets/icons/cancel.svg"></button>
  <form class="addcontactForm" onsubmit=${functionNew}>
    <div class="groupContact-input">
      <input class="inputsContact inputfield-text-style" type="text" id="nameContact"
        style="background-image: url(../assets/icons/personInput_icon.svg)" placeholder="Name" required>
      <input class="inputsContact inputfield-text-style" type="email" id="emailContact"
        style="background-image: url(../assets/icons/mail_icon.svg)" placeholder="Email" required>
      <input class="inputsContact inputfield-text-style" type="tel" id="phoneContact"
        style="background-image: url(../assets/icons/call_icon.svg)" placeholder="Phone" required>
      <div class="divBtnForm">
        <button class="button-guest inputfield-text-style" onclick="closeDialog()">Cancel <b>X</b></button>
        <button class="add-contact-button-mobile button-text-style" type="submit">${btnText} <img class="imgBtns" src="../assets/icons/checkWhite.svg"></button>
      </div>
  </form>
</div>
</div>`;
}

function closeDialog() {
  let mobileMode = document.getElementById("amobile_nameContact");
  if (mobileMode != null && mobileMode.style.display == 'flex') {
    mobileMode.style.display = 'none';
  }
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
  showNewContactDetails(newContact);
}

function showNewContactDetails(newContact) {
  closeDialog();
  cleanContactControls();
  renderListContact();
  document.getElementById('contactCreated').classList.remove('d-none');
  for (let i = 0; i < contacts.length; i++) {    
    if (newContact.name == contacts[i].name) {
      let infoContact = document.getElementById('divDetails');
      infoContact.innerHTML = ' ';
      infoContact.classList.remove('move-left');
      infoContact.innerHTML += renderContactinList(i);
      mobileDetails();
    }
  }
  contactCreatedDiv();
}

function contactCreatedDiv() {
  setTimeout(() => {
    document.getElementById('contactCreated').classList.add('d-none');
  }, 2400);
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
  if ( window.innerWidth <= 710) {
    backMobileContListe();
  }
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

