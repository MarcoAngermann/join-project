function onloadFunc() {
  console.log('test');
  deleteData(
    '/name/- https://remotestorage-9e1b7-default-rtdb.europe-west1.firebasedatabase.app/'
  );
  //loadData("");  // name des JSONS einfügen um das JSON zu laden
  //postData("/name", {titel: "test"}); //neue ID wird automatisch generiert
  //deleteData("/name/- url angeben um Objekt zu löschen")
  //putData("/name", {titel: "test"}); //verändert das Objekt in einer ID
}

const BASE_URL =
  'https://remotestorage-9e1b7-default-rtdb.europe-west1.firebasedatabase.app/';

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
