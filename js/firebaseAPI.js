function onloadFunc() {
  console.log('test');
  postData('users', {
    "id": 0,
    "Name": "Guest",
    "Email": "",
    "Password": "",
    "Emblem": "G"    
  });
  postData('users', {
    "id": 1,
    "Name": "Andrea Bauer",
    "Email": "andrea6315@yahoo.com",
    "Password": "1234",
    "Emblem": "AB"
});
postData('users',{
    "id": 2,
    "Name": "Peter Ludwig",
    "Email": "p_Ludwig23@google.com",
    "Password": "1234",
    "Emblem": "PL"
});
postData('users',{
    "id": 3,
    "Name": "Alfred Mueller",
    "Email": "mueller_Alf92@gmail.com",
    "Password": "1234",
    "Emblem": "AM"
});  

//loadData("");  // name des JSONS einfügen um das JSON zu laden
  //postData("/name", {titel: "test"}); //neue ID wird automatisch generiert
  //deleteData("/name/- url angeben um Objekt zu löschen")
  //putData("/name", {titel: "test"}); //verändert das Objekt in einer ID
}

const BASE_URL = 'https://join-179-default-rtdb.europe-west1.firebasedatabase.app/';

async function loadData(path = '') {
  let response = await fetch(BASE_URL + path + '.json');
  return (responseToJson = await response.json());
}

async function postData(path = '', data = {}) {
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

let contacts=[
{
  id: 1,
  name: 'Ackermann Carl Anton',
  email: 'carl_ackermann@gmx.de',
  phone: '015498753529',
  emblem: 'AC',
  color: '#FF7A00',
},
{
  id: 2,
  name: 'Ahlers Johann August',
  email: 'johann8989@gmx.de',
  phone: '016998639293',
  emblem: 'AJ',
  color: '#FF4646',
},
{
  id: 3,
  name: 'Beckmann Antje',
  email: 'beckmann.antje@yahoo.com',
  phone: '018569875352',
  emblem: 'BA',
  color: '#FFA35E',
},
{
  id: 4,
  name: 'Mueller Susanne',
  email: 'sussi_mueller@gmx.de',
  phone: '014569986987',
  emblem: 'MS',
  color: '#C3FF2B',
},
{
  id: 5,
  name: 'Wolfhope Theodor',
  email: 'theoHope1834@gmx.de',
  phone: '014768932145',
  emblem: 'WT',
  color: '#FF7A00',
},
]

let tasks = [
  {
    title: "Join Add Taskt",
    description: "Building a website that generates tasks to visualize the distribution of work.",
    assigneeIds: [2, 4, 5],
    date: "2022-10-06",
    priority: "medium",
    category: "Technical Task",
    subtask: ["Assigned to JS", "Categories JS"],
    status: ["To do"]
  },
  {
    title: "Add Taskt Design",
    description: "Create a webpage with a design that is pleasant and easy for our users.",
    assigneeIds: [1, 3, 5],
    date: "2022-10-06",
    priority: "urgent",
    category: "User Story",
    subtask: ["CSS form", "Decided Colors"],
    status: ["In progress"]
  },
];