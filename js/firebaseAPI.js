function onloadFunc() {
  //initUsers();
  //loadData("");  // name des JSONS einfügen um das JSON zu laden
  //postData("/name", {titel: "test"}); //neue ID wird automatisch generiert
  //deleteData("/name/- url angeben um Objekt zu löschen")
  //putData("/name", {titel: "test"}); //verändert das Objekt in einer ID
}

const BASE_URL =
  'https://join-179-default-rtdb.europe-west1.firebasedatabase.app/';

async function loadData(path = '') {
  let response = await fetch(BASE_URL + path + '.json');
  return (responseToJson = await response.json());
}

async function postData(path = '', data = {}) {
  const id = data.id;
  let response = await fetch(BASE_URL + path + '.json', {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

async function deleteData(path = '') {
  let response = await fetch(BASE_URL + path + '.json', {
    method: 'DELETE',
  });
  return (responseToJson = await response.json());
}

async function putData(path = '', data = {}) {
  let response = await fetch(BASE_URL + path + '.json', {
    method: 'PUT',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}
function initUsers() {
<<<<<<< HEAD
  postData('users', id, {
    id: 0,
    Name: 'Guest',
    Email: '',
    Password: '',
    Emblem: 'G',
  });
  postData('users', id, {
    id: 1,
    Name: 'Andrea Bauer',
    Email: 'andrea6315@yahoo.com',
    Password: '1234',
    Emblem: 'AB',
  });
  postData('users', id, {
    id: 2,
    Name: 'Peter Ludwig',
    Email: 'p_Ludwig23@google.com',
    Password: '1234',
    Emblem: 'PL',
  });
  postData('users', id, {
    id: 3,
    Name: 'Alfred Mueller',
    Email: 'mueller_Alf92@gmail.com',
    Password: '1234',
    Emblem: 'AM',
=======
  postData('users', {
    userId: 0,
    name: 'Guest',
    email: '',
    password: '',
    emblem: 'G',
  });
  postData('users', {
    userId: 1,
    name: 'Andrea Bauer',
    email: 'andrea6315@yahoo.com',
    password: '1234',
    emblem: 'AB',
    color: '#FF7A00',
  });
  postData('users', {
    userId: 2,
    name: 'Peter Ludwig',
    email: 'p_Ludwig23@google.com',
    password: '1234',
    emblem: 'PL',
    color: '#FF4646',
  });
  postData('users', {
    userId: 3,
    name: 'Alfred Mueller',
    email: 'mueller_Alf92@gmail.com',
    password: '1234',
    emblem: 'AM',
    color: '#FFA35E',
>>>>>>> 512b8892d1e4f31b07615dc3dba75a2b0611475e
  });
}

function initContacts() {
  postData('contacts', {
    contactId: 0,
    name: 'Ackermann Carl Anton',
    email: 'carl_ackermann@gmx.de',
    phone: '015498753529',
    emblem: 'AC',
    color: '#FF7A00',
  });

  postData('contacts', {
<<<<<<< HEAD
    id: 2,
=======
    contactId: 1,
>>>>>>> 512b8892d1e4f31b07615dc3dba75a2b0611475e
    name: 'Ahlers Johann August',
    email: 'johann8989@gmx.de',
    phone: '016998639293',
    emblem: 'AJ',
    color: '#FF4646',
  });
  postData('contacts', {
<<<<<<< HEAD
    id: 3,
=======
    contactId: 2,
>>>>>>> 512b8892d1e4f31b07615dc3dba75a2b0611475e
    name: 'Beckmann Antje',
    email: 'beckmann.antje@yahoo.com',
    phone: '018569875352',
    emblem: 'BA',
    color: '#FFA35E',
  });
  postData('contacts', {
<<<<<<< HEAD
    id: 4,
=======
    contactId: 3,
>>>>>>> 512b8892d1e4f31b07615dc3dba75a2b0611475e
    name: 'Mueller Susanne',
    email: 'sussi_mueller@gmx.de',
    phone: '014569986987',
    emblem: 'MS',
    color: '#C3FF2B',
  });
  postData('contacts', {
<<<<<<< HEAD
    id: 5,
=======
    contactId: 4,
>>>>>>> 512b8892d1e4f31b07615dc3dba75a2b0611475e
    name: 'Wolfhope Theodor',
    email: 'theoHope1834@gmx.de',
    phone: '014768932145',
    emblem: 'WT',
    color: '#FF7A00',
  });
}
<<<<<<< HEAD
=======

function initTasks() {
  postData('tasks', {
    title: 'Join Add Task',
    description:
      'Building a website that generates tasks to visualize the distribution of work.',
    userId: 0,
    date: '2022-10-06',
    priority: 'medium',
    category: 'Technical Task',
    subtask: ['Assigned to JS', 'Categories JS'],
    status: 'To do',
    cardId: 0,
  });

  postData('tasks', {
    title: 'edit Task Design',
    description:
      'edit a webpage with a design that is pleasant and easy for our users.',
    userId: 1,
    date: '2022-10-15',
    priority: 'urgent',
    category: 'User Story',
    subtask: ['CSS form', 'Decided Colors'],
    status: 'In progress',
    cardId: 1,
  });

  postData('tasks', {
    title: 'develope Task Design',
    description:
      'develope a webpage with a design that is pleasant and easy for our users.',
    userId: 2,
    date: '2022-10-22',
    priority: 'low',
    category: 'Development',
    subtask: ['Decided Colors'],
    status: 'Await Feedback',
    cardId: 2,
  });
}

function getUser() {
  let userEmblem = document.getElementById('usersEmblem');
  let divs = userEmblem.getElementsByTagName('div');
  let idsList = [];
  for (let i = 0; i < divs.length; i++) {
    idsList.push(divs[i].userId);
  }
  return idsList;
}

function createCardId(users) {
  let lastId = 1;
  for (let i = 1; i < tasks.length; i++) {
    if (tasks[i].cardId > lastId) {
      lastId = tasks[i].cardId;
    }
  }
  return lastId; //
}

async function createNewTask(event) {
  event.preventDefault();
  let lastCardId = createCardId(users);
  task = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    userId: getUser(), //umänderung taskID
    date: document.getElementById('date').value,
    priority: getSelectedPrio(),
    category: document.getElementById('selectedCategory').value,
    subtask: subtaskList,
    status: 'To do',
    cardId: lastCardId + 1,
  };
  /*tasks.push(task);*/
  await postData('tasks', task);
  clearAllTasks();
}
>>>>>>> 512b8892d1e4f31b07615dc3dba75a2b0611475e
