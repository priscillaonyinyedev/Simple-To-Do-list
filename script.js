
// 1. Select HTML elements
const taskInput = document.getElementById('task');
const addButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');

// 2. Function to update the task summary
function updateSummary() {

    const allTasks = taskList.querySelectorAll('li');
    const completed = taskList.querySelectorAll('input[type="checkbox"]:checked');

    const total = allTasks.length;
    const completedCount = completed.length;
    const pending = total - completedCount;

    totalTasks.textContent = total;
    completedTasks.textContent = completedCount;
    pendingTasks.textContent = pending;
}

// 3. Function to add a new task
function addTask() {

    // Get the user's input
    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === "") {
        return;
    }

    // Create a new list item
    const newTask = document.createElement('li');

    // Create a container for the checkbox and label
    const taskContainer = document.createElement('div');

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Create a unique ID for the checkbox
    checkbox.id = 'task-' + Date.now();

    // Create a label
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = taskText;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';

    // Add checkbox and label to the container
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(label);

    // Add container and delete button to the list item
    newTask.appendChild(taskContainer);
    newTask.appendChild(deleteButton);

    // Add the new task to the task list
    taskList.appendChild(newTask);

    // Clear the input field
    taskInput.value = '';

    // Update the task summary
    updateSummary();
}

// 4. Listen for clicks on the Add Task button
addButton.addEventListener('click', function() {
    addTask();
});

// 5. Listen for checkbox changes
taskList.addEventListener('change', function(event) {

    if (event.target.type === 'checkbox') {
        updateSummary();
    }

});

// 6. Listen for clicks on the Delete buttons
taskList.addEventListener('click', function(event) {

    if (event.target.tagName === 'BUTTON') {

        // Find the task containing the clicked button
        const task = event.target.closest('li');

        // Remove the task
        task.remove();

        // Update the summary
        updateSummary();
    }

});

// 7. Allow users to press Enter to add a task
taskInput.addEventListener('keydown', function(event) {

    if (event.key === 'Enter') {
        addTask();
    }

});

// 8. Update the summary when the page loads
updateSummary();