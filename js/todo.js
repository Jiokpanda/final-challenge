const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const toDoElement = document.querySelector("#todo-list li");

// make an mutable array for to-dos
let toDos = [];

// delete selected to-do
function deleteToDo(event) {
    const li = event.target.parentElement;
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
    li.remove();
}

// toggle "checked" class on to-do click
function completeToDo(event) {
    const li = event.target.parentElement;
    const span = event.target.parentElement.children[0];
    span.classList.toggle("checked");

    for(let i=0;i<toDos.length;i++){
        if(toDos[i].id === parseInt(li.id) && toDos[i].complete === false){
            toDos[i].complete = true;
        }
        else if(toDos[i].id === parseInt(li.id) && toDos[i].complete === true){
            toDos[i].complete = false;
        }
    }
    saveToDos();
}

function paintToDo(newToDo) {
    const li = document.createElement('li');
    li.id = newToDo.id;
    

    const spanText = document.createElement('span');
    const spanDate = document.createElement('span');

    if(newToDo.complete === false){
        spanText.setAttribute("class", "todo-text");
    }
    else{
        spanText.setAttribute("class", "todo-text checked");
    }
    spanText.innerText = newToDo.text;

    // add time information when a to-do submitted
    spanDate.setAttribute("class", "todo-date");
    spanDate.innerText = `${newToDo.month}/${newToDo.d < 10 ? `0` + newToDo.d : newToDo.d} ${newToDo.h < 10 ? `0` + newToDo.h : newToDo.h}:${newToDo.m < 10 ? `0` + newToDo.m : newToDo.m}`;

    // add delete button for to-do
    const button = document.createElement('button');
    button.setAttribute("class", "delete-button");
    button.innerText = "❌";
    
    
    // event listner for complete and delete function
    button.addEventListener("click", deleteToDo);
    li.addEventListener("click", completeToDo);

    li.appendChild(spanText);
    li.appendChild(spanDate);
    li.appendChild(button);
    toDoList.appendChild(li);
}

// save array data to local storage as string
function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
}

function addToDo(event) {
    event.preventDefault();
    const toDo = toDoInput.value;
    toDoInput.value = "";
    const date = new Date();
    const toDoObj = {
        id: date.getTime(),
        month: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        text: toDo,
        complete: false
    }
    toDos.push(toDoObj);
    paintToDo(toDoObj);
    saveToDos();
}

// Highlight old to-dos(more than one day)
function checkToDos() {
    const date = new Date();
    for (let i = 0; i < toDos.length; i++) {
        if ((toDos[i].d < date.getDate()) || (toDos[i].month < date.getMonth() + 1)) {
            const oldToDo = document.getElementById(toDos[i].id);
            oldToDo.classList.add("old");
        }
    }
}

toDoForm.addEventListener("submit", addToDo);

// check local storage and restore data from it
const localSavedToDo = localStorage.getItem("todos");
if (localSavedToDo !== null) {
    const parsedToDos = JSON.parse(localSavedToDo);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

// check old to-dos every minutes(60000ms)
checkToDos();
setInterval(checkToDos, 60000);

