
// Get the HTML elements
const taskForm = document.getElementById("taskForm");
const allTasksList = document.getElementById("allTasks");
const pendingTasksList = document.getElementById("pendingTasks");
const completedTasksList = document.getElementById("completedTasks");

// Initialize the tasks array
let tasks = [];

// Load saved tasks from localStorage, if any
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

// Render the tasks on the page
function renderTasks() {
    // Clear all lists
    allTasksList.innerHTML = "";
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    // Render all tasks
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const title = document.createElement("span");
        title.textContent = task.title;
        title.style.fontWeight = "bold";
        const desc = document.createElement("span");
        desc.textContent = task.desc;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(index));
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Mark as Complete";
        completeBtn.addEventListener("click", () => markAsComplete(index));

        li.appendChild(title);
        li.appendChild(document.createTextNode(" "));
        li.appendChild(desc);
        li.appendChild(document.createTextNode(" "));
        li.appendChild(deleteBtn);
        li.appendChild(document.createTextNode(" "));
        if (!task.completed) {
            li.appendChild(completeBtn);
        }

        allTasksList.appendChild(li);

        // Add to the appropriate list
        const taskItem = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = task.title + " - " + task.desc;
        const completeBtnCopy = document.createElement("button");
        completeBtnCopy.textContent = "Mark as Complete";
        completeBtnCopy.addEventListener("click", () => markAsComplete(index));
        taskItem.appendChild(taskText);
        taskItem.appendChild(document.createTextNode(" "));
        if (!task.completed) {
            taskItem.appendChild(completeBtnCopy);
        }

        if (task.completed) {
            completedTasksList.appendChild(taskItem);
        } else {
            pendingTasksList.appendChild(taskItem);
        }
    });

    // Save tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task to the tasks array and render it on the page
function addTask(title, desc) {
    const task = {
        title: title,
        desc: desc,
        completed: false
    };
    tasks.push(task);
    renderTasks();
}

// Delete a task from the tasks array and render the updated list on the page
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Mark a task as complete and render the updated list on the page
function markAsComplete(index) {
    tasks[index].completed = true;
    renderTasks();
}

// Handle form submission
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    addTask(title, desc);
    taskForm.reset();
});

// Render the initial list of tasks on page load
renderTasks();
