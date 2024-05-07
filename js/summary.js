function getGreeting() {
    let time = new Date().getHours();
    let greeting;
    console.log(time);
    if (time < 12) {
        greeting = "Good Morning,";
    } else if (time < 18) {
        greeting = "Good Day,";
    } else {
        greeting = "Good Evening,";
    }
    return greeting;
}
function displayGreeting() {
    document.getElementById("greetText").innerHTML = getGreeting();
}