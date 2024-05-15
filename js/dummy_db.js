let contacts = [
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
];

let colors = [
  '#FF7A00',
  '#FF5EB3',
  '#6E52FF',
  '#9327FF',
  '#00BEE8',
  '#1FD7C1',
  '#FF745E',
  '#FFA35E',
  '#FC71FF',
  '#FFC701',
  '#0038FF',
  '#C3FF2B',
  '#FFE62B',
  '#FF4646',
  '#FFBB2B',
];

let categorys = ['Technical Task', 'User Story', 'Development', 'Editing'];
let subtaskList = [];

let status = ["To do", "In progress", "Await feedback", "Done"];

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


let users = [
  {
      "id": 0,
      "Name": "Guest",
      "Email": "",
      "Password": "",
      "Emblem": "G"
  },
  {
      "id": 1,
      "Name": "Andrea Bauer",
      "Email": "andrea6315@yahoo.com",
      "Password": "1234",
      "Emblem": "AB"
  },
  {
      "id": 2,
      "Name": "Peter Ludwig",
      "Email": "p_Ludwig23@google.com",
      "Password": "1234",
      "Emblem": "PL"
  },
  {
      "id": 3,
      "Name": "Alfred Mueller",
      "Email": "mueller_Alf92@gmail.com",
      "Password": "1234",
      "Emblem": "AM"
  }

];