// planner.js — Academic Planner: add, complete, delete tasks (DOM manipulation, events, arrays)

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('task-form');
  var input = document.getElementById('task-input');
  var prioritySelect = document.getElementById('task-priority');
  var list = document.getElementById('task-list');
  var emptyState = document.getElementById('planner-empty');
  var countTotal = document.getElementById('count-total');
  var countDone = document.getElementById('count-done');

  if (!form) return; // not on planner page

  // In-memory array of task objects (per assignment: arrays + functions)
  var tasks = [
    { id: cryptoId(), title: 'Submit GPG encryption lab report', priority: 'high', done: false },
    { id: cryptoId(), title: 'Review Django models for capstone project', priority: 'medium', done: false },
    { id: cryptoId(), title: 'Prepare music theory lesson plan', priority: 'low', done: true }
  ];

  function cryptoId() {
    return 't-' + Math.random().toString(36).slice(2, 10);
  }

  function render() {
    list.innerHTML = '';

    if (tasks.length === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
    }

    tasks.forEach(function (task) {
      var li = document.createElement('li');
      li.className = 'task-item' + (task.done ? ' done' : '');
      li.setAttribute('data-id', task.id);

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox.setAttribute('aria-label', 'Mark "' + task.title + '" as completed');
      checkbox.addEventListener('change', function () {
        toggleTask(task.id);
      });

      var title = document.createElement('span');
      title.className = 'task-title';
      title.textContent = task.title;

      var priority = document.createElement('span');
      priority.className = 'task-priority priority-' + task.priority;
      priority.textContent = task.priority;

      var actions = document.createElement('span');
      actions.className = 'task-actions';

      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'del-btn';
      delBtn.textContent = 'delete';
      delBtn.setAttribute('aria-label', 'Delete task: ' + task.title);
      delBtn.addEventListener('click', function () {
        deleteTask(task.id);
      });

      actions.appendChild(delBtn);
      li.appendChild(checkbox);
      li.appendChild(title);
      li.appendChild(priority);
      li.appendChild(actions);
      list.appendChild(li);
    });

    updateStats();
  }

  function updateStats() {
    countTotal.textContent = tasks.length;
    countDone.textContent = tasks.filter(function (t) { return t.done; }).length;
  }

  function addTask(title, priority) {
    tasks.unshift({ id: cryptoId(), title: title, priority: priority, done: false });
    render();
  }

  function toggleTask(id) {
    var task = tasks.find(function (t) { return t.id === id; });
    if (task) task.done = !task.done;
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    render();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = input.value.trim();
    if (!value) {
      input.focus();
      return;
    }
    addTask(value, prioritySelect.value);
    input.value = '';
    input.focus();
  });

  render();
});
