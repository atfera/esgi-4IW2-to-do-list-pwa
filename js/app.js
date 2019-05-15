import AppTask from '/js/components/task/task.js';
import {
  openDB
} from 'idb';
import checkConnectivity from '/js/connection.js';

(async function (document) {

  let tableBody = $('#tasks');
  let addTaskForm = $('#addTask');
  let editTaskForm = $('#editTaskForm');

  $('[data-toggle="tooltip"]').tooltip();

  checkConnectivity(3, 1000);

  // active

  try {
    const data = await fetch('http://localhost:3000/tasks');
    const json = await data.json();

    const database = await openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('tasks');
      }
    });

    if (navigator.onLine) {
      await database.put('tasks', json, 'tasks');
    }

    const tasks = await database.get('tasks', 'tasks');

    let todos = json.map(item => {
      const taskElement = new AppTask();

      taskElement.initTask(
        item.id,
        item.task,
        item.description,
        item.dueDate,
        item.isDone
      );

      tableBody.append(taskElement);

      return taskElement;
    });

    document.addEventListener('connection-changed', ({
      detail
    }) => {
      console.log(detail.online);
    });

    document.addEventListener('update-database', async e => {
      if (navigator.onLine) {
        fetch('http://localhost:3000/tasks', {
          method: 'put',
          body: JSON.stringify(tasks)
        })
          .then((data) => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          })
      }
    });

    addTaskForm.on('submit', async (e) => {
      e.preventDefault();
      let task = $('#task').val();
      let description = $('#description').val();
      let dueDate = $('#datepicker').val();

      if (task.length <= 0) return;
      if (description.length <= 0) return;

      let newTask = {
        id: Math.random().toString(36).substr(2, 9),
        task,
        description,
        dueDate,
        isDone: false
      };

      tasks.push(newTask);

      await database.put('tasks', tasks, 'tasks');

      const taskElement = new AppTask();

      taskElement.initTask(
        newTask.id,
        newTask.task,
        newTask.description,
        newTask.dueDate,
        newTask.isDone
      );

      todos.push(taskElement);
      tableBody.append(taskElement);

      $('#addTaskModal').modal('hide');
    });

    editTaskForm.on('submit', async (e) => {
      e.preventDefault();

      let id = $('#taskId').val();
      let task = $('#editTask').val();
      let description = $('#editDescription').val();
      let dueDate = $('#editDatePicker').val();
      let isDone = $('#isDone').val();

      if (task.length <= 0) return;
      if (description.length <= 0) return;

      let editedTask = {
        id,
        task,
        description,
        dueDate,
        isDone: isDone != null ? isDone : false,
      };

      tasks.push(editedTask);

      await database.put('tasks', tasks, 'tasks');

      todos = todos.filter(taskElement => {
        if (taskElement.id === editedTask.id) {
          taskElement.initTask(
            editedTask.id,
            editedTask.task,
            editedTask.description,
            editedTask.dueDate,
            editedTask.isDone
          );
        }

        return taskElement;
      });

      tableBody.html('');

      tableBody.append(todos);

      $('#editTaskModal').modal('hide');
    })

    document.addEventListener('edit-task', async e => {
      let task = tasks.find(task => task.id === e.detail.taskId);
      $('#editTaskModal').modal('show');
      $('#editTaskModalLabel').text(`Edit ${task.task}`);
      $('#editTask').val(task.task);
      $('#taskId').val(task.id);
      $('#editDatePicker').val(task.dueDate);
      $('#editDescription').val(task.description);
      $('#isDone').val(task.isDone);
    });

    document.addEventListener('delete-task', async e => {
      const updatedTask = tasks.filter(task =>
        task.id !== e.detail.taskId
      );

      await database.put('tasks', updatedTask, 'tasks');

      todos = todos.filter(taskElement =>
        taskElement.id !== e.detail.taskId
      );

      tableBody.html('');

      tableBody.append(todos);
    });

    document.addEventListener('done-task', async e => {
      const updatedTask = tasks.filter(task => {
        task.id === e.detail.taskId ?
          task.isDone = !task.isDone :
          task.isDone = task.isDone;

        return task;
      });

      await database.put('tasks', updatedTask, 'tasks');

      todos = todos.filter(taskElement => {
        const task = updatedTask.find(item => item.id === e.detail.taskId);

        if (taskElement.id === e.detail.taskId) {
          taskElement.initTask(
            task.id,
            task.task,
            task.description,
            task.dueDate,
            task.isDone
          );
        }

        return taskElement;
      });

      tableBody.html('');

      tableBody.append(todos);
    })
  } catch (error) {
    console.log(error, ':(');
  }
})(document);

function loadInitialData() {
  $('#tasks').html('');

  // Display a message if there are no todos
  if (todos.length == 0) {
    $('#tasks').html(`
      <div class="text-center m-2 p-2">
        <p class="text-primary text-lead">No todos</p>
      </div>
    `);
  }
  todos.forEach(addTask);
}