const summary = document.querySelector("item-right-container");
const summaryDone = document.querySelector(".item-right-container h2:first-child");
const summaryToGo = document.querySelector(".item-right-container h2:nth-child(2)");
const summaryPercent = document.querySelector(".item-right-container h2:last-child");

function paintPercent(percent) {
    summaryPercent.innerText = `Progress: ${percent} %`;
}

// show to-dos summary on item-right-container
function paintSummary() {
    // show total amount of to-dos which submitted by user
    if (toDos.length === 0) {
        summaryDone.innerText = `Please add your to-do`;
        summaryToGo.innerText = "";
        summaryPercent.innerText = "";
    }
    else if (toDos.length >= 1) {
        summaryDone.innerText = `Total: ${toDos.length} to-do(s)`;
    }

    // make a new array for not complited to-dos using filter()
    const toDosToGo = toDos.filter(toDo => toDo.complete === false);

    // calculate progress
    const toDosPercent = Math.round((1 - (toDosToGo.length / toDos.length)) * 100);

    // show amount of remain to-dos and progress percentage
    if (toDosToGo.length === 0 && toDos.length !== 0) {
        summaryToGo.innerText = `All done! Enjoy your time!`;
        paintPercent(toDosPercent);
    }
    
    else if (toDosToGo.length >= 1) {;
        summaryToGo.innerText = `Remaining: ${toDosToGo.length} to-do(s)`;
        paintPercent(toDosPercent);
    }
}

paintSummary();
toDoForm.addEventListener("submit", paintSummary);
toDoList.addEventListener("click", paintSummary);