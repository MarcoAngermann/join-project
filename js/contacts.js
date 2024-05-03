let contacts = [
    {
        name: "Ackermann Carl Anton",
        email: "carl_ackermann@gmx.de",
        phone: "015498753529"
    },
    {
        name: "Ahlers Johann August",
        email: "johann8989@gmx.de",
        phone: "016998639293"
    },
    {
        name: "Beckmann Antje",
        email: "beckmann.antje@yahoo.com",
        phone: "018569875352"
    },
    {
        name: "Mueller Susanne",
        email: "sussi_mueller@gmx.de",
        phone: "014569986987"
    },
    {
        name: "Wolfhope Theodor",
        email: "theoHope1834@gmx.de",
        phone: "014768932145"
    }
]


let colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF",
    "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"]



function init() {
    includeHTML();
    renderListContact();
}

function renderListContact() {
    let contentList = document.getElementById('divList');
    contentList.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (i == 0 || contact['name'].slice(0, 1) != contacts[i - 1]['name'].slice(0, 1)) {
            contentList.innerHTML += `<div class="divAlphabet">${contact['name'].slice(0, 1)}</div>`
        }
        contentList.innerHTML += `
            <div class="divShortContact">
            <div class="contactEmblem" style="background-color: ${colorRandom()}"> ${renderEmblem(contact['name'])} </div>
            <div class="divShortInfo">
                    <p>${contact['name']}</p>
                    <a>${contact['email']}</a>
            </div>
            </div>`
    };
}

function renderEmblem(name) {
    let aux = name.split(' ');
    let capital = "";
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

