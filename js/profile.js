const loginForm = document.getElementById("log-in");
const loginInput = document.querySelector("#log-in input");
const welcome = document.querySelector("#welcome h2");

const USERNAME_KEY = "username";
const HIDDEN_CLASSNAME = "hidden";
const savedUserName = localStorage.getItem(USERNAME_KEY);

function addUser(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    loginForm.classList.add(HIDDEN_CLASSNAME);
    welcomeMsg(username);
}

// remove hidden class from #welcome h2 to show welcome message
function welcomeMsg(username) {
    welcome.innerText = `Welcome ${username}`;
    welcome.classList.remove(HIDDEN_CLASSNAME);
}

// if there is no username in local storage, show the username input and wait for the submit event
if (savedUserName === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", addUser)
}
else {
     welcomeMsg(savedUserName);
}