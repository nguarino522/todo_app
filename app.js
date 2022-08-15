const todoForm = document.getElementById("todoform");
const taskContainer = document.getElementById("taskcontain");

// check and retrieve anything from localStorage and create it
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(savedTasks[1]);
for (let i = 0; i < savedTasks.length; i++) {
    
    let newTask = document.createElement("span");
    newTask.classList.add("card", "card-1");
    newTask.isComplete = savedTasks[i].isComplete ? true : false;

    let taskContent = document.createElement("div");
    taskContent.classList.add("card-content");

    let taskName = document.createElement("span")
    taskName.classList.add("card-title");
    taskName.innerText = savedTasks[i].task;
    console.log(savedTasks[i].task);

    let cardAction = document.createElement("div");
    cardAction.classList.add("card-action");

    let completeBtn = document.createElement("a");
    completeBtn.classList.add("waves-effect", "waves-light", "btn", "green", "lighten-1");
    completeBtn.innerText = "Complete";
    completeBtn.id = "completebtn";

    let removeBtn = document.createElement("a");
    removeBtn.classList.add("waves-effect", "waves-light", "btn", "red", "lighten-1");
    removeBtn.innerText = "Remove";
    removeBtn.id = "removebtn";

    cardAction.appendChild(completeBtn);
    cardAction.appendChild(removeBtn);
    taskContent.appendChild(taskName);
    newTask.appendChild(taskContent);
    newTask.appendChild(cardAction);
    taskContainer.appendChild(newTask);

    if (newTask.isComplete === true){
        newTask.style.textDecoration = "line-through";
        newTask.style.backgroundColor = "#90EE90";
    }

};


todoForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    // creating all card/box items for new task
    let newTask = document.createElement("span");
    newTask.classList.add("card", "card-1");
    newTask.isComplete = false;

    let taskContent = document.createElement("div");
    taskContent.classList.add("card-content");

    let taskName = document.createElement("span")
    taskName.classList.add("card-title");
    if (checkDupTaskName(document.getElementById("taskadd").value) == 0){
        taskName.innerText = document.getElementById("taskadd").value;
    } else {
        alert("ERROR: This task name already exists, please select a different name!");
        return;
    }

    let cardAction = document.createElement("div");
    cardAction.classList.add("card-action");

    let completeBtn = document.createElement("a");
    completeBtn.classList.add("waves-effect", "waves-light", "btn", "green", "lighten-1");
    completeBtn.innerText = "Complete";
    completeBtn.id = "completebtn";

    let removeBtn = document.createElement("a");
    removeBtn.classList.add("waves-effect", "waves-light", "btn", "red", "lighten-1");
    removeBtn.innerText = "Remove";
    removeBtn.id = "removebtn";

    // appending them all into the proper place and order
    cardAction.appendChild(completeBtn);
    cardAction.appendChild(removeBtn);
    taskContent.appendChild(taskName);
    newTask.appendChild(taskContent);
    newTask.appendChild(cardAction);
    taskContainer.appendChild(newTask);

    //reset form
    todoForm.reset();

    // save to localStorage
    savedTasks.push({task: taskName.innerText, isComplete: false});
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    document.getElementById("taskadd").blur();

});

taskContainer.addEventListener("click", function(evt) {

    if (evt.target.id === "removebtn") {
        evt.target.parentElement.parentElement.remove();
        for (let i=0; i < savedTasks.length; i++) {
            console.log(i);
            if (savedTasks[i].task === evt.target.parentElement.parentElement.firstChild.innerText) {
                savedTasks.splice(i,1);
                localStorage.setItem("tasks", JSON.stringify(savedTasks));   
            }
        }

    };

    if (evt.target.id === "completebtn") {
        let task = evt.target.parentElement.parentElement;
        evt.target.parentElement.parentElement.style.textDecoration = "line-through";
        evt.target.parentElement.parentElement.style.backgroundColor = "#90EE90";
        evt.target.parentElement.parentElement.isComplete = true;

        for (let i=0; i < savedTasks.length; i++) {
            if (savedTasks[i].task == evt.target.parentElement.parentElement.firstChild.innerText) {
                savedTasks[i].isComplete = !savedTasks[i].isComplete;
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
            }
        }

    };



});

function checkDupTaskName (taskname) {
    let count = 0 ;
    for (let i=0; i < savedTasks.length; i++) {
        if (document.getElementById("taskadd").value === savedTasks[i].task) {
        count = count + 1;
        }
    }
    return count;
}