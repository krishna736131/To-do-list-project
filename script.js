document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) li.classList.add('completed');
  
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="delete-btn" data-index="${index}">✖</button>
          </div>
        `;
  
        // Toggle completion
        li.querySelector('span').addEventListener('click', () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks();
        });
  
        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });
  
        taskList.appendChild(li);
      });
    };
  
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText === '') return;
      tasks.push({ text: taskText, completed: false });
      taskInput.value = '';
      saveTasks();
      renderTasks();
    });
  
    renderTasks();
  });
  