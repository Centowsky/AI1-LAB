class Todo {
  constructor() {
    const storedTasks = localStorage.getItem("tasks");
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.term = "";
    this.draw();
  }

  get filteredTasks() {
    const lowerCaseTerm = this.term.toLowerCase().trim();
    return this.tasks.filter((task) => {
      return (
        task.name.toLowerCase().includes(lowerCaseTerm) ||
        task.date.includes(lowerCaseTerm)
      );
    });
  }

  saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask(name, date) {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (name.trim() === "") {
      alert("Nazwa zadania nie może być pusta.");
      return;
    }

    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      alert("Data musi być dzisiejsza lub z przyszłości.");
      return;
    }

    const newTask = {
      id: this.tasks.length + 1,
      name: name,
      date: date,
      completed: false,
    };

    this.tasks.push(newTask);
    this.draw();
  }

  editTask(index, newName, newDate) {
    if (newName.trim() === "") {
      alert("Nazwa zadania nie może być pusta.");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(newDate);

    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      alert("Data musi być dzisiejsza lub z przyszłości.");
      return;
    }

    this.tasks[index].name = newName;
    this.tasks[index].date = newDate;
    this.tasks[index].isEditing = false;
    this.draw();
  }

  cancelEdit(index) {
    this.tasks[index].isEditing = false;
    this.draw();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.draw();
  }

  draw() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    const filteredTasks = this.filteredTasks;

    filteredTasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      if (task.isEditing) {
        listItem.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""}
                  onclick="todo.toggleTask(${index})" />
                <input type="text" id="edit-task-name-${index}" value="${
          task.name
        }" />
                <input type="date" id="edit-task-date-${index}" value="${
          task.date
        }" />
                <button onclick="todo.saveEdit(${index})">Zapisz</button>
                <button onclick="todo.cancelEdit(${index})">Anuluj</button>
              `;
      } else {
        const highlightedText = this.term
          ? task.name.replace(
              new RegExp(this.term, "gi"),
              (match) => `<span class="highlighted-text">${match}</span>`
            )
          : task.name;
        const taskNameClass = task.completed
          ? "task-name-completed"
          : "task-name";
        const textDecoration = task.completed ? "line-through" : "none";
        listItem.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""}
                  onclick="todo.toggleTask(${index})" />
                <span class="${taskNameClass}" style="text-decoration: ${textDecoration}">${highlightedText}</span>
                <span>${task.date}</span>
                <i class="fa-solid fa-pen-to-square edit-icon" 
                  onclick="todo.setEditing(${index})"></i>
                <i class="fas fa-trash delete-icon" 
                  onclick="todo.deleteTask(${index})"></i>
              `;
      }
      todoList.appendChild(listItem);
    });
    this.saveToLocalStorage();
  }

  toggleTask(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.draw();
  }

  setEditing(index) {
    this.tasks[index].isEditing = true;
    this.draw();
  }

  saveEdit(index) {
    const newName = document.getElementById(`edit-task-name-${index}`).value;
    const newDate = document.getElementById(`edit-task-date-${index}`).value;
    this.editTask(index, newName, newDate);
  }
}

const todo = new Todo();
todo.draw();

function addTask() {
  const newTaskName = document.getElementById("new-task").value;
  const newTaskDate = document.getElementById("new-task-date").value;
  if (newTaskName.trim() !== "") {
    todo.addTask(newTaskName, newTaskDate);
    document.getElementById("new-task").value = "";
    document.getElementById("new-task-date").value = "";
  }
}

function searchTasks() {
  const searchTerm = document.getElementById("search-term").value;
  todo.term = searchTerm;
  todo.draw();
}
