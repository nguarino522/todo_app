let todoForm = document.getElementById("todoform");
let taskContainer = document.getElementById("taskcontain");

todoForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    // creating all card/box items for new task
    let newTask = document.createElement("span");
    newTask.classList.add("card", "card-1");

    let taskContent = document.createElement("div");
    taskContent.classList.add("card-content");

    let taskName = document.createElement("span")
    taskName.classList.add("card-title");
    taskName.innerText = document.getElementById("taskadd").value;

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

    todoForm.reset();
});

taskContainer.addEventListener("click", function(evt) {
    if (evt.target.id === "removebtn") {
        evt.target.parentElement.parentElement.remove();
    };

    if (evt.target.id === "completebtn") {
        let task = evt.target.parentElement.parentElement;
        evt.target.parentElement.parentElement.style.textDecoration = "line-through";
        evt.target.parentElement.parentElement.style.backgroundColor = "#90EE90";
    };

});